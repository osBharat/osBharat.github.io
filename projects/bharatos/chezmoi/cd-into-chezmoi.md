---
sidebar_position: 2
---

# cd into chezmoi
there are two ways

## 1️⃣. `chezmoi cd` {#chezmoi-cd}
```bash title="🔴 🟡 🟢"
~/.config ❯ chezmoi cd   ## cd into chezmoi source directory and enter into subshell $SHELL
~/.local/share/chezmoi ❯ exit  ## exit will bring you back to your previously working directory
~/.config ❯
```

Conceptually it behaves like :
```bash
(cd "$(chezmoi source-path)" && $SHELL)
```

- You enter a subshell already inside the source directory
- You do not change the directory of your current shell   
- You get a temporary workspace   
- When you exit that shell, you go back to your previously working directory where you were before   
  
**philosophy** : Drop me into my chezmoi source tree, let me work, then return me back safely



## 2️⃣. `cd $(chezmoi source-path)` {#chezmoi-source-path}
```bash title="🔴 🟡 🟢"
~/.config ❯ cd $(chezmoi source-path) # cd into `~/.local/share/chezmoi` in linux
~/.local/share/chezmoi ❯ exit  # will exit the terminal
```

- `chezmoi source-path` prints the raw path
- Your shell runs `cd` to that path
- You stay in the same shell
- Your working directory gets change

---

| Command                       | Changes current shell dir? | Spawns a new shell? |
| ----------------------------- | -------------------------- | ------------------- |
| `cd "$(chezmoi source-path)"` | ✅ yes                      | ❌ no                |
| `chezmoi cd`                  | ❌ no                       | ✅ yes               |


