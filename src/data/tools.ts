export type Tool = {
  slug: string;
  index: string;
  name: string;
  englishName: string;
  description: string;
  category: string;
  status: string;
  openSource: boolean;
  detailPath: string;
  releaseUrl: string;
};

export const tools: Tool[] = [
  {
    slug: 'resume-pro',
    index: '01',
    name: '简历灵填助手',
    englishName: 'Resume Pro',
    description: '用 AI 读懂简历，把重复的网申填写变成更顺手的一步。',
    category: '求职工具',
    status: '现已开放',
    openSource: true,
    detailPath: '/tools/resume-pro/',
    releaseUrl: 'https://github.com/TshyGO/resume-form-assistant-plugin/releases/latest',
  },
];
