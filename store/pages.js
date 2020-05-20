const iconSvgs = {
    ICON_SVG_NONE         : 0,
    ICON_SVG_STRAHINJAORG : 1,
    ICON_SVG_GNU          : 2,
};
const routeIds = {
    PAGE_NOTSET                   : 'home',
    PAGE_NOINDEX                  : 'home',
    PAGE_HOME                     : 'home',
    PAGE_PROFILE                  : 'profile',
    PAGE_PORTFOLIO                : 'portfolio',
    PAGE_PORTFOLIO_EDIT           : 'portfolio-edit',
    PAGE_LINKS                    : 'links',
    PAGE_BLOG_INDEX               : 'blog-index',
    PAGE_BLOG_POST                : 'blog-post',
    PAGE_BLOG_TAG_INDEX           : 'blog-tag-index',
    PAGE_SEARCH_INDEX             : 'search-index',
    PAGE_USERS                    : 'users',
    PAGE_USERS_ME                 : 'users-me-index',
    PAGE_TEXTS_INDEX              : 'tekstovi-index',
    PAGE_TEXTS_MATH_INDEX         : 'tekstovi-matematika-index',
    PAGE_TEXTS_MATH_BRELRED       : 'tekstovi-matematika-brelred',
    PAGE_TEXTS_MATH_DZN           : 'tekstovi-matematika-dzn',
    PAGE_TEXTS_MATH_KOORD         : 'tekstovi-matematika-koord',
    PAGE_TEXTS_SOFTWARE_INDEX     : 'tekstovi-softver-index',
    PAGE_TEXTS_SOFTWARE_EMAKS_CIR : 'tekstovi-softver-emaks-cir',
    PAGE_TEXTS_SOFTWARE_GNU_SZI   : 'tekstovi-softver-gnu-szi',
    PAGE_TEXTS_SOFTWARE_OJL       : 'tekstovi-softver-ojl',
    PAGE_PROGRAMS_INDEX           : 'programi-index',

};
const themeNames = {
    DARK_THEME_NAME: 'dark',
    LIGHT_THEME_NAME: 'light',
};

