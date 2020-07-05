//import colors from 'vuetify/es5/util/colors';
import light from './theme/dunedain-light';
import dark from './theme/dunedain-dark';
import FMMode from 'frontmatter-markdown-loader/mode';
import path from 'path';
import { md } from './markdown-it';
const consola = require ('consola');

// Staging (true) or production (false)?
const appModeStaging = false;
const publicRuntimeConfig = {
    currentYear          :  (new Date()).getFullYear(),
    vueAppMode           :  appModeStaging ? 'staging' : 'production',
    vueAppApiPath        :  'http://strahinja-org/api',
    vueAppBrowserApiPath :  appModeStaging ? 'http://strahinja-org/api' : 'https://strahinja.org/api',
    vueAppApiHost        :  'http://strahinja-org',
    vueAppBrowserApiHost :  appModeStaging ? 'http://strahinja-org' : 'https://strahinja.org',
};

const fs = require('fs');
var dynamicMarkdownRoutes = getDynamicMarkdownPaths({
    '/blog': '*.md'
});
const blogFrontmatter = getMarkdownFrontmatter(dynamicMarkdownRoutes);
const blogTags = getMarkdownTags(blogFrontmatter);
const blogGistIds = getMarkdownGistIds(blogFrontmatter);
consola.info('blogTags = ', JSON.stringify(blogTags));
consola.info('blogGistIds = ', JSON.stringify(blogGistIds));
//consola.info('nuxt.config.js: blogTags = ', JSON.stringify(blogTags));
//consola.info('nuxt.config.js: blogGistIds = ', JSON.stringify(blogGistIds));
//fs.writeFileSync('static/blog/blog-frontmatter.json', JSON.stringify(blogFrontmatter));
fs.writeFileSync('content/blog/blog-tags.json', JSON.stringify(blogTags));
fs.writeFileSync('content/blog/blog-gist-ids.json', JSON.stringify(blogGistIds));

const lastmod = (new Date()).toISOString();

dynamicMarkdownRoutes = dynamicMarkdownRoutes.concat(blogTags.map(tag =>
{
    return `/blog/tag/${tag}`;
}));

//dynamicMarkdownRoutes = ['/blog'].concat(dynamicMarkdownRoutes);
consola.info('dynamicMarkdownRoutes = ', JSON.stringify(dynamicMarkdownRoutes));

const sitemapGeneralExclusion = [
    '/noindex',
    '/search',
    '/login',
    '/login/callback',
    '/users',
    '/users/me',
    '/portfolio/edit',
];

const sitemapConfig = {
    blog: {
        path: '/blog/sitemap-2020.xml',
        routes: dynamicMarkdownRoutes,
        filter({ routes })
        {
            return routes.filter(route =>
                dynamicMarkdownRoutes.indexOf(route.url) != -1);
        }
    },
    main: {
        path: '/sitemap_main.xml',
        routes: [],
        exclude: sitemapGeneralExclusion.concat(dynamicMarkdownRoutes),
    },
};
//console.log('nuxt.config.js: sitemap config = ', JSON.stringify(sitemapConfig));

