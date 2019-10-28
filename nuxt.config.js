//import colors from 'vuetify/es5/util/colors';
import light from './theme/dunedain-light';
import dark from './theme/dunedain-dark';
import FMMode from 'frontmatter-markdown-loader/mode';
import path from 'path';
import markdownIt from 'markdown-it';
import markdownItAbbr from 'markdown-it-abbr';
import markdownItAnchor from 'markdown-it-anchor';
import markdownItAttribution from 'markdown-it-attribution';
import markdownItFootnote from 'markdown-it-footnote';
import markdownItKatex from 'markdown-it-katex';
import markdownItKbd from 'markdown-it-kbd';
import markdownItPrism from 'markdown-it-prism';
import markdownItTocDoneRight from 'markdown-it-toc-done-right';

var dynamicRoutes = getDynamicPaths({
    '/blog': '*.md'
});
console.log('nuxt.config.js: dynamicRoutes = ', dynamicRoutes);

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
            { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#2e7d32' },
    /*
     ** Global CSS
     */
    css: [
    ],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        '~/plugins/breakpoint.js'
    ],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
        //'@nuxtjs/eslint-module',
        '@nuxtjs/vuetify'
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
    // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        ['@nuxtjs/dotenv', {
            filename: '.env.production'
        } ],
        '@nuxtjs/svg',
        '@nuxtjs/sitemap' // Must be last
    ],
    /*
     ** Sitemap configuration
     */
    sitemap: {
        hostname: 'http://strahinja.org',
        exclude: [
            '/noindex'
        ],
        routes: dynamicRoutes
    },
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {
    },
    /*
     ** vuetify module configuration
     ** https://github.com/nuxt-community/vuetify-module
     */
    vuetify: {
        customVariables: ['~assets/variables.scss'],
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
    /*
     ** You can extend webpack config here
     */
        fallback: '/error/404',
        routes: [
            '/error/200',
            '/error/401',
            '/error/404',
            '/blog',
        ].concat(dynamicRoutes)
    },
    /*
     ** Build configuration
     */
    build: {
    /*
     ** You can extend webpack config here
     */
        transpile: [
            /static\/blog/
        ],
        //eslint-disable-next-line no-unused-vars
        extend (config, ctx)
        {
            if (!config.node) config.node = {};
            config.node.fs = 'empty';

            config.module.rules.push({
                test: /\.md$/,
                loader: 'frontmatter-markdown-loader',
                include: path.resolve(__dirname, 'static/blog'),
                options: {
                    mode: [FMMode.VUE_RENDER_FUNCTIONS],
                    vue: {
                        root: 'markdown-body'
                    },
                    markdownIt: markdownIt({html: true})
                        .use(markdownItAbbr)
                        .use(markdownItAnchor)
                        .use(markdownItAttribution)
                        .use(markdownItFootnote)
                        .use(markdownItKatex)
                        .use(markdownItKbd)
                        .use(markdownItPrism)
                        .use(markdownItTocDoneRight)
                }
            });
        }
    }
};

function getDynamicPaths(urlFilepathTable)
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

