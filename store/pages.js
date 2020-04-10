var getProp = require('dotprop');

export const state = () => ({
    routeIds: {
        PAGE_NOTSET: 'home',
        PAGE_NOINDEX: 'home',
        PAGE_HOME: 'home',
        PAGE_PROFILE: 'profile',
        PAGE_PORTFOLIO: 'portfolio',
        PAGE_LINKS: 'links',
        PAGE_BLOG_INDEX: 'blog-index',
        PAGE_BLOG_POST: 'blog-post',
        PAGE_BLOG_TAG_INDEX: 'blog-tag-index',
        PAGE_SEARCH_INDEX: 'search-index',
        PAGE_USERS: 'users',
    },
    themeNames: {
        DARK_THEME_NAME: 'dark',
        LIGHT_THEME_NAME: 'light',
    },
    theme: 'light',
    showCookieConsent: true,
    sourceBranch: 'wip-2020-04',
    list: [
        {
            id: 'home',
            title: 'Почетна',
            text: '',
            colorClass: 'md-primary',
            theme: '',
            icon: 'mdi-home',
            image: 'https://strahinja.org/img/preview-home-strahinja-org.png',
            imageAlt: 'Стилизовани иницијали СР са текстом //strahinja.org',
            url: {
                path: '/',
                routeName: 'index',
            },
            parentUrl: '/',
            parentName: 'почетну',
            includedInNavigation: false,
            includedInMainToolbar: false,
            protected: false,
            admin: false,
            sourceURL: 'https://github.com/Strahinja/strahinja-org/blob/{0}/pages/index.vue',
        },
        {
            id: 'profile',
            title: 'Профил',
            text: 'Сажетак онога чим сам се до сада бавио',
            colorClass: 'light-green lighten-3',
            theme: 'green-card',
            icon: 'mdi-clipboard-account',
            image: 'https://strahinja.org/img/preview-profile-strahinja-org.png',
            imageAlt: 'Стилизована ознака профила са умањеним логом са'
                + ' иницијалима СР и текстом //strahinja.org',
            url: {
                path: '/profil',
                routeName: 'profil',
            },
            parentUrl: '/',
            parentName: 'почетну',
            includedInNavigation: true,
            includedInMainToolbar: true,
            protected: false,
            admin: false,
            sourceURL: 'https://github.com/Strahinja/strahinja-org/blob/{0}/pages/profile/index.vue',
        },
        {
            id: 'portfolio',
            title: 'Портфолио',
            text: 'Колекција мојих радова',
            colorClass: 'orange lighten-3',
            theme: '',
            icon: 'mdi-palette',
            image: 'https://strahinja.org/img/preview-portfolio-strahinja-org.png',
            imageAlt: 'Стилизована ознака сликарске палете са умањеним логом са'
                + ' иницијалима СР и текстом //strahinja.org',
            url: {
                path: '/portfolio',
                routeName: 'portfolio',
            },
            parentUrl: '/',
            parentName: 'почетну',
            includedInNavigation: true,
            includedInMainToolbar: true,
            protected: false,
            admin: false,
            sourceURL: 'https://github.com/Strahinja/strahinja-org/blob/{0}/pages/portfolio/index.vue',
        },
        {
            id: 'portfolio-edit',
            title: 'Уреди портфолио',
            colorClass: '',
            theme: '',
            icon: 'mdi-pencil-box-multiple',
            image: 'https://strahinja.org/img/preview-portfolio-strahinja-org.png',
            imageAlt: 'Стилизована ознака сликарске палете са умањеним логом са'
                + ' иницијалима СР и текстом //strahinja.org',
            url: {
                path: '/portfolio/edit',
                routeName: 'portfolio-edit',
            },
            parentUrl: '/',
            parentName: 'почетну',
            includedInNavigation: true,
            includedInMainToolbar: false,
            protected: true,
            admin: true,
        },
        {
            id: 'links',
            title: 'Везе',
            text: 'Мени интересантни сајтови',
            colorClass: 'light-blue lighten-4',
            theme: '',
            icon: 'mdi-bookmark-multiple',
            image: 'https://strahinja.org/img/preview-links-strahinja-org.png',
            imageAlt: 'Стилизована ознака обележивача са умањеним логом са'
                + ' иницијалима СР и текстом //strahinja.org',
            url: {
                path: '/veze',
                routeName: 'veze',
            },
            parentUrl: '/',
            parentName: 'почетну',
            includedInNavigation: true,
            includedInMainToolbar: false,
            protected: false,
            admin: false,
            sourceURL: 'https://github.com/Strahinja/strahinja-org/blob/{0}/pages/veze/index.vue',
        },
        {
            id: 'blog-index',
            title: 'Блог',
            text: 'Мој веб дневник',
            colorClass: '',
            theme: '',
            icon: 'mdi-fountain-pen-tip',
            image: 'https://strahinja.org/img/preview-blog-strahinja-org.png',
            imageAlt: 'Цртеж врха пенкала са умањеним логом са иницијалима'
                + ' СР и текстом //strahinja.org',
            url: {
                path: '/blog',
                routeName: 'blog',
            },
            parentUrl: '/',
            parentName: 'почетну',
            includedInNavigation: true,
            includedInMainToolbar: true,
            protected: false,
            admin: false,
            sourceURL: 'https://github.com/Strahinja/strahinja-org/blob/{0}/pages/blog/index.vue',
        },
        {
            id: 'blog-post',
            title: 'Чланак блога',
            text: 'Страница чланка блога',
            colorClass: '',
            theme: '',
            icon: 'mdi-fountain-pen-tip',
            image: 'https://strahinja.org/img/preview-blog-strahinja-org.png',
            imageAlt: 'Цртеж врха пенкала са умањеним логом са иницијалима'
                + ' СР и текстом //strahinja.org',
            url: {
                path: '/blog',
                routeName: 'blog-slug',
            },
            parentUrl: '/blog',
            parentName: 'списак чланака',
            includedInNavigation: false,
            includedInMainToolbar: false,
            protected: false,
            admin: false,
            sourceURL: 'https://github.com/Strahinja/strahinja-org/blob/{0}/pages/blog/_slug.vue',
        },
        {
            id: 'blog-tag-index',
            title: 'Чланци са ознаком',
            text: 'Чланци са задатом ознаком',
            colorClass: '',
            theme: '',
            icon: 'mdi-fountain-pen-tip',
            image: 'https://strahinja.org/img/preview-blog-strahinja-org.png',
            imageAlt: 'Цртеж врха пенкала са умањеним логом са иницијалима'
                + ' СР и текстом //strahinja.org',
            url: {
                path: '/blog/tag',
                routeName: 'blog-tag-id',
            },
            parentUrl: '/blog',
            parentName: 'списак чланака',
            includedInNavigation: false,
            includedInMainToolbar: false,
            protected: false,
            admin: false,
            sourceURL: 'https://github.com/Strahinja/strahinja-org/blob/{0}/pages/blog/tag/index.vue',
        },
        {
            id: 'search-index',
            title: 'Претрага',
            text: 'Резултати претраге са задатим текстом',
            colorClass: '',
            theme: '',
            icon: 'mdi-fountain-pen-tip',
            image: 'https://strahinja.org/img/preview-search-strahinja-org.png',
            imageAlt: 'Цртеж лупе са умањеним логом са иницијалима'
                + ' СР и текстом //strahinja.org',
            url: {
                path: '/search',
                routeName: 'search',
            },
            parentUrl: '/',
            parentName: 'почетну',
            includedInNavigation: false,
            includedInMainToolbar: false,
            protected: false,
            admin: false,
            sourceURL: 'https://github.com/Strahinja/strahinja-org/blob/{0}/pages/search/index.vue',
        },
        {
            id: 'users',
            title: 'Корисници',
            text: 'Списак корисника',
            colorClass: '',
            theme: '',
            icon: 'mdi-account-multiple',
            image: 'https://strahinja.org/img/preview-users-strahinja-org.png',
            imageAlt: 'Симбол више корисника са умањеним логом са иницијалима'
                + ' СР и текстом //strahinja.org',
            url: {
                path: '/users',
                routeName: 'users',
            },
            parentUrl: '/',
            parentName: 'почетну',
            includedInNavigation: true,
            includedInMainToolbar: false,
            protected: true,
            admin: true,
            sourceURL: 'https://github.com/Strahinja/strahinja-org/blob/{0}/pages/users/index.vue',
        },
        {
            id: 'users-me-index',
            title: 'Кориснички профил',
            text: 'Профил корисника улогованог преко друштвене мреже',
            colorClass: '',
            theme: '',
            icon: 'mdi-account',
            image: 'https://strahinja.org/img/preview-users-strahinja-org.png',
            imageAlt: 'Симбол корисника са умањеним логом са иницијалима'
                + ' СР и текстом //strahinja.org',
            url: {
                path: '/users/me',
                routeName: 'users-me',
            },
            parentUrl: '/',
            parentName: 'почетну',
            includedInNavigation: true,
            includedInMainToolbar: false,
            protected: true,
            admin: false,
            sourceURL: 'https://github.com/Strahinja/strahinja-org/blob/{0}/pages/users/me/index.vue',
        },
    ],
    pageId: 'home',
    footerLinks: [
        {
            url: {
                path: 'https://linkedin.com/in/strahinja-radic'
            },
            iconType: 'v-icon',
            iconName: 'mdi-linkedin',
            text: 'LinkedIn'
        },
        {
            url: { path: 'https://github.com/Strahinja' },
            iconType: 'v-icon',
            iconName: 'mdi-github',
            text: 'GitHub'
        },
        {
            url: { path: 'https://codepen.io/Strahinja/' },
            iconType: 'v-icon',
            iconName: 'mdi-codepen',
            text: 'CodePen'
        },
        {
            url: {
                path: 'https://jsfiddle.net/user/strahinja_radic/fiddles/'
            },
            iconType: 'v-icon',
            iconName: 'mdi-jsfiddle',
            text: 'JSFiddle'
        },
        {
            url: { path: 'https://twitter.com/strahinja_radic' },
            iconType: 'v-icon',
            iconName: 'mdi-twitter',
            text: 'Twitter'
        },
        {
            url: {
                path: 'https://www.facebook.com/strahinja.radic.prog'
            },
            iconType: 'v-icon',
            iconName: 'mdi-facebook',
            text: 'Facebook'
        }
    ],
});