export default {
    mode: 'universal',
    target: 'server',
    //target: 'static',
    /*
     ** Headers of the page
     */
    head: {
        titleTemplate: '%s //strahinja.org',
        title: '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [
            { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
        ]
    },
    /*
     ** Customize the progress-bar
     */
    loading: '~/components/Loading.vue',
    /*
     ** Page transition
     */
    pageTransition: {
        name: 'page',
        mode: 'out-in',
    },
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        '~/plugins/breakpoint.js',
        { src: '~/plugins/check-login.js', mode: 'client' },
        '~/plugins/cookie-disclaimer.js',
        '~/plugins/datetime-picker.js',
        '~/plugins/four-oh-four.js',
        '~/plugins/jsonld.js',
        '~/plugins/markdown-it.js',
        { src: '~/plugins/theme-settings.js', mode: 'client' },
    ],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
        '@nuxt/components',
        '@nuxtjs/vuetify',
        ['@nuxtjs/dotenv', {
            filename: '.env.production'
        } ],
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        '@nuxtjs/axios',
        '@nuxt/content',
        'nuxt-content-highlight',
        //'@nuxtjs/markdownit',
        ['@nuxtjs/toast', {
            iconPack: 'custom-class',
            duration: 7000,
        }],
        '@nuxtjs/svg',
        'cookie-universal-nuxt',
        'nuxt-compress',
        //'nuxt-purgecss',
        'nuxt-webfontloader',
        '@nuxtjs/sitemap' // Must be last
    ],
    /*
     * @nuxt/components
     */
    components: [
        '~/components/',
        {
            path: '~/components/blog/',
            prefix: 'blog',
        },
    ],
    /*
     * @nuxt/content
     */
    content: {
        markdown: {
            remarkPlugins: [
                'remark-abbr',
                'remark-emoji',
                'remark-twemoji',
                'remark-heading-id',
                'remark-math',
                'remark-kbd',
                'remark-toc',
                'remark-unwrap-images',
            ],
            externalLinks: {
                content: {
                    type: 'element',
                    tagName: 'span',
                },
                contentProperties: {
                    className: ['external-link-icon','mdi','mdi-open-in-new'],
                },
            },
        },
    },
    /*
     * hooks
     */
    /*
     *hooks: {
     *    'content:file:beforeInsert': (document) =>
     *    {
     *        if (document.extension === '.md') {
     *        }
     *    }
     *},
     */
    publicRuntimeConfig,
    /*purgeCSS: {
        content: [
            './components/** /*.vue',
            './layouts/** /*.vue',
            './pages/** /*.vue',
            './node_modules/vuetify/src/** /*.ts',
        ],
        whitelist: ['html', 'body'],
    },*/
    'nuxt-compress': {
        gzip: {
            cache: true,
        },
        brotli: {
            threshold: 10240,
            //deleteOriginalAssets: true,
        },
    },
    webfontloader: {
        google: {
            families: [
                'Fira Sans Extra Condensed:400,400i,500,500i,700,700i:cyrillic,cyrillic-ext,greek,latin-ext',
                'Source Sans Pro:400,400i,700,700i:cyrillic,cyrillic-ext,greek,latin-ext',
            ],
            urls: [
                'https://fonts.googleapis.com/css?'
                    + 'family=fira+sans+extra+condensed:400,400i,500,500i,700'
                    + ',700i&display=swap&subset=cy'
                    + 'rillic,cyrillic-ext,greek,latin-ext',
                'https://fonts.googleapis.com/css?'
                    + 'family=source+sans+pro:400,400i,700,700i&display=swap&subset=cy'
                    + 'rillic,cyrillic-ext,greek,latin-ext'
            ]
        }
    },
    /*
     ** Sitemap configuration
     */
    sitemap: {
        hostname: 'https://strahinja.org',
        lastmod,
        exclude: sitemapGeneralExclusion,
        path: '/sitemap_index.xml',
        sitemaps: [
            sitemapConfig['blog'],
            sitemapConfig['main'],
        ],
    },
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {
        baseURL: publicRuntimeConfig.vueAppApiPath,
        browserBaseURL: publicRuntimeConfig.vueAppBrowserApiPath,
        proxy: true,
        proxyHeaders: true,
        credentials: false,
    },
    /*
     ** vuetify module configuration
     ** https://github.com/nuxt-community/vuetify-module
     */
    vuetify: {
        customVariables: ['~assets/sass/variables.sass'],
        defaultAssets: {
            icons: 'mdi'
        },
        theme: {
            options: {
                customProperties: true
            },
            dark: false,
            themes: {
                light, dark
            }
        }
    },
    vue: {
        config: {
            productionTip: false,
            devtools: true,
        },
    },
    /*
     ** Generate configuration
     */
    generate: {
        devtools: appModeStaging,
        fallback: true,
        //interval: 2000,
        routes: [
            '/',
            '/profil',
            '/portfolio',
            '/veze',
            //'/blog',
            '/tekstovi',
        ].concat(dynamicMarkdownRoutes),
        exclude: [
            /noindex/,
            /search/,
            /login/,
            /portfolio\/edit/,
            /users/,
        ],
    },
    /*
     ** Build configuration
     */
    build: {
    /*
     ** You can extend webpack config here
     */
        devtools: appModeStaging,
        extractCSS: !appModeStaging,
        html: {
            minify: {
                minifyCSS: !appModeStaging,
                minifyJS: !appModeStaging,
            },
        },
        optimization: {
            minimize:   !appModeStaging
        },
        productionTip: !appModeStaging,
        transpile: [
            /content\/blog/,
            /static\/blog/,
            /vuetify-datetime-picker/,
            /templates\/nuxt-content/,
            /nuxt-content-highlight/,
            /@nuxt\/content/,
        ],
        extend (config)
        {
            if (!config.node) config.node = {};
            config.node.fs = 'empty';

            config.module.rules.push({
                test: /\.md$/,
                loader: 'frontmatter-markdown-loader',
                include: [
                    path.resolve(__dirname, 'content/blog'),
                    path.resolve(__dirname, 'static/blog'),
                ],
                options: {
                    mode: [FMMode.VUE_COMPONENT, FMMode.HTML],
                    vue: {
                        root: 'markdown-body'
                    },
                    markdownIt: md,
                }
            });
            config.module.rules.push({
                test: /\.wasm(|\.js)$/,
                loaders: ['wasm-loader'],
            });
        }
    }
};

function getDynamicMarkdownPaths(urlFilepathTable)
{
    const glob = require('glob');
    return [].concat(
        ...Object.keys(urlFilepathTable).map(url =>
        {
            var filepathGlob = urlFilepathTable[url];
            return glob
                .sync(filepathGlob, { cwd: 'content/blog' })
                .map(filepath => `${url}/${path.basename(filepath, '.md')}`);
        })
    );
}

function getMarkdownFrontmatter(fileList)
{
    let frontmatter = [];
    const fs = require('fs');
    const fm = require('front-matter');

    fileList.forEach(file =>
    {
        const data = fs.readFileSync(`./content${file}.md`, 'utf8');
        var content = fm(data);
        if (content && content.attributes)
        {
            frontmatter.push(content.attributes);
        }
    });
    return frontmatter;
}

function getMarkdownGistIds(frontmatterList)
{
    let gistIds = [];
    frontmatterList.forEach(fm =>
    {
        if (fm.extraComponentParams &&
            fm.extraComponentParams.gistId)
        {
            if (gistIds.indexOf(fm.extraComponentParams.gistId) == -1)
            {
                gistIds.push(fm.extraComponentParams.gistId);
            }
        }
    });
    return gistIds;
}

function getMarkdownTags(frontmatterList)
{
    let tags = [];
    frontmatterList.forEach(fm =>
    {
        if (fm.tags)
        {
            fm.tags.forEach(tag =>
            {
                if (tags.indexOf(tag) == -1)
                {
                    tags.push(tag);
                }
            });
        }
    });
    return tags;
}

