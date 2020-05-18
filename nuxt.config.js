//import colors from 'vuetify/es5/util/colors';
import light from './theme/dunedain-light';
import dark from './theme/dunedain-dark';
import FMMode from 'frontmatter-markdown-loader/mode';
import path from 'path';
import { md } from './markdown-it';
//import authConfig from './auth.config.js';

// Staging (true) or production (false)?
var appModeStaging = true;

require('dotenv').config({ path: `.env.${appModeStaging?'staging':'production'}` });
console.log('dotenv: mode = ', process.env.VUE_APP_MODE);
console.log('dotenv: path = ', process.env.VUE_APP_API_PATH);
console.log('dotenv: browser path = ', process.env.VUE_APP_BROWSER_API_PATH);

//console.log('authConfig:');
//console.dir(authConfig);

const fs = require('fs');
var dynamicMarkdownRoutes = getDynamicMarkdownPaths({
    '/blog': '*.md'
});
var blogFrontmatter = getMarkdownFrontmatter(dynamicMarkdownRoutes);
var blogTags = getMarkdownTags(blogFrontmatter);
var blogGistIds = getMarkdownGistIds(blogFrontmatter);
console.log('nuxt.config.js: blogTags = ', JSON.stringify(blogTags));
console.log('nuxt.config.js: blogGistIds = ', JSON.stringify(blogGistIds));
fs.writeFileSync('static/blog/blog-frontmatter.json', JSON.stringify(blogFrontmatter));
fs.writeFileSync('static/blog/blog-tags.json', JSON.stringify(blogTags));
fs.writeFileSync('static/blog/blog-gist-ids.json', JSON.stringify(blogGistIds));

var lastmod = (new Date()).toISOString();

dynamicMarkdownRoutes = dynamicMarkdownRoutes.concat(blogTags.map(tag =>
{
    return `/blog/tag/${tag}`;
}));

//dynamicMarkdownRoutes = ['/blog'].concat(dynamicMarkdownRoutes);
console.log('nuxt.config.js: dynamicMarkdownRoutes = ', JSON.stringify(dynamicMarkdownRoutes));

var sitemapGeneralExclusion = [
    '/noindex',
    '/search',
    '/login',
    '/login/callback',
    '/users',
    '/users/me',
    '/portfolio/edit',
];

var sitemapConfig = {
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
    loading: '~/components/loading.vue',
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
    /*auth: {
        cookie: {
            options: {
                expires: 7, // days
                //secure: true,
            },
        },
        localStorage: false,
        plugins: [ { src: '~/plugins/auth.js', mode: 'client' } ],
        strategies: {
            local: false,
            google: {
                client_id: authConfig.google.client_id,
                //redirect_uri: authConfig.google.redirect_uri,
            },
            facebook: {
                client_id: authConfig.facebook.client_id,
                scope: authConfig.facebook.scope,
                userinfo_endpoint: authConfig.facebook.userinfo_endpoint,
                /*redirect_uri: authConfig.facebook.redirect_uri,* /
            },
            github: {
                client_id: authConfig.github.client_id,
                client_secret: authConfig.github.client_secret,
            },
            twitter: {
                client_id: authConfig.twitter.client_id,
                client_secret: authConfig.twitter.client_secret,
            },
        },
        redirect: {
            login: '/login',
            logout: '/',
            callback: '/login/callback',
        }
    },*/
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
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
        '@nuxtjs/auth',
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
     *markdownit: {
     *    preset: 'default',
     *    html: true,
     *    linkify: true,
     *    breaks: false,
     *    use: [
     *        'markdown-it-abbr',
     *        'markdown-it-anchor',
     *        'markdown-it-attribution',
     *        'markdown-it-emoji',
     *        'markdown-it-footnote',
     *        //{ 'markdown-it-github-headings', {
     *            //className: 'github-heading',
     *            //prefixHeadingIds: true,
     *            //prefix: 'head-',
     *            //enableHeadingLinkIcons: true,
     *        //}},
     *        'markdown-it-katex',
     *        'markdown-it-kbd',
     *        'markdown-it-mdi',
     *        'markdown-it-prism',
     *        'markdown-it-samp',
     *        'markdown-it-toc-done-right',
     *    ],
     *},
     */
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
        baseURL: process.env.VUE_APP_API_PATH,
        browserBaseURL: process.env.VUE_APP_BROWSER_API_PATH,
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
        fallback: true,
        //interval: 2000,
        routes: [
            '/',
            '/profil',
            '/portfolio',
            '/veze',
            '/blog',
            '/tekstovi'
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
        devtools: true,
        extractCSS: true,
        productionTip: false,
        transpile: [
            /static\/blog/,
            /vuetify-datetime-picker/
        ],
        extend (config)
        {
            if (!config.node) config.node = {};
            config.node.fs = 'empty';

            config.module.rules.push({
                test: /\.md$/,
                loader: 'frontmatter-markdown-loader',
                include: path.resolve(__dirname, 'static/blog'),
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
                .sync(filepathGlob, { cwd: 'static/blog' })
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
        const data = fs.readFileSync(`./static${file}.md`, 'utf8');
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

