//import colors from 'vuetify/es5/util/colors';
import light from './theme/dunedain-light';
import dark from './theme/dunedain-dark';
import FMMode from 'frontmatter-markdown-loader/mode';
import path from 'path';
import markdownIt from 'markdown-it';
import markdownItAbbr from 'markdown-it-abbr';
import markdownItAnchor from 'markdown-it-anchor';
import markdownItAttribution from 'markdown-it-attribution';
import markdownItEmoji from 'markdown-it-emoji';
import markdownItFootnote from 'markdown-it-footnote';
import markdownItGithubHeadings from 'markdown-it-github-headings';
import markdownItKatex from 'markdown-it-katex';
import markdownItKbd from 'markdown-it-kbd';
import markdownItPrism from 'markdown-it-prism';
import markdownItSamp from 'markdown-it-samp';
import markdownItMdi from 'markdown-it-mdi';
import markdownItTocDoneRight from 'markdown-it-toc-done-right';
import authConfig from './auth.config.js';

require('dotenv').config({ path: '.env.production' });
console.log('dotenv: mode = ', process.env.VUE_APP_MODE);
console.log('dotenv: path = ', process.env.VUE_APP_API_PATH);
console.log('dotenv: browser path = ', process.env.VUE_APP_BROWSER_API_PATH);

const fs = require('fs');
var dynamicMarkdownRoutes = getDynamicMarkdownPaths({
    '/blog': '*.md'
});
var blogFrontmatter = getMarkdownFrontmatter(dynamicMarkdownRoutes);
var blogTags = getMarkdownTags(blogFrontmatter);
var blogGistIds = getMarkdownGistIds(blogFrontmatter);
console.log('nuxt.config.js: blogTags = ', blogTags);
console.log('nuxt.config.js: blogGistIds = ', blogGistIds);
fs.writeFileSync('static/blog/blog-frontmatter.json', JSON.stringify(blogFrontmatter));
fs.writeFileSync('static/blog/blog-tags.json', JSON.stringify(blogTags));
fs.writeFileSync('static/blog/blog-gist-ids.json', JSON.stringify(blogGistIds));

dynamicMarkdownRoutes = dynamicMarkdownRoutes.concat(blogTags.map(tag =>
{
    return `/blog/tag/${tag}`;
}));
console.log('nuxt.config.js: dynamicMarkdownRoutes = ', dynamicMarkdownRoutes);

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
        //mode: '',
    },
    /*
     ** Global CSS
     */
    css: [
    ],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        '~/plugins/breakpoint.js',
        '~/plugins/jsonld.js',
        '~/plugins/cookie-disclaimer.js',
        //{ src: '~/plugins/auth.js', mode: 'client' },
    ],
    /*
     ** Router configuration
     */
    router: {
        //middleware: ['auth'],
        /*extendRoutes (routes, resolve)
        {
            routes.push({
                name: 'tag',
                path: '/blog/tag/:id',
                component: resolve(__dirname, 'pages/blog/tag/_id.vue')
            });

            routes.push({
                path: '*',
                redirect: '/error/404'
            });
        }*/
    },
    auth: {
        cookie: {
            options: {
                expires: 7, // days
                secure: true,
            },
        },
        localStorage: false,
        plugins: [ { src: '~/plugins/auth.js', mode: 'client' } ],
        strategies: {
            local: false,
            google: {
                client_id: authConfig.google.client_id,
                redirect_uri: authConfig.google.redirect_uri,
            },
            facebook: {
                client_id: authConfig.facebook.client_id,
                redirect_uri: authConfig.facebook.redirect_uri,
                userinfo_endpoint: authConfig.facebook.userinfo_endpoint,
            },
            github: {
                client_id: authConfig.github.client_id,
                client_secret: authConfig.github.client_secret,
                redirect_uri: authConfig.github.redirect_uri,
                response_type: 'code',
            },
        },
        redirect: {
            login: '/login',
            logout: '/',
            callback: '/login',
        }
    },
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
        //'@nuxt/http',
        '@nuxtjs/axios',
        '@nuxtjs/auth',
        ['@nuxtjs/toast', {
            iconPack: 'custom-class',
            duration: 7000,
        }],
        '@nuxtjs/svg',
        //'nuxt-purgecss',
        'nuxt-webfontloader',
        'nuxt-compress',
        'cookie-universal-nuxt',
        '@nuxtjs/sitemap' // Must be last
    ],
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
        exclude: [
            '/noindex',
            '/search',
            '/users',
            '/users/me',
        ],
        routes: dynamicMarkdownRoutes
    },
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {
        baseURL: process.env.VUE_APP_API_PATH,
        browserBaseURL: process.env.VUE_APP_BROWSER_API_PATH,
        proxyHeaders: false,
        credentials: false
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
    /*
     ** Generate configuration
     */
    generate: {
        fallback: true,
        routes: [
            '/',
            '/profil',
            '/portfolio',
            '/veze',
            '/blog'
        ].concat(dynamicMarkdownRoutes)
    },
    vue: {
        config: {
            devtools: true,
        }
    },
    /*
     ** Build configuration
     */
    build: {
    /*
     ** You can extend webpack config here
     */
        //extractCSS: true,
        productionTip: false,
        transpile: [
            /static\/blog/
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
                    markdownIt: markdownIt({html: true})
                        .use(markdownItAbbr)
                        .use(markdownItAnchor)
                        .use(markdownItAttribution)
                        .use(markdownItEmoji)
                        .use(markdownItFootnote)
                        .use(markdownItGithubHeadings, {
                            className: 'github-heading',
                            prefixHeadingIds: true,
                            prefix: 'head-',
                            enableHeadingLinkIcons: true,
                        })
                        .use(markdownItKatex)
                        .use(markdownItKbd)
                        .use(markdownItMdi)
                        .use(markdownItPrism)
                        .use(markdownItSamp)
                        .use(markdownItTocDoneRight)
                }
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

