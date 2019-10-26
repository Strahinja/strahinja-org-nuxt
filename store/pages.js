export const state = () => ({
    routeIds: {
        PAGE_HOME: -1,
        PAGE_PROFILE: 0,
        PAGE_PORTFOLIO: 1,
        PAGE_LINKS: 2,
        PAGE_README: 3,
        PAGE_NOINDEX: -1,
    },
    homePage: {
        title: 'Почетна',
        text: '',
        colorClass: 'md-primary',
        theme: '',
        icon: 'mdi-home',
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
            url: { path: '/profil' },
            includedInMainToolbar: true,
            imageUrl: '/static/img/pexels-photo-375882.jpeg'
        },
        {
            title: 'Портфолио',
            text: 'Колекција мојих радова',
            colorClass: 'orange lighten-3',
            theme: '',
            icon: 'mdi-palette',
            url: { path: '/portfolio' },
            includedInMainToolbar: true,
            imageUrl: '/static/img/pexels-photo-65543.jpeg'
        },
        {
            title: 'Везе',
            text: 'Мени интересантни сајтови',
            colorClass: 'light-blue lighten-4',
            theme: '',
            icon: 'mdi-bookmark-multiple',
            url: { path: '/veze' },
            includedInMainToolbar: false,
            imageUrl: '/static/img/pexels-photo-1887836.jpeg'
        },
        {
            title: 'Блог',
            text: 'Мој веб дневник',
            colorClass: '',
            theme: '',
            icon: 'mdi-fountain-pen-tip',
            url: { path: '/blog' },
            includedInMainToolbar: true,
            imageUrl: ''
        }
    ]
});

export const mutations = {
};
