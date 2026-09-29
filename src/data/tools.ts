export type Tool = {
  slug: string;
  name: string;
  /** 改名前的名字，保留给老用户辨认和搜索 */
  formerName?: string;
  /** 一句话，动词开头，说清楚它干什么 */
  tagline: string;
  platform: string;
  status: string;
  /** 页面说明对应的版本；发新版后同步修改，并核对说明是否仍然准确 */
  version: { label: string; releasedAt: string };
  requirements: string;
  icon: string;
  detailPath: string;
  faqPath: string;
  links: {
    /** 主下载入口 */
    primary: { label: string; href: string };
    secondary?: { label: string; href: string };
    source: string;
    issues: string;
    privacy?: string;
  };
  screenshots: { src: string; thumb: string; caption: string; width: number; height: number }[];
};

const repo = 'https://github.com/TshyGO/resume-form-assistant-plugin';

export const tools: Tool[] = [
  {
    slug: 'wangshen-kuaitian',
    name: '网申快填',
    formerName: '简历灵填助手 Resume Pro',
    tagline: '在浏览器侧边栏一键 AI 填写网申表单，并在桌面程序里管理简历和投递记录。',
    platform: '桌面程序 + Chrome / Edge 插件',
    status: '现已开放',
    version: { label: '桌面 0.4.1 · 插件 0.4.1', releasedAt: '2026-09-28' },
    requirements: 'macOS（Apple 芯片）或 Windows（x64）；Chrome / Edge 116 或更新版本',
    icon: '/tools/wangshen-kuaitian/icon.png',
    detailPath: '/tools/wangshen-kuaitian/',
    faqPath: '/tools/wangshen-kuaitian/faq/',
    links: {
      primary: { label: '下载桌面程序', href: `${repo}/releases?q=desktop-v&expanded=true` },
      secondary: {
        label: 'Chrome 商店安装插件',
        href: 'https://chromewebstore.google.com/detail/diagjmploldedipjdenmecmjokckelkl',
      },
      source: repo,
      issues: `${repo}/issues`,
      privacy: `${repo}/blob/main/docs/privacy-policy.md`,
    },
    screenshots: [
      {
        src: '/tools/wangshen-kuaitian/sidepanel.webp',
        thumb: '/tools/wangshen-kuaitian/thumb.webp',
        caption: '浏览器侧边栏：选择模板、一键 AI 填写、保存岗位和确认投递。截图中的简历为合成示例。',
        width: 1280,
        height: 800,
      },
    ],
  },
];

export const qqGroup = '1121142517';

/** 各页面读取同一份数据，避免链接散落在模板里 */
export function getTool(slug: string): Tool {
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) throw new Error(`未知工具：${slug}`);
  return tool;
}
