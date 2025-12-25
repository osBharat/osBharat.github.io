// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'BharatOS',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

	
  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
	  hashed: true,                             // Setting to `true` is recommended for long-term caching of the index file
          docsDir: ['projects/bharatos', 'projects/devops'], // above 'hashed: true' hash these directories
          indexDocs: true,                          // Set to `false` if you do not want your `/docs` directory to be searchable.
          docsRouteBasePath: ['/', 'devops'],       // for docs-only mode, this needs to be the same as `routeBasePath` in your `@docusaurus/preset-classic`
	                                            // (Slash at the beginning is not required)
          indexBlog: false,                         // Set to `false` if you do not want your `/blog` directory to be searchable.
          // blogRouteBasePath: "/blog",            // (Slash at the beginning is not required)
          indexPages: false,                        // if you have standalone Markdown pages outside of your `/docs` or `/blog` directories
	                                            // that you want to be searchable. set `true` to index other pages.
          highlightSearchTermsOnTargetPage: true,   // Whether to highlight search terms on the target page after pressing `enter` key
          // searchResultLimits: 8,                 // Limit the number of search results shown in the search box after typing query in the search bar
          searchResultContextMaxLength: 70,         // Set the maximum length of characters of each search result context to show
          // searchBarPosition: "auto",             // which side search menu should appear when you type anything in
	                                            // the search box {"auto" | "left" | "right"}
          // removeDefaultStemmer: false,           // hard searching. typos are not allowd. fuzzy search is not allowed
          searchBarShortcutHint: false,             // Disable it if you need to hide the hint while the shortcut is still enabled
          // searchBarShortcutKeymap: "mod+k",      // key binding to launch search (if you will set single key like 's' you can't type that
	                                            // key inside the search bar to search something)
      }),
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'projects/bharatos',
          routeBasePath: '/',
          sidebarPath: './sidebar/sidebars-bharatos.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/osBharat/osBharat.github.io/tree/main/',
        },
	blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        svgr: {            
          svgrConfig: {
            svgo: true,    
            svgoConfig: {
              plugins: [   
                {
                  name: "removeUnknownsAndDefaults",
                  params: {
                    unknownAttrs: false,
                  }
                },
              ],
            },
          },
        },
      }),
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'devopsPluginId',
        path: 'projects/devops',
        routeBasePath: 'devops',
        sidebarPath: require.resolve('./sidebar/sidebars-devops.js'),
        editUrl:
          'https://github.com/osBharat/osBharat.github.io/tree/main/',
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'BharatOS',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          // {
          //   type: 'docSidebar',
          //   sidebarId: 'tutorialSidebar',
          //   position: 'left',
          //   label: 'Tutorial',
          // },
          {
            type: 'docSidebar',
            sidebarId: 'devopsSidebar',
            position: 'left',
            label: 'DevOps',
            docsPluginId: 'devopsPluginId',
          },
          { type: 'search', position: 'right' },
          {
            href: 'https://github.com/osBharat/osBharat.github.io',
            // label: 'GitHub',
            position: 'right',
            // className: 'header-github-link',  // use this className in custom.css if required
            //'aria-label': 'GitHub repository', // text label for screen readers
            html: '<svg style="vertical-align: middle;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="24" height="24"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'BharatOS',
                to: '/',
              },
              {
                label: 'DevOps',
                to: '/devops',
              },
            ],
          },
          // {
          //   title: 'Community',
          //   items: [
          //     {
          //       label: 'Stack Overflow',
          //       href: 'https://stackoverflow.com/questions/tagged/docusaurus',
          //     },
          //     {
          //       label: 'Discord',
          //       href: 'https://discordapp.com/invite/docusaurus',
          //     },
          //     {
          //       label: 'X',
          //       href: 'https://x.com/docusaurus',
          //     },
          //   ],
          // },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/osBharat/osBharat.github.io',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
	additionalLanguages: ['bash'],
      },
    }),
};

export default config;
