# Loopit 源码交接和验收

## 准备固定版本的交接单

- 以已推送的完整 commit SHA 和单款游戏目录作为版本基线。列出入口、执行顺序、实际运行文件、资源路径和必要构建命令。先确认 Loopit 能读取这些文件，再送入生成。私有仓库沿用已授权的访问方式或用户允许的文件交付方式。
- 若需批量列出固定版文件、Raw URL、字节数和 SHA-256，运行以下只读工具。命令中的参数按实际仓库填写。工具以 Git 对象为准，工作区未提交的改动不会被包含。

```bash
python3 <skill-dir>/scripts/pin-source.py \
  --repo <local-repository> --github <owner/repository> \
  --commit <revision> --game <path-to-game>
```

目录含过程文件时，可重复传 `--file` 指定相对游戏目录的实际入口及依赖。逐条提供 Raw URL。确认入口引用的本地样式、脚本、字体、模型和贴图都已列出。脚本生成的地址和散列是交接依据，远程读取以及平台导入仍需分别核验。

## 提交给 Loopit 的内容

若已有适用的 Loopit 连接器，优先使用。否则在用户已登录的工作台，用常规界面新建草稿或打开指定的现有草稿。第一次导入用以下结构填写实际项目值。后续更新给目标草稿、旧版和新版 commit、限定的变更范围和复测路径。

```text
Create one editable Loopit draft named [game title]. Use the actual source
files at the exact pinned commit below. Keep the project as a draft.

Commit and source directory
[Full commit SHA and GitHub tree permalink]

Source files
[Raw URLs for the entry and every required file, with byte counts or hashes]

Entry and host adaptation
[Original entry, script order and build command if needed]
Preserve the original mechanics, art, camera, touch controls and progression.
Keep relative paths and execution order. Adapt packaging only as the host
requires. Use the editable project workspace to run the original game.
If packaging needs a single entry, preserve the actual source when bundling it.
If a required source is inaccessible, report the exact file and error.
Keep the draft unpublished and do not submit it for review.

Acceptance
[Device size, specific path from zero progress, expected ending or score]
Report the source commit, files actually read, host adaptations, actual
preview tests, and saved version. Distinguish any unverified items.
```

平台要求 `dist/index.html` 时，按实际项目构建，或为无需构建的静态游戏复制入口与依赖。保留可编辑源码，并保留程序逻辑与资源。遇到读取失败，先排查该 Raw URL、提交和权限，避免用重绘、远程嵌页或改写玩法掩盖导入问题。

## 实际试玩、保存和重开

1. 以工作台出现的实际产物和试玩入口为准，核对导入回执、目标版本和可编辑状态。平台回执可记录源码处理情况，通关与持久化以实际验收为准。
2. 从该版本的实际 Loopit 预览进入，全程在手机竖屏尺寸操作，从开场到预期结局。记录实际分数或进度、问题和必要截图。本地 H5 通关可以定位差异，Loopit 预览需独立验收。
3. 如有保存按钮则保存。如平台自动保留生成版本，从「我的作品」找到项目，核对可辨识的标题、版本和未送审状态。重新打开，确认是刚才试玩的版本且仍可编辑、预览可用。用户要求草稿时保持该状态。
4. 多款分批执行，用单款记录对应固定提交、导入回执、草稿 URL、版本、尺寸、结局、保存重开结果和截图。生成后继续等待和检查。若界面限流，缩小并行批次，关掉不用的临时页，再从已有项目继续。提交结果不明时先查该项目与版本再重试，避免重复创建草稿。
