# 3D H5 游戏制作与游戏平台交付

`$mini-game-production` 可以读取飞书或网页上的游戏 brief，制作独立的 3D H5 游戏，在手机竖屏试玩验收，推送 GitHub，并从固定提交导入指定的游戏平台并创建可编辑草稿。也可以只执行其中几步。

## 在另一台电脑上使用

### 在本仓库里使用

1. 在新电脑上打开 Codex，并用 Git 克隆仓库。

   ```bash
   git clone https://github.com/LRyanX/mini-game.git
   ```

2. 在 Codex 里把克隆得到的 `mini-game` 目录打开为项目，然后新建聊天。Codex 会从仓库里的 `.agents/skills` 发现这个 Skill。 [Codex 技能发现规则](https://learn.chatgpt.com/docs/build-skills#where-codex-loads-local-skills)
3. 在聊天里输入 `$mini-game-production`，加上 brief 链接和要执行的步骤。仓库已有本地副本时，拉取更新即可取得新版本的项目 Skill。

### 在其他项目里也能调用

在新电脑的 Codex 聊天里输入这条安装指令。

> 用 `$skill-installer` 安装 GitHub 仓库 `LRyanX/mini-game` 的 `main` 分支下的 `.agents/skills/mini-game-production`。

安装后，在目标项目的新聊天里调用 `$mini-game-production`。如果技能列表还没显示，重新打开 Codex。 [Codex 官方安装说明](https://learn.chatgpt.com/docs/build-skills#install-curated-skills-for-local-use)

## 文件夹结构

同一个文档链接可以包含多个独立 brief。各 brief 分别确定主题、玩法、款数和验收要求。每个 brief 对应一个顶层目录，下面只放这份 brief 对应的游戏。本仓库的结构如下。

~~~text
black-friday/
  checkout-courier/
  cart-stack/
  ...
treasure-hunt/
  lodestone-mine/
  tilt-relic/
  ...
~~~

## 调用示例

**从 brief 到游戏平台草稿**

~~~text
用 $mini-game-production 读取飞书文档 <链接>。
文档里的各个 brief 独立制作和验收，每个 brief 一个目录，每款游戏一个子目录。
按各 brief 的款数制作 3D H5 游戏，在手机竖屏从开场试玩到结局。
验收通过后推送到 <GitHub 仓库 URL>，用推送后的固定 commit 导入游戏平台 <平台或工作台链接>。
每款单独保存为可编辑草稿，试玩后重开确认，并汇总草稿链接和测试结果。
~~~

**本轮只做本地 H5**

~~~text
用 $mini-game-production 读取 brief <链接>。
先完成本地 H5 和手机竖屏验收。这一轮的交付范围到本地为止。
~~~

**把已有 H5 的固定提交导入游戏平台**

~~~text
用 $mini-game-production 把 <GitHub 仓库 URL> 中 commit <完整 SHA>
下的 <brief目录>/<游戏目录> 导入游戏平台 <平台或工作台链接>。用实际源码生成可编辑草稿，
在手机竖屏从头试玩到结局，再保存并重开确认。
~~~

## 账号与验收结果

- 读取私有文档时，使用能访问该文档的连接器或已登录的浏览器。若一份文档含多个 brief，可以在消息里指定要执行的 brief 和各自的款数。
- 推送 GitHub 时，新电脑的 Git 或连接器需要对目标仓库有写入权限。本地源码清单工具需要 Git 和 Python 3.9 或更新版本。
- 导入游戏平台时，在新电脑的浏览器登录相应工作台。游戏平台需要能读取固定提交的源文件。私有仓库使用已授权的访问方式。
- 完整流程的验收汇总包含每款的固定 commit、草稿链接、竖屏通关结果、保存重开状态。Skill 默认以可编辑草稿交付，发布和送审由你另行指定。

[查看 Skill 源文件](../.agents/skills/mini-game-production/SKILL.md)
