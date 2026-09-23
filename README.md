# 小米 SU7 Ultra 选配器

本地化的汽车选配体验项目，包含页面源码、官方运行时归档、3D 模型、图片、字体、视频及配置数据。配置接口使用本地归档或模拟响应，未接入真实订单和支付。

## 目录

- `xiaomi-ev-configurator-clone/`：应用、运行时素材、构建脚本、Worker 和测试。
- `source-capture/`：原始页面、脚本、模型、配置和截图归档。
- `release-assets/`：发布展示图片。

保留上述目录关系，构建脚本需要读取应用旁的 `source-capture/`。

## 本地运行

准备 Node.js 22 和 npm，然后执行：

```sh
cd xiaomi-ev-configurator-clone
npm ci
npm run dev -- --host 127.0.0.1
```

访问终端显示的本地地址。首次安装依赖需要网络。

## 构建和测试

```sh
npm run build
npm run test:sites
```

构建产物为 `dist/client/`、`dist/server/` 和 `dist/.openai/hosting.json`。
`.openai/hosting.json` 保留原 Sites 项目标识，迁移托管项目时需重新配置。

## 当前实现

当前 `index.html` 加载本地化的官方页面和运行时。`src/` 保留早期 React 二维原型，并非当前首页入口。
`scripts/sync-official-runtime.mjs` 会从归档同步资源、改写地址并重新生成首页，修改时应注意生成文件的来源。
`docs/phase-1-baseline.md` 描述早期阶段，不代表当前完整功能状态。

依赖目录、构建产物、缓存和 `exports/` 压缩包不纳入 Git；源码和本地素材直接保存在仓库中。
