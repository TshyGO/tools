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
支付宝和微信收款码由作者提供，原图位于 `public/support/alipay.jpg` 和 `public/support/wechat.jpg`，
页面支持查看原图和下载保存，不使用支付 SDK，不处理支付结果，也不提供 AI 接口额度。
更换图片时应同步核对 `src/pages/support.astro` 中的图片尺寸，并检查手机、桌面展示和下载。
原始收款图片不应重绘或裁切；页面用 CSS 窗口展示完整二维码并额外保留白边，下载仍提供完整原图。
更换图片时还需重新核对码区坐标 `x/y/size`，避免截断码区或引入海报背景。
上线前请使用对应 App 实际扫码，确认收款人正确。请勿使用示例收款信息。
