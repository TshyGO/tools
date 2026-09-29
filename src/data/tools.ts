export type Tool = {
  slug: string;
  name: string;
  /** 一句话，动词开头，说清楚它干什么 */
  tagline: string;
  platform: string;
  status: string;
  requirements: string;
  icon: string;
  detailPath: string;
  faqPath: string;
  links: {
    /** 主下载入口 */
    primary: { label: string; href: string };
    source: string;
    issues: string;
    privacy?: string;
  };
  /** thumb 用于桌面端卡片（600×480），thumbWide 用于窄屏卡片（16:9） */
  screenshots: { src: string; thumb: string; thumbWide: string; caption: string; width: number; height: number }[];
};

const repo = 'https://github.com/TshyGO/resume-form-assistant-plugin';
export const tools: Tool[] = [
  {
    slug: 'wangshen-kuaitian',
    name: '网申快填',
    // 「AI」两侧用不换行空格，让简介只在逗号处断行
    tagline: '在浏览器侧边栏一键\u00a0AI\u00a0填写网申，在桌面管理简历和投递记录。',
    platform: '桌面程序 + Chrome / Edge 插件',
    status: '现已开放',
    requirements: 'macOS（Apple 芯片）或 Windows（x64）；Chrome / Edge 116 或更新版本',
    icon: '/tools/wangshen-kuaitian/icon.png',
    detailPath: '/tools/wangshen-kuaitian/',
    faqPath: '/tools/wangshen-kuaitian/faq/',
    links: {
      primary: { label: '下载桌面程序', href: '/tools/wangshen-kuaitian/download/' },
      source: repo,
      issues: `${repo}/issues`,
      privacy: `${repo}/blob/main/docs/privacy-policy.md`,
    },
    screenshots: [
      {
        src: '/tools/wangshen-kuaitian/sidepanel.webp',
        thumb: '/tools/wangshen-kuaitian/thumb.webp',
        thumbWide: '/tools/wangshen-kuaitian/thumb-wide.webp',
        caption: '网申页面右侧的侧边栏。截图中的简历为示例数据。',
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
