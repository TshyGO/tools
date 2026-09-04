export type Tool = {
  slug: string;
  name: string;
  englishName: string;
  /** 一句话，动词开头，说清楚它干什么 */
  tagline: string;
  platform: string;
  status: string;
  detailPath: string;
  releaseUrl: string;
  sourceUrl: string;
  screenshots: { src: string; caption: string }[];
};

export const tools: Tool[] = [
  {
    slug: 'resume-pro',
    name: '简历灵填助手',
    englishName: 'Resume Pro',
    tagline: '读取 Excel 简历模板，打开网申页面后一键匹配填写表单字段。',
    platform: 'Chrome / Edge 插件',
    status: '现已开放',
    detailPath: '/tools/resume-pro/',
    releaseUrl: 'https://github.com/TshyGO/resume-form-assistant-plugin/releases/latest',
    sourceUrl: 'https://github.com/TshyGO/resume-form-assistant-plugin',
    screenshots: [
      { src: '/screenshots/fill.webp', caption: '一键 AI 填写' },
      { src: '/screenshots/templates.webp', caption: '模板管理' },
      { src: '/screenshots/ai-config.webp', caption: 'AI 配置' },
    ],
  },
];
