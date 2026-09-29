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

工具的名称、固定下载入口和截图集中在 `src/data/tools.ts`，页面都从这里读取。功能或安装流程变更时，仍需对照软件仓库更新说明；单纯发布新版本不需要改网站。

### 网申快填的固定下载入口

`https://19991107.xyz/tools/wangshen-kuaitian/download/` 在浏览器打开时读取 GitHub 公开 Releases API，按数字版本选择非草稿、非预发布的 `desktop-vX.Y.Z`，并使用该发布实际上传的 Windows、macOS 和配套插件附件。插件版本可以与桌面版本不同；不会混用插件独立发布或 Chrome 商店版本。

不需要数据库、令牌、服务器或发版后重新部署官网。不要把入口改成写死版本的 tag 链接、`releases?q=desktop-v` 或仓库通用的 `releases/latest`。现有桌面发版工作流上传附件后，访客重新打开下载页即可查询新版。

API 有网络和匿名请求限额；查询超时、失败或分页不完整时，页面明确说明无法确认最新版，并保留 GitHub 发布列表入口；缺少某个安装包时只禁用该下载，不把旧版本冒充最新版。关闭 JavaScript 时也能使用备用入口。运行 `npm test` 验证版本排序、分页、附件选择与失败处理。

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
