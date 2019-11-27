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
import markdownItTocDoneRight from 'markdown-it-toc-done-right';

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
            { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' }
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
        mode: '',
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
        '~/plugins/jsonld.js'
    ],
    /*
     ** Router configuration
     */
    /*router: {
        extendRoutes (routes, resolve)
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
        }
    },*/
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
        '@nuxtjs/vuetify'
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        '@nuxt/http',
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
            '/noindex',
            '/search'
        ],
        routes: dynamicMarkdownRoutes
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
                    //mode: [FMMode.VUE_COMPONENT, FMMode.HTML],
                    mode: [FMMode.VUE_COMPONENT, FMMode.VUE_RENDER_FUNCTIONS, FMMode.HTML],
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
                        .use(markdownItPrism)
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

