// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'My Site',
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
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
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
        sidebarPath: require.resolve('./sidebars.js'),
        // ... other options
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
        title: 'My Site',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Tutorial',
          },
	  {
            type: 'docSidebar',
            sidebarId: 'devopsSidebar',
            position: 'left',
            label: 'DevOps',
            docsPluginId: 'devopsPluginId',
          },
          { type: 'search', position: 'right' },
          {
            href: 'https://github.com/facebook/docusaurus',
            label: 'GitHub',
            position: 'right',
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
                label: 'Tutorial',
                to: '/',
              },
              {
                label: 'DevOps',
                to: '/devops',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'X',
                href: 'https://x.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
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
