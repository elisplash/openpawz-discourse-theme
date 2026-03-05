# OpenPawz Kinetic — Discourse Theme

The official community theme for [OpenPawz](https://openpawz.com) Discourse forums. Brings the full Pawz design system — industrial aesthetics, warm cream-on-void typography, kinetic red accents, film grain textures, and animated micro-interactions — into your Discourse instance.

## Design System

Ported 1:1 from the OpenPawz website:

- **Colors**: Warm cream text (`#EDE6DB`) on void black (`#080808`), kinetic red accent (`#FF4D4D`)
- **Typography**: System sans-serif for body, `Share Tech Mono` for labels/tags/UI chrome
- **Borders**: Sharp 1px grid lines, 2-3px radius (industrial, not rounded)
- **Motion**: Breathing indicators, spring hover effects, signal waves, page transitions
- **Textures**: Film grain overlay, accent atmosphere glow, radial category glows
- **Buttons**: Transparent background, accent outlines, uppercase pixel font

## Included Color Schemes

| Scheme | Background | Accent | Description |
|--------|-----------|--------|-------------|
| **OpenPawz Dark** | `#080808` | `#FF4D4D` | Default — kinetic red on void |
| **OpenPawz Light** | `#F5F0EB` | `#CC3333` | Warm paper with muted red |
| **OpenPawz Midnight** | `#0B1120` | `#4D9EFF` | Deep blue with electric accents |
| **OpenPawz Cyberpunk** | `#0A0A12` | `#FF2D78` | Neon pink on dark chrome |

## Features

### Hero Banner
A branded welcome banner on the homepage with live community stats (topics, posts, members) pulled from the Discourse API in real time. Includes a grid-pattern background, radial accent glow, and badge label.

### Custom Footer
Full branded 4-column footer matching the OpenPawz website with Product, Community, and Legal sections plus social links configured via theme settings.

### Category Banners
Each category page gets a colour-matched header banner using the category's assigned colour with a radial glow background.

### Enhanced Topic Cards
Topic list items get accent-coloured left-border indicators and a subtle glow effect on hover.

### Page Transitions
Smooth fade-in animations when navigating between routes via the Discourse Plugin API.

### Post Materialise Animation
New posts animate into view with a staggered materialise effect as they load.

### Plugin Compatibility
Custom styles for Discourse Solved, Assign, Narrative Bot, and more — all matched to the Pawz design language.

### Loading Animation
Custom branded loading pulse replaces the default Discourse spinner.

### Comprehensive UI Coverage
Styled: login/signup modals, user profiles, notification panels, badges page, groups page, topic map, whisper posts, admin panel, lightbox, bookmarks, tooltips, keyboard shortcuts modal, upload progress, and more.

## Installation

### From Git (recommended)

1. Go to **Admin → Customize → Themes**
2. Click **Install** → **From a git repository**
3. Enter the repository URL:
   ```
   https://github.com/OpenPawz/discourse-theme.git
   ```
4. Click **Install**
5. Set as the default theme or let users select it

### Manual Upload

1. Download this repository as a ZIP
2. Go to **Admin → Customize → Themes**
3. Click **Install** → **From your device**
4. Upload the ZIP file

## Theme Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `openpawz_grain_overlay` | `true` | Film grain texture overlay |
| `openpawz_kinetic_animations` | `true` | Spring hover & breathing animations |
| `openpawz_logo_url` | _(empty)_ | Custom logo image URL |
| `openpawz_show_back_to_site` | `true` | "Back to OpenPawz" header bar |
| `openpawz_site_url` | `https://openpawz.com` | Back-to-site link destination |
| `openpawz_show_hero_banner` | `true` | Branded hero banner on homepage |
| `openpawz_hero_title` | `"Welcome to the Pawz Den"` | Hero banner heading text |
| `openpawz_hero_subtitle` | _(see settings.yml)_ | Hero banner description |
| `openpawz_show_custom_footer` | `true` | Custom branded footer |
| `openpawz_github_url` | `https://github.com/OpenPawz` | GitHub link (footer/hero) |
| `openpawz_discord_url` | `https://discord.gg/openpawz` | Discord invite link (footer) |
| `openpawz_docs_url` | `https://docs.openpawz.com` | Documentation link (footer) |
| `openpawz_twitter_url` | `https://x.com/openpawz` | Twitter/X link (footer) |
| `openpawz_custom_loading` | `true` | Custom loading animation |
| `openpawz_category_banners` | `true` | Category page colour banners |
| `openpawz_enhanced_topic_cards` | `true` | Enhanced topic list styling |
| `openpawz_page_transitions` | `true` | Animated page transitions |

## File Structure

```
discourse-theme/
├── about.json              # Theme metadata & color schemes
├── settings.yml            # Configurable settings
├── locales/
│   └── en.yml              # English translations
├── common/
│   ├── common.scss         # Core styles (all platforms, ~1800 lines)
│   ├── head_tag.html       # Plugin API: transitions, hero, category banners
│   ├── body_tag.html       # Plugin API: custom footer injection
│   ├── header.html         # Above-header site link connector
│   └── after_header.html   # "Back to OpenPawz" bar
├── desktop/
│   └── desktop.scss        # Desktop-specific layout overrides
├── mobile/
│   └── mobile.scss         # Mobile-specific responsive layout
└── assets/
    └── fonts/              # (optional) bundled fonts
```

## Customization

The theme uses CSS custom properties prefixed with `--pawz-*`. Override them in your Discourse theme component:

```scss
:root {
  --pawz-accent: #your-color;
  --pawz-bg: #your-bg;
  --pawz-atmo-color: R, G, B;  // atmosphere glow (comma-separated RGB)
}
```

## Compatibility

- Discourse 3.0+
- Works with Discourse Chat, Polls, Solved, Assign, and standard plugins
- Responsive (desktop + mobile)
- Reduced-motion support for accessibility

## License

MIT — see [LICENSE](LICENSE)
