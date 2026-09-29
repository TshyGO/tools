export const repository = 'https://github.com/TshyGO/resume-form-assistant-plugin';
const api = 'https://api.github.com/repos/TshyGO/resume-form-assistant-plugin/releases';
const versionPattern = '(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)';
const desktopTag = new RegExp(`^desktop-v${versionPattern}$`);
const pluginName = new RegExp(`^wangshen-kuaitian-plugin-${versionPattern}\\.zip$`);

/** Select by numeric version, never by GitHub's mixed desktop/plugin latest. */
export function selectDesktopRelease(releases) {
  const candidates = releases.flatMap((release) => {
    const match = desktopTag.exec(release.tag_name);
    if (!match || release.draft !== false || release.prerelease !== false) return [];
    return [{ release, parts: match.slice(1).map(BigInt) }];
  });
  candidates.sort((a, b) => {
    for (let i = 0; i < 3; i++) {
      if (a.parts[i] !== b.parts[i]) return a.parts[i] > b.parts[i] ? -1 : 1;
    }
    return 0;
  });
  const release = candidates[0]?.release;
  if (!release) throw new Error('没有找到桌面正式版');
  const version = release.tag_name.slice('desktop-v'.length);
  const releaseUrl = `${repository}/releases/tag/${release.tag_name}`;
  if (release.html_url !== releaseUrl) throw new Error('发布页地址不符合预期');
  const assets = Array.isArray(release.assets) ? release.assets : [];
  function assetLink(matches) {
    const matched = assets.filter((asset) => matches(asset.name));
    if (matched.length !== 1) return null;
    const asset = matched[0];
    const expected = `${repository}/releases/download/${release.tag_name}/${asset.name}`;
    return asset.state === 'uploaded' && asset.size > 0 && asset.browser_download_url === expected
      ? { name: asset.name, url: expected } : null;
  }
  // Missing assets stay unavailable. Never silently call an older release the latest.
  return {
    version, url: releaseUrl,
    windows: assetLink((name) => name === `wangshen-kuaitian_${version}_x64-setup.exe`),
    mac: assetLink((name) => name === `wangshen-kuaitian_${version}_aarch64.dmg`),
    plugin: assetLink((name) => pluginName.test(name)),
  };
}

/** Public API only: no token, database, build-time version or extra service. */
export async function loadDesktopRelease(fetcher = fetch, signal = AbortSignal.timeout(15000)) {
  const releases = [];
  for (let page = 1; page <= 10; page++) {
    const response = await fetcher(`${api}?per_page=100&page=${page}`, {
      headers: { Accept: 'application/vnd.github+json' }, signal,
    });
    if (!response.ok) throw new Error(`GitHub HTTP ${response.status}`);
    const batch = await response.json();
    if (!Array.isArray(batch)) throw new Error('GitHub 返回格式不正确');
    releases.push(...batch);
    if (!response.headers.get('link')?.includes('rel="next"')) return selectDesktopRelease(releases);
  }
  throw new Error('发布列表过长，暂时无法确认最新版');
}
