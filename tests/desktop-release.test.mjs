import { test } from 'node:test';
import assert from 'node:assert/strict';
import { repository, selectDesktopRelease, loadDesktopRelease } from '../src/lib/desktop-release.js';

function release(version, pluginVersion = version) {
  const tag = `desktop-v${version}`;
  return {
    tag_name: tag, draft: false, prerelease: false,
    html_url: `${repository}/releases/tag/${tag}`,
    assets: [
      `wangshen-kuaitian_${version}_x64-setup.exe`,
      `wangshen-kuaitian_${version}_aarch64.dmg`,
      `wangshen-kuaitian-plugin-${pluginVersion}.zip`,
    ].map(name => ({ name, state: 'uploaded', size: 100, browser_download_url: `${repository}/releases/download/${tag}/${name}` })),
  };
}

test('numeric version selection excludes plugin releases, draft, beta and malformed tags', () => {
  const selected = selectDesktopRelease([
    release('0.9.0'), release('0.10.0', '0.8.2'),
    { ...release('9.0.0'), tag_name: 'v9.0.0' },
    { ...release('8.0.0'), draft: true },
    { ...release('7.0.0'), prerelease: true },
    release('6.0.0-beta.1'), release('01.0.0'),
  ]);
  assert.equal(selected.version, '0.10.0');
  assert.equal(selected.plugin.name, 'wangshen-kuaitian-plugin-0.8.2.zip');
  assert.match(selected.plugin.url, /desktop-v0\.10\.0\/wangshen-kuaitian-plugin-0\.8\.2\.zip$/);
});

test('a subsequent desktop release is picked without changing any site version', () => {
  assert.equal(selectDesktopRelease([release('0.4.1')]).version, '0.4.1');
  assert.equal(selectDesktopRelease([release('0.4.1'), release('0.4.2')]).version, '0.4.2');
});

test('incomplete newest release is not replaced with an older release', () => {
  const newest = release('0.5.0');
  newest.assets = newest.assets.filter(a => a.name.endsWith('.zip'));
  const selected = selectDesktopRelease([release('0.4.1'), newest]);
  assert.equal(selected.version, '0.5.0');
  assert.equal(selected.windows, null);
  assert.equal(selected.mac, null);
  assert.ok(selected.plugin);
});

test('rejects unexpected page or asset origin, duplicate, empty and uploading assets', () => {
  assert.throws(() => selectDesktopRelease([{ ...release('0.4.1'), html_url: 'https://example.com' }]));
  const changed = release('0.4.1');
  changed.assets[0].browser_download_url = 'https://example.com/installer.exe';
  changed.assets[1].state = 'starter';
  changed.assets[2].size = 0;
  const selected = selectDesktopRelease([changed]);
  assert.equal(selected.windows, null);
  assert.equal(selected.mac, null);
  assert.equal(selected.plugin, null);
  const duplicate = release('0.4.1');
  duplicate.assets.push(duplicate.assets[2]);
  assert.equal(selectDesktopRelease([duplicate]).plugin, null);
});

test('follows pagination and selects the highest version across all pages', async () => {
  const requested = [];
  const selected = await loadDesktopRelease(async (url) => {
    requested.push(url);
    const first = requested.length === 1;
    return new Response(JSON.stringify([release(first ? '0.4.1' : '0.5.0')]), {
      headers: first ? { link: '<https://api.github.com/example>; rel="next"' } : {},
    });
  });
  assert.equal(selected.version, '0.5.0');
  assert.match(requested[1], /per_page=100&page=2$/);
});

test('fails clearly for rate limits, network failures, malformed data and no stable releases', async () => {
  await assert.rejects(loadDesktopRelease(async () => new Response('', { status: 403 })), /403/);
  await assert.rejects(loadDesktopRelease(async () => { throw new Error('offline'); }), /offline/);
  await assert.rejects(loadDesktopRelease(async () => new Response('{}')), /格式/);
  await assert.rejects(loadDesktopRelease(async () => new Response('[]')), /正式版/);
  await assert.rejects(loadDesktopRelease(async () => new Response('not json')));
});

test('does not announce latest when pagination is incomplete or a later page fails', async () => {
  let calls = 0;
  await assert.rejects(loadDesktopRelease(async () => {
    calls++;
    return new Response(JSON.stringify([release('0.4.1')]), { headers: { link: '<next>; rel="next"' } });
  }), /列表过长/);
  assert.equal(calls, 10);
  calls = 0;
  await assert.rejects(loadDesktopRelease(async () => {
    calls++;
    return calls === 1
      ? new Response(JSON.stringify([release('0.4.1')]), { headers: { link: '<next>; rel="next"' } })
      : new Response('', { status: 503 });
  }), /503/);
});

test('passes cancellation through to the request', async () => {
  const signal = AbortSignal.abort();
  await assert.rejects(loadDesktopRelease(async (_url, options) => {
    assert.equal(options.signal, signal);
    options.signal.throwIfAborted();
  }, signal), { name: 'AbortError' });
});
