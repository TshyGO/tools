# PeterKit

`19991107.xyz` 的免费工具目录。当前第一阶段使用 Astro 构建，并通过 Cloudflare Pages 发布。

## 本地开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
npm run preview
```

构建产物位于 `dist/`。

## 支持开发页

`/support/` 是自愿支持入口，位于各页面页脚和工具详情底部，不影响下载或使用。
目前未配置真实收款方式，页面明确显示「暂未开放打赏」，没有支付按钮或占位二维码。
正式开放前，请在 `src/pages/support.astro` 的 `support-payment` 区域补充作者确认的收款链接或二维码，
并在手机和桌面端核对收款人、扫码可用性及文案。请勿使用示例收款信息。
