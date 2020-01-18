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
    showCookieConsent: true,
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
            iconName: 'mdi-github-circle',
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
    socialLoginProviders: {
        facebook: {
            id: 'facebook',
            enabled: false,
            dark: true,
            color: '#3b5999',
            icon: 'mdi-facebook',
            title: 'Фејсбук',
            shortDesc: 'Пријављивање преко Фејсбука',
        },
        google: {
            id: 'google',
            enabled: true,
            dark: true,
            color: '#dd4b39',
            icon: 'mdi-google',
            title: 'Гугл',
            shortDesc: 'Пријављивање преко Гугла',
        },
        github: {
            id: 'github',
            enabled: false,
            dark: true,
            color: '#171515',
            icon: 'mdi-github-circle',
            title: 'GitHub',
            shortDesc: 'Пријављивање преко GitHub-а',
        },
        linkedin: {
            id: 'linkedin',
            enabled: false,
            dark: true,
            color: '#0077B5',
            icon: 'mdi-linkedin',
            title: 'LinkedIn',
            shortDesc: 'Пријављивање преко LinkedIn-а',
        },
        /*reddit: {
                    id: 'reddit',
                    enabled: false,
                    dark: true,
                    color: '#ff5700',
                    icon: 'mdi-reddit',
                    title: 'Редит',
                    shortDesc: 'Пријављивање преко Редита',
                },*/
        twitter: {
            id: 'twitter',
            enabled: false,
            dark: false,
            color: '#55acee',
            icon: 'mdi-twitter',
            title: 'Твитер',
            shortDesc: 'Пријављивање преко Твитера',
        },
        whatsapp: {
            id: 'whatsapp',
            enabled: false,
            dark: false,
            color: '#25D366',
            icon: 'mdi-whatsapp',
            title: 'WhatsApp',
            shortDesc: 'Пријављивање преко WhatsApp-а',
        },
    },
});

export const getters = {
    pageById: state => pageId =>
        state.list.find(page => page.id == pageId),
    pageByRouteName: state => routeName => state.list.find(page => page.url.routeName == routeName),
    navigationPages: (state, getters, rootState, rootGetters) => state.list.filter(
        page => page.includedInNavigation &&
            (!page.protected ||
                (page.protected && rootState.auth.loggedIn &&
                    !page.admin ||
                        (page.admin && getProp('rootState.auth.user.email')
                            && rootGetters['users/isAdmin'](getProp('rootState.auth.user.email')))
                )
            ),
    ),
    mainToolbarPages: state => state.list.filter(
        page => page.includedInMainToolbar),
    showCookieConsent: state => state.showCookieConsent,
    socialLoginProviders: state => state.socialLoginProviders,
};

export const mutations = {
    setShowCookieConsent(state, payload)
    {
        state.showCookieConsent = payload;
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
        });
        commit('setShowCookieConsent', !payload);
    },
    setCurrentPageFromRouteName({ commit, getters }, payload)
    {
        const page = getters['pageByRouteName'](payload);
        if (page)
        {
            commit('setPageId', { newId: page.id });
        }
    }
};