export const getters = {
    pageId: state => state.pageId,
    pageById: state => pageId =>
        state.list.find(page => page.id == pageId),
    pageByRouteName: state => routeName => state.list.find(page => page.url.routeName == routeName),
    // eslint-disable-next-line no-unused-vars
    navigationPages: (state, getters, rootState, rootGetters) => state.list.filter(
        page => page.includedInNavigation &&
            (!page.protected ||
                (page.protected && rootGetters['local-auth/loggedIn'] &&
                    !page.admin ||
                        (page.admin && rootGetters['local-auth/user'].is_admin)
                )
            )
    ),
    isPageAdminById: (state, getters) => pageId =>
        getters['pageById'](pageId).admin,
    isPageProtectedById: (state, getters) => pageId =>
        getters['pageById'](pageId).protected,
    sourceURL: state =>
    {
        let sourceUrl = state.list.find(page => page.id == state.pageId).sourceURL;
        return sourceUrl ? sourceUrl.replace('{0}', state.sourceBranch) : null;
    },
    mainToolbarPages: state => state.list.filter(
        page => page.includedInMainToolbar),
    showCookieConsent: state => state.showCookieConsent,
    theme: state => state.theme,
    isThemeDark: state => state.theme == state.themeNames.DARK_THEME_NAME,
    DARK_THEME_NAME: state => state.themeNames.DARK_THEME_NAME,
    LIGHT_THEME_NAME: state => state.themeNames.LIGHT_THEME_NAME,
};

