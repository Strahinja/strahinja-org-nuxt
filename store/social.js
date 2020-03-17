export const state = () => ({
    loginProviders: {
        facebook: {
            id: 'facebook',
            enabled: false, // Works locally (yarn dev), but not statically-generated
            dark: true,
            color: '#3b5999',
            icon: 'mdi-facebook',
            title: 'Фејсбук',
            shortDesc: 'Пријављивање преко Фејсбука',
        },
        google: {
            id: 'google',
            enabled: true, // Always works
            dark: true,
            color: '#dd4b39',
            icon: 'mdi-google',
            title: 'Гугл',
            shortDesc: 'Пријављивање преко Гугла',
        },
        github: {
            id: 'github',
            enabled: false, // Doesn't work
            dark: true,
            color: '#171515',
            icon: 'mdi-github',
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
            enabled: false, // Doesn't work
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
    loginProviders: state => state.loginProviders,
};