export const state = () => ({
    iconSvgs,
    routeIds,
    themeNames,
    theme: themeNames.LIGHT_THEME_NAME,
    showCookieConsent: true,
    sourceBranch: 'master',
    list: [
        {
            id: routeIds.PAGE_HOME,
            title: 'Почетна',
            text: '',
            colorClass: 'md-primary',
            theme: '',
            icon: 'mdi-home',
            iconSvg: iconSvgs.ICON_SVG_STRAHINJAORG,
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
            id: routeIds.PAGE_PROFILE,
            title: 'Профил',
            text: 'Сажетак онога чим сам се до сада бавио',
            colorClass: 'light-green lighten-3',
            theme: 'green-card',
            icon: 'mdi-clipboard-account',
            iconSvg: iconSvgs.ICON_SVG_NONE,
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
            id: routeIds.PAGE_PORTFOLIO,
            title: 'Портфолио',
            text: 'Колекција мојих радова',
            colorClass: 'orange lighten-3',
            theme: '',
            icon: 'mdi-palette',
            iconSvg: iconSvgs.ICON_SVG_NONE,
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
            id: routeIds.PAGE_PORTFOLIO_EDIT,
            title: 'Уреди портфолио',
            colorClass: '',
            theme: '',
            icon: 'mdi-pencil-box-multiple',
            iconSvg: iconSvgs.ICON_SVG_NONE,
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
            id: routeIds.PAGE_BLOG_INDEX,
            title: 'Блог',
            text: 'Мој веб дневник',
            colorClass: '',
            theme: '',
            icon: 'mdi-fountain-pen-tip',
            iconSvg: iconSvgs.ICON_SVG_NONE,
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
            id: routeIds.PAGE_BLOG_POST,
            title: 'Чланак блога',
            text: 'Страница чланка блога',
            colorClass: '',
            theme: '',
            icon: 'mdi-fountain-pen-tip',
            iconSvg: iconSvgs.ICON_SVG_NONE,
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
            id: routeIds.PAGE_BLOG_TAG_INDEX,
            title: 'Чланци са ознаком',
            text: 'Чланци са задатом ознаком',
            colorClass: '',
            theme: '',
            icon: 'mdi-fountain-pen-tip',
            iconSvg: iconSvgs.ICON_SVG_NONE,
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
            id: routeIds.PAGE_SEARCH_INDEX,
            title: 'Претрага',
            text: 'Резултати претраге са задатим текстом',
            colorClass: '',
            theme: '',
            icon: 'mdi-fountain-pen-tip',
            iconSvg: iconSvgs.ICON_SVG_NONE,
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
            id: routeIds.PAGE_USERS,
            title: 'Корисници',
            text: 'Списак корисника',
            colorClass: '',
            theme: '',
            icon: 'mdi-account-multiple',
            iconSvg: iconSvgs.ICON_SVG_NONE,
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
            id: routeIds.PAGE_USERS_ME,
            title: 'Кориснички профил',
            text: 'Профил корисника улогованог преко друштвене мреже',
            colorClass: '',
            theme: '',
            icon: 'mdi-account',
            iconSvg: iconSvgs.ICON_SVG_NONE,
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
        {
            id: routeIds.PAGE_TEXTS_INDEX,
            title: 'Текстови',
            text: 'Списак текстова',
            colorClass: '',
            theme: '',
            icon: 'mdi-text-box-multiple',
            iconSvg: iconSvgs.ICON_SVG_NONE,
            image: '',
            imageAlt: '',
            url: {
                path: '/tekstovi',
                routeName: 'tekstovi',
            },
            parentUrl: '/',
            parentName: 'почетну',
            includedInNavigation: true,
            includedInMainToolbar: false,
            protected: false,
            admin: false,
            sourceURL: 'https://github.com/Strahinja/strahinja-org/blob/{0}/pages/tekstovi/index.vue',
        },
        {
            id: routeIds.PAGE_TEXTS_MATH_INDEX,
            title: 'Математика',
            text: 'Текстови у вези са математиком',
            colorClass: '',
            theme: '',
            icon: 'mdi-sigma',
            iconSvg: iconSvgs.ICON_SVG_NONE,
            image: '',
            imageAlt: '',
            url: {
                path: '/tekstovi/matematika',
                routeName: 'tekstovi-matematika',
            },
            parentUrl: '/tekstovi',
            parentName: 'списак текстова',
            includedInNavigation: false,
            includedInMainToolbar: false,
            protected: false,
            admin: false,
            sourceURL: 'https://github.com/Strahinja/strahinja-org/blob/{0}/pages/tekstovi/matematika/index.vue',
        },
        {
            id: routeIds.PAGE_TEXTS_MATH_BRELRED,
            title: 'Рачунање броја елемената одређеног реда у коначној Абеловој групи',
            text: 'Опште решење проблема из Алгебре 1',
            colorClass: '',
            theme: '',
            icon: 'mdi-sigma',
            iconSvg: iconSvgs.ICON_SVG_NONE,
            image: '',
            imageAlt: '',
            url: {
                path: '/tekstovi/matematika/brelred',
                routeName: 'tekstovi-matematika-brelred',
            },
            parentUrl: '/tekstovi/matematika',
            parentName: 'списак текстова о математици',
            includedInNavigation: false,
            includedInMainToolbar: false,
            protected: false,
            admin: false,
            sourceURL: 'https://github.com/Strahinja/strahinja-org/blob/{0}/pages/tekstovi/matematika/brelred.vue',
        },
        {
            id: routeIds.PAGE_TEXTS_MATH_DZN,
            title: 'Диференцијални рачун за неупућене',
            text: 'Поступан увод у диференцијални рачун са примерима',
            colorClass: '',
            theme: '',
            icon: 'mdi-sigma',
            iconSvg: iconSvgs.ICON_SVG_NONE,
            image: '',
            imageAlt: '',
            url: {
                path: '/tekstovi/matematika/dzn',
                routeName: 'tekstovi-matematika-dzn',
            },
            parentUrl: '/tekstovi/matematika',
            parentName: 'списак текстова о математици',
            includedInNavigation: false,
            includedInMainToolbar: false,
            protected: false,
            admin: false,
            sourceURL: 'https://github.com/Strahinja/strahinja-org/blob/{0}/pages/tekstovi/matematika/dzn.vue',
        },
        {
            id: routeIds.PAGE_TEXTS_MATH_KOORD,
            title: 'Матрице преласка и хомогене координате',
            text: 'Кратко расписивање матрица преласка из Нацртне геометрије',
            colorClass: '',
            theme: '',
            icon: 'mdi-sigma',
            iconSvg: iconSvgs.ICON_SVG_NONE,
            image: '',
            imageAlt: '',
            url: {
                path: '/tekstovi/matematika/koord',
                routeName: 'tekstovi-matematika-koord',
            },
            parentUrl: '/tekstovi/matematika',
            parentName: 'списак текстова о математици',
            includedInNavigation: false,
            includedInMainToolbar: false,
            protected: false,
            admin: false,
            sourceURL: 'https://github.com/Strahinja/strahinja-org/blob/{0}/pages/tekstovi/matematika/koord.vue',
        },
        {
            id: routeIds.PAGE_TEXTS_SOFTWARE_INDEX,
            title: 'Софтвер',
            text: 'Текстови у вези са софтвером',
            colorClass: '',
            theme: '',
            icon: 'mdi-console',
            iconSvg: iconSvgs.ICON_SVG_NONE,
            image: '',
            imageAlt: '',
            url: {
                path: '/tekstovi/softver',
                routeName: 'tekstovi-softver',
            },
            parentUrl: '/tekstovi',
            parentName: 'списак текстова',
            includedInNavigation: false,
            includedInMainToolbar: false,
            protected: false,
            admin: false,
            sourceURL: 'https://github.com/Strahinja/strahinja-org/blob/{0}/pages/tekstovi/softver/index.vue',
        },
        {
            id: routeIds.PAGE_TEXTS_SOFTWARE_EMAKS_CIR,
            title: 'КАКОДА подесим и користим ГНУ-ов Емакс за унос текста на српском',
            text: 'Подешавање Емакса за српски',
            colorClass: '',
            theme: '',
            icon: 'mdi-console',
            iconSvg: iconSvgs.ICON_SVG_NONE,
            image: '',
            imageAlt: '',
            url: {
                path: '/tekstovi/softver/emaks-cir',
                routeName: 'tekstovi-softver-emaks-cir',
            },
            parentUrl: '/tekstovi/softver',
            parentName: 'списак текстова о софтверу',
            includedInNavigation: false,
            includedInMainToolbar: false,
            protected: false,
            admin: false,
            sourceURL: 'https://github.com/Strahinja/strahinja-org/blob/{0}/pages/tekstovi/softver/emaks-cir.vue',
        },
        {
            id: routeIds.PAGE_TEXTS_SOFTWARE_GNU_SZI,
            title: 'КАКОДА употребљавам ГНУ-ов систем за изградњу',
            text: 'Упутство за прављење инсталационог програма у ГНУ-овом систему за изградњу',
            colorClass: '',
            theme: '',
            icon: 'mdi-console',
            iconSvg: iconSvgs.ICON_SVG_NONE,
            image: '',
            imageAlt: '',
            url: {
                path: '/tekstovi/softver/gnu-szi',
                routeName: 'tekstovi-softver-gnu-szi',
            },
            parentUrl: '/tekstovi/softver',
            parentName: 'списак текстова о софтверу',
            includedInNavigation: false,
            includedInMainToolbar: false,
            protected: false,
            admin: false,
            sourceURL: 'https://github.com/Strahinja/strahinja-org/blob/{0}/pages/tekstovi/softver/gnu-szi.vue',
        },
        {
            id: routeIds.PAGE_TEXTS_SOFTWARE_OJL,
            title: 'ГНУ-ова ОЈЛ',
            text: 'Незванични превод ГНУ-ове опште јавне лиценце на српски',
            colorClass: '',
            theme: '',
            icon: 'mdi-scale-balance',
            iconSvg: iconSvgs.ICON_SVG_NONE,
            image: '',
            imageAlt: '',
            url: {
                path: '/tekstovi/softver/ojl',
                routeName: 'tekstovi-softver-ojl',
            },
            parentUrl: '/tekstovi/softver',
            parentName: 'списак текстова о софтверу',
            includedInNavigation: true,
            includedInMainToolbar: false,
            protected: false,
            admin: false,
            sourceURL: 'https://github.com/Strahinja/strahinja-org/blob/{0}/pages/tekstovi/softver/ojl.vue',
        },
        {
            id: routeIds.PAGE_PROGRAMS_INDEX,
            title: 'Програми',
            text: 'Списак програма',
            colorClass: '',
            theme: '',
            icon: 'mdi-console',
            iconSvg: iconSvgs.ICON_SVG_NONE,
            image: '',
            imageAlt: '',
            url: {
                path: '/programi',
                routeName: 'programi',
            },
            parentUrl: '/',
            parentName: 'почетну',
            includedInNavigation: true,
            includedInMainToolbar: false,
            protected: false,
            admin: false,
            sourceURL: 'https://github.com/Strahinja/strahinja-org/blob/{0}/pages/programi/index.vue',
        },
        {
            id: routeIds.PAGE_LINKS,
            title: 'Везе',
            text: 'Мени интересантни сајтови',
            colorClass: 'light-blue lighten-4',
            theme: '',
            icon: 'mdi-bookmark-multiple',
            iconSvg: iconSvgs.ICON_SVG_NONE,
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
    subpages: state => rootPath =>
    {
        let tree = state.list.filter(page => page.url.path.startsWith(rootPath));
        return tree ? tree.filter(page =>
        {
            let match = page.url.path.substring(rootPath.length).match(/\/[a-z0-9-_]+(\/[^/]+)*/);
            return match && !match[1];
        }) : tree;
    },
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
    svgComponentName: state => svgId =>
    {
        switch (svgId)
        {
        case state.iconSvgs.ICON_SVG_GNU:
            return 'Gnu';
        case state.iconSvgs.ICON_SVG_STRAHINJAORG:
            return 'Strahinjaorg';
        default:
            return null;
        }
    },
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

