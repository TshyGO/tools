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

## 更新工具说明

工具的名称、版本、下载链接和截图集中在 `src/data/tools.ts`，页面都从这里读取。
对应软件发新版后，先更新 `version`，再对照软件仓库的 README 核对详情页和常见问题是否仍然准确。

网申快填的页面原地址为 `/tools/resume-pro/`，已迁到 `/tools/wangshen-kuaitian/`。
线上由 `public/_redirects` 返回 301，`astro.config.mjs` 的 `redirects` 负责本地开发和兜底跳转页。
常见问题的锚点（如 `#api-url`）保持不变，旧链接跳转后仍能定位。

## 支持开发页

`/support/` 是自愿支持入口，位于各页面页脚和工具详情底部，不影响下载或使用。
支付宝和微信收款码由作者提供，原图位于 `public/support/alipay.jpg` 和 `public/support/wechat.jpg`，
页面支持查看原图和下载保存，不使用支付 SDK，不处理支付结果，也不提供 AI 接口额度。
更换图片时应同步核对 `src/pages/support.astro` 中的图片尺寸，并检查手机、桌面展示和下载。
原始收款图片不应重绘或裁切；页面用 CSS 窗口展示完整二维码并额外保留白边，下载仍提供完整原图。
更换图片时还需重新核对码区坐标 `x/y/size`，避免截断码区或引入海报背景。
上线前请使用对应 App 实际扫码，确认收款人正确。请勿使用示例收款信息。
