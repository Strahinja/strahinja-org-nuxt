export const state = () => ({
    routeIds: {
        PAGE_NOTSET: 0,
        PAGE_NOINDEX: 0,
        PAGE_HOME: 0,
        PAGE_PROFILE: 1,
        PAGE_PORTFOLIO: 2,
        PAGE_LINKS: 3,
        PAGE_BLOG_INDEX: 4,
        PAGE_BLOG_POST: 5,
        PAGE_BLOG_TAG_INDEX: 6,
    },
    currentPageLoading: true,
    globalMeta: {
    },
    list: [
        {
            title: 'Почетна',
            text: '',
            colorClass: 'md-primary',
            theme: '',
            icon: 'mdi-home',
            image: 'http://strahinja.org/img/preview-home-strahinja-org.png',
            url: { path: '/' },
            parentUrl: '/',
            parentName: 'почетну',
            includedInNavigation: false,
            includedInMainToolbar: false,
            imageUrl: '/static/img/pexels-photo-1179156.jpeg'
        },
        {
            title: 'Профил',
            text: 'Сажетак онога чим сам се до сада бавио',
            colorClass: 'light-green lighten-3',
            theme: 'green-card',
            icon: 'mdi-clipboard-account',
            image: 'http://strahinja.org/img/preview-profile-strahinja-org.png',
            imageAlt: 'Стилизована ознака профила са умањеним логом са'
                + ' иницијалима СР и текстом //strahinja.org',
            url: { path: '/profil' },
            parentUrl: '/',
            parentName: 'почетну',
            includedInNavigation: true,
            includedInMainToolbar: true,
            imageUrl: '/static/img/pexels-photo-375882.jpeg'
        },
        {
            title: 'Портфолио',
            text: 'Колекција мојих радова',
            colorClass: 'orange lighten-3',
            theme: '',
            icon: 'mdi-palette',
            image: 'http://strahinja.org/img/preview-portfolio-strahinja-org.png',
            imageAlt: 'Стилизована ознака сликарске палете са умањеним логом са'
                + ' иницијалима СР и текстом //strahinja.org',
            url: { path: '/portfolio' },
            parentUrl: '/',
            parentName: 'почетну',
            includedInNavigation: true,
            includedInMainToolbar: true,
            imageUrl: '/static/img/pexels-photo-65543.jpeg'
        },
        {
            title: 'Везе',
            text: 'Мени интересантни сајтови',
            colorClass: 'light-blue lighten-4',
            theme: '',
            icon: 'mdi-bookmark-multiple',
            image: 'http://strahinja.org/img/preview-links-strahinja-org.png',
            imageAlt: 'Стилизована ознака обележивача са умањеним логом са'
                + ' иницијалима СР и текстом //strahinja.org',
            url: { path: '/veze' },
            parentUrl: '/',
            parentName: 'почетну',
            includedInNavigation: true,
            includedInMainToolbar: false,
            imageUrl: '/static/img/pexels-photo-1887836.jpeg'
        },
        {
            title: 'Блог',
            text: 'Мој веб дневник',
            colorClass: '',
            theme: '',
            icon: 'mdi-fountain-pen-tip',
            image: 'http://strahinja.org/img/preview-blog-strahinja-org.png',
            imageAlt: 'Цртеж врха пенкала са умањеним логом са иницијалима'
                + ' СР и текстом //strahinja.org',
            url: { path: '/blog' },
            parentUrl: '/',
            parentName: 'почетну',
            includedInNavigation: true,
            includedInMainToolbar: true,
            imageUrl: '',
        },
        {
            title: 'Чланак блога',
            text: 'Страница чланка блога',
            colorClass: '',
            theme: '',
            icon: 'mdi-fountain-pen-tip',
            image: 'http://strahinja.org/img/preview-blog-strahinja-org.png',
            imageAlt: 'Цртеж врха пенкала са умањеним логом са иницијалима'
                + ' СР и текстом //strahinja.org',
            url: { path: '/blog' },
            parentUrl: '/blog',
            parentName: 'списак чланака',
            includedInNavigation: false,
            includedInMainToolbar: false,
            imageUrl: ''
        },
        {
            title: 'Чланци са ознаком',
            text: 'Чланци са задатом ознаком',
            colorClass: '',
            theme: '',
            icon: 'mdi-fountain-pen-tip',
            image: 'http://strahinja.org/img/preview-blog-strahinja-org.png',
            imageAlt: 'Цртеж врха пенкала са умањеним логом са иницијалима'
                + ' СР и текстом //strahinja.org',
            url: { path: '/blog/tag' },
            parentUrl: '/blog',
            parentName: 'списак чланака',
            includedInNavigation: false,
            includedInMainToolbar: false,
            imageUrl: ''
        }
    ],
    pageIndex: 0,
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
});

export const mutations = {
    setPageIndex(state, payload)
    {
        state.pageIndex = payload.newIndex;
    }
};
