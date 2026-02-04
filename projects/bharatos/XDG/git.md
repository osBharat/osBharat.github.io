
# git

3 Ways to Move Git Dotfiles Out of `$HOME`

---

# precedence


Git supports XDG by default but if there is no any git configuration related file present in legacy path `$HOME` as well as in the XDG path `$HOME/.config/git/` in that case Git prioritizes legacy path (like `$HOME/.gitconfig`) over the XDG_Base_Directory path (like `$HOME/.config/git/config`).   

```bash
  git config --global user.email "you@example.com"
  git config --global user.name "Your Name"
```
- Means above command will create file at `$HOME/.gitconfig` not in `$HOME/.config/git/config` even though git supports XDG.   
- Git only prefers `$XDG_CONFIG_HOME/git/config` over `~/.gitconfig` if the XDG file exists; otherwise it falls back to `~/.gitconfig`.

---

# 1️⃣ environment variable

first set [XDG Base Directory Specification](intro) then set billow environment variable in `$HOME/.bash_profile` or `$HOME/.zprofile`
```bash
export GIT_CONFIG_GLOBAL="$XDG_CONFIG_HOME/git/config"
```
it will force git to ignore legacy path and only use XDG. even though git config is already present at `$HOME/.gitconfig` git will ignore it and will use fresh config at `$HOME/.config/git/config`

**Required** : \
`$HOME/.config/git/` directory must be already present there if not then create it

**Pros** : \
no empty skeleton file required on the path such as `$HOME/.config/git/config`. git will create `config` file by it's own

**Cons** : \
**GIT_CONFIG_GLOBAL** variable only works for `~/.gitconfig` not for other files like `~/.gitignore` `~/.gitattributes` `~/.git-credentials` `~/.gitk`

---

# 2️⃣ [create / move] config to XDG

1. create empty skeleton file on XDG to make git to use it by default.   
```bash
# these are the XDG supported path
touch $XDG_CONFIG_HOME/git/config   
touch $XDG_CONFIG_HOME/git/ignore   
touch $XDG_CONFIG_HOME/git/attributes   
touch $XDG_CONFIG_HOME/git/credentials   
touch $XDG_CONFIG_HOME/git/gitk   
```

2. Move your existing file in the `$XDG_CONFIG_HOME/git/`   
```bash
mv   ~/.gitconfig       $XDG_CONFIG_HOME/git/config
mv   ~/.gitignore       $XDG_CONFIG_HOME/git/ignore
mv   ~/.gitattributes   $XDG_CONFIG_HOME/git/attributes
mv   ~/.git-credentials $XDG_CONFIG_HOME/git/credentials
mv   ~/.gitk            $XDG_CONFIG_HOME/git/gitk
```

:::tip
- just `mkdir $XDG_CONFIG_HOME/git/` will not work. git will fallback to legacy path `$HOME`. we need to create complete path of each `touch "$XDG_CONFIG_HOME"/git/{config,ignore,attributes,credentials,gitk}`.   
- You can manage it by [chezmoi dotfile manager](https://www.chezmoi.io/) 
- To look at the content of all files at once use `$cat *` command.
:::

**Pros** :   
No **GIT_CONFIG_GLOBAL** environment variable required. BTW this env just works for `~/.gitconfig`   

**Source** :   
https://wiki.archlinux.org/title/XDG_Base_Directory find `git`

---

# 3️⃣ git configs at custom path


billow config supports custom path by default
```bash

# to change the path of git config use environment variable (mentioned in section 1 above).
export GIT_CONFIG_GLOBAL="$XDG_CONFIG_HOME/path_to_directory/config"

git config --global core.excludesFile   "$XDG_CONFIG_HOME/path_to_directory/ignore"
git config --global core.attributesFile "$XDG_CONFIG_HOME/path_to_directory/attributes"
git config --global credential.helper   "store --file $XDG_CONFIG_HOME/path_to_directory/credentials"
```

**git global hooks** :   
Git has no default "global hooks" directory. There is only a per-repository hooks directory by default `.git/hooks/`. to set global hooks use billow command.
```bash
git config --global core.hooksPath      "$XDG_DATA_HOME/path_to_directory/hooks"
```


**git global templates** :   
`git init` copies the contents of the built-in global template directory (`/usr/share/git-core/templates` on Unix) into the new repository's `.git/` directory and this happens only once at creation time. it copies some defaults like hooks, .gitignore, or info/exclude to `.git/` . 
```bash
### git Priority order ###

# Set to repo locally
git init --template=/path/to/templates 
git clone REPO --template=/path/to/templates

# ---Or--- set this environment variable 
export GIT_TEMPLATE_DIR=/path/to/your/templates

# ---Or--- To use your own global templates directory use billow command.
git config --global init.templateDir "$XDG_DATA_HOME/path_to_directory/templates"

# ---Or--- Otherwise by default it will fallback to System default (/usr/share/git-core/templates on Unix)
```

**Cons** :   
`gitk` doesn't support custom config path it's default to `$HOME/.gitk` or `$XDG_CONFIG_HOME/git/gitk`


:::info
When you execute `git config --global xxxx.xxxx "xxxx"`, Git persistently stores this setting in your global configuration file (typically `~/.gitconfig` or `~/.config/git/config` or `$GIT_CONFIG_GLOBAL` path), ensuring it applies to future `git init` operations.
:::







