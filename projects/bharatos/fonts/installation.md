---
sidebar_position: 2
---


## Physical Font File Locations

### From the official repos or AUR
```perl  title="🔴 🟡 🟢"
sudo pacman -S ttf-dejavu ttf-liberation noto-fonts
# or from AUR (using yay/paru)
yay -S ttf-ms-fonts
```

### Manually

#### Font Files
| Path | Scope | Managed By |
|------|-------|------------|
| `/usr/share/fonts/` | System-wide | **Package manager** `pacman` — fonts installed via packages go here |
| `~/.local/share/fonts` | Per-user | **User** — manually downloaded/copied fonts go here |


#### Font Config
config preset installed by `fontconfig` package :
| Path | Scope | Managed By |
|------|-------|------------|
| `/usr/share/fontconfig/conf.avail/` | System-wide | `fontconfig` package — pre-made optional config snippets you can enable by symlinking into `/etc/fonts/conf.d/` |    

this is how Arch enables it via symlinks :

| Configs | Symlinked to | Symlinked to |
|------|-------|------------| 
| `/usr/share/fontconfig/conf.avail/` --> | `/usr/share/fontconfig/conf.default` --> | `/etc/fonts/conf.d` |

---

## Font Cache

After adding new fonts to any of the above directories, you must refresh the font cache so the system recognizes them.
```perl  title="🔴 🟡 🟢"
fc-cache -fv        # Rebuild and refresh the font cache (forcefully verbose)
```

---

## Verifying Installed Fonts
```perl  title="🔴 🟡 🟢"
fc-list                    # List all known fonts (full details)
fc-list | grep "Font Name" # Search for a specific installed font

fc-list : family           # Font family name
fc-list : style            # Regular / Bold / Italic etc
fc-list : file             # Font file path
fc-list : spacing          # is it monospace or not. important for terminal
fc-list : fullname         # Full face name

fc-list : family style     # combine both
```

---

## Generic Font Names

Most applications do not request a specific font by name. Instead, they request one of three **generic font family names**:

- `serif`
- `sans-serif`
- `monospace`

Fontconfig is responsible for mapping these generic names to an actual installed font. For example:
```
"Noto Sans"  ──mapped to──►  "sans-serif"
```

This means that by controlling these mappings, you can change the default font for almost every application at once.

> **Note:** If you don't define these mappings yourself, Fontconfig will use its own internal priority list to pick a default — which may or may not look good.

---

## Font Config File Locations
To tell the system which fonts you prefer, you need to create a configuration file.

| Path | Scope | Managed By |
|------|-------|------------|
| `~/.config/fontconfig/fonts.conf` | Per-user | **User** — your personal font preferences and mappings |
| `/etc/fonts/local.conf` | System-wide | **System Admin and User both** — safe place for system-wide custom tweaks |
| `/etc/fonts/fonts.conf` | System-wide | **Package manager** (`fontconfig` package) — do **NOT** edit, gets overwritten on updates |

> **Priority:** User configuration files take precedence over system-wide configuration files.


### Minimal `fonts.conf` Structure
```xml
<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>

  <!-- Your rules go here -->

</fontconfig>
```

---

## Checking Active Font Mappings

To see which font is currently being used for each generic family:
```perl  title="🔴 🟡 🟢"
fc-match serif
fc-match sans-serif
fc-match monospace
```

To inspect the full rendering settings applied to a font (e.g., antialiasing):
```perl  title="🔴 🟡 🟢"
fc-match --verbose monospace | grep antialias
```
