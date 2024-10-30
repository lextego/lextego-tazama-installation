// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
// Import Types
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type {Options as DocsOptions} from '@docusaurus/plugin-content-docs';
import type {Options as PageOptions} from '@docusaurus/plugin-content-pages';
// Import the Docusaurus version.
import { DOCUSAURUS_VERSION } from '@docusaurus/utils'
// Setup our Prism themes.
import { themes } from 'prism-react-renderer';
const lightCodeTheme = themes.vsLight;
const darkCodeTheme = themes.vsDark;

// Define our admonitions config.
const admonitionsConfig = {
  admonitions: {
    keywords: [
      'discord',
      'info',
      'success',
      'danger',
      'note',
      'tip',
      'warning',
      'important',
      'caution',
      'powershell',
      'security',
      'ninja',
      'release',
      'credit',
      'docusaurus'
    ],
  },
}

// Import our remark plugins.
import npm2yarn from '@docusaurus/remark-plugin-npm2yarn';
import tabBlocks from 'docusaurus-remark-plugin-tab-blocks';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkDefList from 'remark-deflist';
// Setup our common remark plugin config.
const remarkPluginsConfig = {
  remarkPlugins: [
    [ npm2yarn, { sync: true } ],
    tabBlocks,
    remarkMath,
    rehypeKatex,
    remarkDefList,
  ]
}

// Setup our common config options for docs plugin instances.
const commonDocsPluginConfig = {
  sidebarCollapsible: true,
  sidebarCollapsed: true,
  ...admonitionsConfig,
  ...remarkPluginsConfig,
}


const config: Config = {
  title: 'LexTego',
  tagline: 'Where the LexTego INTERNAL documentation is hosted',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://documentation.LexTego.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'LexTego', // Usually your GitHub org/user name.
  projectName: 'documentation', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/lextego/documentation',
          ...commonDocsPluginConfig,
        } satisfies DocsOptions,
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'httpshttps://github.com/lextego/documentation',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        pages: {
          ...admonitionsConfig,
          ...remarkPluginsConfig
        } satisfies PageOptions,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },    
    navbar: {
      title: 'LexTego',
      logo: {
        alt: 'LexTego logo',
        src: 'img/LTlogo.svg',
      },
      hideOnScroll: true,
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
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
              label: 'Documentation',
              to: '/docs/intro',
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
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} LexTego Ltd. Built with Docusaurus.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: ['powershell','bash','docker', 'diff', 'json', 'sass']
    },
  } satisfies Preset.ThemeConfig,

  plugins: [
    [
      '@docusaurus/plugin-ideal-image',
      /** @type {import('@docusaurus/plugin-ideal-image').Options} */
      {
        quality: 100,
        max: 1030, // max resized image's size.
        min: 640, // min resized image's size. if original is lower, use that size.
        steps: 2, // the max number of images generated between min and max (inclusive)
      },
    ],
    'docusaurus-plugin-sass',
  ],
  themes: [
    '@docusaurus/theme-mermaid',
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        indexDocs: true,
        indexBlog: false,
        indexPages: true,
        docsRouteBasePath: ["docs"],
        hashed: true,
        docsDir: ["docs"],
        highlightSearchTermsOnTargetPage: true,
      }),
    ],
  ],
  
  webpack: {
    jsLoader: (isServer: boolean) => ({
      loader: 'swc-loader',
      options: {
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
          },
          transform: {
            react: {
              runtime: 'automatic',
            }
          },
          target: 'es2017',
        },
        module: {
          type: isServer ? 'commonjs' : 'es6',
        },
      },
    }),
  },
  markdown: {
    format: 'detect',
    mermaid: true,
    mdx1Compat: {
      comments: false,
      headingIds: false,
      admonitions: false,
    }
  },
};

export default config;
