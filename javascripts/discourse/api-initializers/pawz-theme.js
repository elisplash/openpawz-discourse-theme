import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.0", (api) => {
  const body = document.body;

  // ── Body classes based on settings ──────────────────
  if (settings.openpawz_grain_overlay) {
    body.classList.add("pawz-grain");
  }
  if (settings.openpawz_kinetic_animations) {
    body.classList.add("pawz-kinetic");
  }
  if (settings.openpawz_page_transitions) {
    body.classList.add("pawz-transitions");
  }
  if (settings.openpawz_enhanced_topic_cards) {
    body.classList.add("pawz-enhanced-cards");
  }
  if (settings.openpawz_custom_loading) {
    body.classList.add("pawz-custom-loading");
  }
  if (settings.openpawz_category_banners) {
    body.classList.add("pawz-category-banners");
  }

  // ── Page transition animation ───────────────────────
  if (settings.openpawz_page_transitions) {
    api.onPageChange(() => {
      const outlet = document.querySelector("#main-outlet");
      if (outlet) {
        outlet.classList.remove("pawz-page-enter");
        void outlet.offsetWidth;
        outlet.classList.add("pawz-page-enter");
      }
    });
  }

  // ── Hero banner — inject on discovery (homepage) ────
  if (settings.openpawz_show_hero_banner) {
    api.onPageChange((url) => {
      const isHomepage = url === "/" || url === "";
      const existing = document.querySelector(".pawz-hero");

      if (isHomepage && !existing) {
        const outlet = document.querySelector("#main-outlet");
        if (outlet) {
          const hero = document.createElement("div");
          hero.className = "pawz-hero";

          const title = settings.openpawz_hero_title;
          const subtitle = settings.openpawz_hero_subtitle;

          // Tesseract wireframe SVG — golden geometric lines, richer geometry
          const wireframeSvg = `<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="pawz-wire-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#D4A853;stop-opacity:0.8"/>
                <stop offset="50%" style="stop-color:#FF8C28;stop-opacity:1"/>
                <stop offset="100%" style="stop-color:#D4A853;stop-opacity:0.6"/>
              </linearGradient>
              <linearGradient id="pawz-wire-dim" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#D4A853;stop-opacity:0.3"/>
                <stop offset="100%" style="stop-color:#FF8C28;stop-opacity:0.5"/>
              </linearGradient>
            </defs>
            <g fill="none" stroke="url(#pawz-wire-grad)" stroke-width="1.5">
              <!-- Outer cube -->
              <polygon points="150,180 650,180 650,620 150,620"/>
              <polygon points="240,110 740,110 740,550 240,550"/>
              <line x1="150" y1="180" x2="240" y2="110"/>
              <line x1="650" y1="180" x2="740" y2="110"/>
              <line x1="650" y1="620" x2="740" y2="550"/>
              <line x1="150" y1="620" x2="240" y2="550"/>
              <!-- Inner cube -->
              <polygon points="290,290 510,290 510,510 290,510"/>
              <polygon points="340,240 560,240 560,460 340,460"/>
              <line x1="290" y1="290" x2="340" y2="240"/>
              <line x1="510" y1="290" x2="560" y2="240"/>
              <line x1="510" y1="510" x2="560" y2="460"/>
              <line x1="290" y1="510" x2="340" y2="460"/>
            </g>
            <!-- 4D connections (dashed) -->
            <g fill="none" stroke="url(#pawz-wire-grad)" stroke-width="1" stroke-dasharray="5,7">
              <line x1="150" y1="180" x2="290" y2="290"/>
              <line x1="650" y1="180" x2="510" y2="290"/>
              <line x1="650" y1="620" x2="510" y2="510"/>
              <line x1="150" y1="620" x2="290" y2="510"/>
              <line x1="240" y1="110" x2="340" y2="240"/>
              <line x1="740" y1="110" x2="560" y2="240"/>
              <line x1="740" y1="550" x2="560" y2="460"/>
              <line x1="240" y1="550" x2="340" y2="460"/>
            </g>
            <!-- Extra wireframe triangles -->
            <g fill="none" stroke="url(#pawz-wire-dim)" stroke-width="0.8">
              <line x1="150" y1="180" x2="650" y2="620"/>
              <line x1="650" y1="180" x2="150" y2="620"/>
              <line x1="240" y1="110" x2="740" y2="550"/>
              <line x1="740" y1="110" x2="240" y2="550"/>
              <line x1="400" y1="110" x2="400" y2="620"/>
              <line x1="150" y1="400" x2="740" y2="400"/>
            </g>
            <!-- Node dots with glow -->
            <g>
              <circle cx="150" cy="180" r="3.5" fill="#D4A853" fill-opacity="0.7"/>
              <circle cx="650" cy="180" r="3.5" fill="#D4A853" fill-opacity="0.7"/>
              <circle cx="650" cy="620" r="3.5" fill="#FF8C28" fill-opacity="0.7"/>
              <circle cx="150" cy="620" r="3.5" fill="#FF8C28" fill-opacity="0.7"/>
              <circle cx="240" cy="110" r="3" fill="#D4A853" fill-opacity="0.5"/>
              <circle cx="740" cy="110" r="3" fill="#D4A853" fill-opacity="0.5"/>
              <circle cx="740" cy="550" r="3" fill="#FF8C28" fill-opacity="0.5"/>
              <circle cx="240" cy="550" r="3" fill="#FF8C28" fill-opacity="0.5"/>
              <circle cx="400" cy="400" r="5" fill="#D4A853" fill-opacity="0.9"/>
              <circle cx="290" cy="290" r="2.5" fill="#D4A853" fill-opacity="0.5"/>
              <circle cx="510" cy="290" r="2.5" fill="#D4A853" fill-opacity="0.5"/>
              <circle cx="510" cy="510" r="2.5" fill="#FF8C28" fill-opacity="0.5"/>
              <circle cx="290" cy="510" r="2.5" fill="#FF8C28" fill-opacity="0.5"/>
            </g>
          </svg>`;

          const logoUrl = settings.openpawz_logo_url || "";
          const logoHtml = logoUrl ? `<div class="pawz-hero-logo"><img src="${logoUrl}" alt="" onerror="this.parentElement.remove()"/></div>` : "";

          hero.innerHTML = `
            <div class="pawz-hero-wireframe">${wireframeSvg}</div>
            <div class="pawz-hero-glow"></div>
            <div class="pawz-hero-content">
              ${logoHtml}
              <div class="pawz-hero-headlines"></div>
              <p class="pawz-hero-subtitle"></p>
              <div class="pawz-hero-stats" id="pawz-hero-stats"></div>
            </div>
          `;

          // Split title on "." to create separate lines
          const headlinesEl = hero.querySelector(".pawz-hero-headlines");
          const lines = title.split(".").filter(l => l.trim());
          lines.forEach((line) => {
            const h1 = document.createElement("h1");
            h1.className = "pawz-hero-title";
            h1.textContent = line.trim() + ".";
            headlinesEl.appendChild(h1);
          });
          hero.querySelector(".pawz-hero-subtitle").textContent = subtitle;

          outlet.prepend(hero);

          // Populate stats from Discourse site data
          try {
            const statsEl = document.getElementById("pawz-hero-stats");
            const siteStats = api.container.lookup("service:site");
            if (siteStats && statsEl) {
              const categories = siteStats.get("categories");
              const topicCount = categories
                ? categories.reduce((sum, c) => sum + (c.topic_count || 0), 0)
                : "—";

              const statValues = [
                { value: topicCount, label: "Topics" },
                { value: categories ? categories.length : "—", label: "Categories" },
              ];

              statValues.forEach(({ value, label }) => {
                const stat = document.createElement("div");
                stat.className = "pawz-hero-stat";

                const valEl = document.createElement("span");
                valEl.className = "pawz-hero-stat-value";
                valEl.textContent = value;

                const labelEl = document.createElement("span");
                labelEl.className = "pawz-hero-stat-label";
                labelEl.textContent = label;

                stat.appendChild(valEl);
                stat.appendChild(labelEl);
                statsEl.appendChild(stat);
              });
            }
          } catch (e) {
            // stats are optional
          }
        }
      } else if (!isHomepage && existing) {
        existing.remove();
      }
    });
  }

  // ── Signal wave on new post ─────────────────────────
  if (settings.openpawz_kinetic_animations) {
    api.onPageChange(() => {
      document.querySelectorAll(".topic-post").forEach((post) => {
        if (!post.dataset.pawzObserved) {
          post.dataset.pawzObserved = "1";
          post.classList.add("pawz-materialise");
        }
      });
    });
  }

  // ── Category banner injection ───────────────────────
  if (settings.openpawz_category_banners) {
    api.onPageChange((url) => {
      const match = url.match(/^\/c\/([^/]+)/);
      const existing = document.querySelector(".pawz-category-banner");

      if (match && !existing) {
        const outlet = document.querySelector("#main-outlet");
        if (outlet) {
          try {
            const siteService = api.container.lookup("service:site");
            const categories = siteService.get("categories");
            const cat = categories
              ? categories.find((c) => c.slug === match[1])
              : null;

            if (cat) {
              const banner = document.createElement("div");
              banner.className = "pawz-category-banner";
              banner.style.setProperty("--cat-color", "#" + cat.color);

              const inner = document.createElement("div");
              inner.className = "pawz-category-banner-inner";

              const dot = document.createElement("div");
              dot.className = "pawz-category-banner-dot";
              dot.style.background = "#" + cat.color;

              const textWrap = document.createElement("div");

              const nameEl = document.createElement("h2");
              nameEl.className = "pawz-category-banner-name";
              nameEl.textContent = cat.name;
              textWrap.appendChild(nameEl);

              if (cat.description_excerpt) {
                const descEl = document.createElement("p");
                descEl.className = "pawz-category-banner-desc";
                descEl.textContent = cat.description_excerpt;
                textWrap.appendChild(descEl);
              }

              inner.appendChild(dot);
              inner.appendChild(textWrap);
              banner.appendChild(inner);
              outlet.prepend(banner);
            }
          } catch (e) {
            // category lookup failed, skip banner
          }
        }
      } else if (!match && existing) {
        existing.remove();
      }
    });
  }

  // ── Custom footer injection ─────────────────────────
  if (settings.openpawz_show_custom_footer) {
    api.onPageChange(() => {
      if (document.querySelector(".pawz-footer")) return;

      const siteUrl = settings.openpawz_site_url || "https://openpawz.com";
      const githubUrl =
        settings.openpawz_github_url || "https://github.com/OpenPawz/openpawz";
      const discordUrl =
        settings.openpawz_discord_url || "https://discord.gg/wVvmgrMV";
      const docsUrl =
        settings.openpawz_docs_url || "https://docs.openpawz.ai";
      const twitterUrl =
        settings.openpawz_twitter_url || "https://x.com/openpawzai";
      const year = new Date().getFullYear();

      const footer = document.createElement("footer");
      footer.className = "pawz-footer";

      const inner = document.createElement("div");
      inner.className = "pawz-footer-inner";

      // Brand column
      const brand = document.createElement("div");
      brand.className = "pawz-footer-brand";
      const logo = document.createElement("div");
      logo.className = "pawz-footer-logo";
      logo.innerHTML =
        'Open<span class="pawz-footer-accent">Pawz</span>';
      const tagline = document.createElement("p");
      tagline.className = "pawz-footer-tagline";
      tagline.textContent =
        "Your AI, your rules. Private by default, powerful by design.";
      brand.appendChild(logo);
      brand.appendChild(tagline);

      // Helper to create a footer column
      function createCol(heading, links) {
        const col = document.createElement("div");
        col.className = "pawz-footer-col";
        const h5 = document.createElement("h5");
        h5.className = "pawz-footer-heading";
        h5.textContent = heading;
        col.appendChild(h5);
        links.forEach(([text, href]) => {
          const a = document.createElement("a");
          a.className = "pawz-footer-link";
          a.rel = "noopener noreferrer";
          a.textContent = text;
          a.href = href;
          col.appendChild(a);
        });
        return col;
      }

      const productCol = createCol("Product", [
        ["Website", siteUrl],
        ["Documentation", docsUrl],
        ["GitHub", githubUrl],
        ["Releases", githubUrl + "/releases"],
      ]);

      const communityCol = createCol("Community", [
        ["Discord", discordUrl],
        ["X / Twitter", twitterUrl],
        ["Contributing", githubUrl + "/blob/main/CONTRIBUTING.md"],
        ["Contact", siteUrl + "/contact"],
      ]);

      const legalCol = createCol("Legal", [
        ["Privacy", siteUrl + "/privacy"],
        ["Terms", siteUrl + "/terms"],
        ["Security", siteUrl + "/security"],
      ]);

      const grid = document.createElement("div");
      grid.className = "pawz-footer-grid";
      grid.appendChild(brand);
      grid.appendChild(productCol);
      grid.appendChild(communityCol);
      grid.appendChild(legalCol);

      const bottom = document.createElement("div");
      bottom.className = "pawz-footer-bottom";
      const copy = document.createElement("span");
      copy.className = "pawz-footer-copy";
      copy.textContent =
        "\u00A9 " + year + " OpenPawz. Open source under MIT.";
      const made = document.createElement("span");
      made.className = "pawz-footer-made";
      made.innerHTML =
        'Built with <span class="pawz-footer-heart">\u2665</span> for private AI';
      bottom.appendChild(copy);
      bottom.appendChild(made);

      inner.appendChild(grid);
      inner.appendChild(bottom);
      footer.appendChild(inner);

      const mainWrap =
        document.querySelector("#main-outlet-wrapper") ||
        document.querySelector("#main-outlet");
      if (mainWrap) {
        mainWrap.parentNode.insertBefore(footer, mainWrap.nextSibling);
      }
    });
  }
});