export const mutations = {
    setShowCookieConsent(state, payload)
    {
        state.showCookieConsent = payload;
    },
    setTheme(state, payload)
    {
        state.theme = payload;
    },
    setPageId(state, payload)
    {
        state.pageId = payload.newId;
    },
};

export const actions = {
    setCookieConsent({ commit }, payload)
    {
        this.$cookies.set('strahinja-org-cookie-consent', payload ? '1' : '0', {
            maxAge: 15 * 365 * 24 * 60 * 60,
            path: '/',
            sameSite: 'Strict',
        });
        commit('setShowCookieConsent', !payload);
    },
    setTheme({ commit, getters }, payload)
    {
        if (payload && payload.theme == getters['DARK_THEME_NAME']
            && payload.vuetify)
        {
            payload.vuetify.theme.dark = true;
        }
        else if (payload && payload.vuetify)
        {
            payload.vuetify.theme.dark = false;
        }
        this.$cookies.set('strahinja-org-theme', payload.theme, {
            maxAge: 15 * 365 * 24 * 60 * 60,
            path: '/',
            sameSite: 'Strict',
        });
        commit('setTheme', payload.theme);
    },
    cycleTheme({ dispatch, getters }, payload)
    {
        if (getters['theme'] == getters['DARK_THEME_NAME'])
        {
            dispatch('setTheme', {
                vuetify: payload.vuetify,
                theme: getters['LIGHT_THEME_NAME']
            });
        }
        else
        {
            dispatch('setTheme', {
                vuetify: payload.vuetify,
                theme: getters['DARK_THEME_NAME']
            });
        }
    },
    setCurrentPageFromRouteName({ commit, getters }, payload)
    {
        const page = getters['pageByRouteName'](payload);
        if (page)
        {
            commit('setPageId', { newId: page.id });
        }
    },
};

