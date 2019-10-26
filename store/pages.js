export const state = () => ({
    routeIds: {
        PAGE_HOME: -1,
        PAGE_PROFILE: 0,
        PAGE_PORTFOLIO: 1,
        PAGE_LINKS: 2,
        PAGE_BLOG_INDEX: 3,
        PAGE_BLOG_POST: 4,
        PAGE_NOINDEX: -1,
    },
    homePage: {
        title: 'Почетна',
        text: '',
        colorClass: 'md-primary',
        theme: '',
        icon: 'mdi-home',
        image: 'http://strahinja.org/img/preview-home-strahinja-org.png',
        url: { path: '/' },
        imageUrl: '/static/img/pexels-photo-1179156.jpeg'
    },
    pages: [
        {
            title: 'Профил',
            text: 'Сажетак онога чим сам се до сада бавио',
            colorClass: 'light-green lighten-3',
            theme: 'green-card',
            icon: 'mdi-clipboard-account',
            image: 'http://strahinja.org/img/preview-profile-strahinja-org.png',
            url: { path: '/profil' },
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
            url: { path: '/portfolio' },
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
            url: { path: '/veze' },
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
            url: { path: '/blog' },
            includedInNavigation: true,
            includedInMainToolbar: true,
            imageUrl: ''
        },
        {
            title: 'Чланак блога',
            text: 'Мој веб дневник',
            colorClass: '',
            theme: '',
            icon: 'mdi-fountain-pen-tip',
            image: 'http://strahinja.org/img/preview-blog-strahinja-org.png',
            url: { path: '/blog' },
            includedInNavigation: false,
            includedInMainToolbar: false,
            imageUrl: ''
        }
    ]
});

export const mutations = {
};
