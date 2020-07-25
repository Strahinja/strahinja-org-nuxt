export const themeIds = {
    THEME_DARK: 'dark',
    THEME_LIGHT: 'light',
};

import light from '~/theme/dunedain-light';
import dark from '~/theme/dunedain-dark';
import { routeIds } from './pages';
import { cookieNames } from './cookies';

export const state = () => ({
    theme: themeIds.THEME_LIGHT,
    themes: [
        {
            id: themeIds.THEME_DARK,
            theme: dark,
            elements: [
                {
                    id: routeIds.PAGE_HOME,
                    mainToolbarBtnBg: 'secondary darken-1',
                    firstSplashForegroundColor: '#fff',
                    firstSplashBackgroundColor: '#1d201d',
                    secondSplashForegroundColor: '#fff',
                    secondSplashBackgroundColor: dark.primary.darken2,
                },
                {
                    id: routeIds.PAGE_PROFILE,
                    cardTitleBackgroundColor: dark.secondary.darken1,
                },
                {
                    id: routeIds.LAYOUT_DEFAULT,
                    appbarBackgroundColor: dark.primary.darken2,
                    footerFirstLineBackgroundColor: dark.primary.darken1,
                    footerSecondLineBackgroundColor: dark.primary.darken2,
                },
                {
                    id: routeIds.COMPONENT_SUBPAGE,
                    splashForegroundColor: '#fff',
                    splashBackgroundColor: dark.primary.darken1,
                },
            ],
        },
        {
            id: themeIds.THEME_LIGHT,
            theme: light,
            elements: [
                {
                    id: routeIds.PAGE_HOME,
                    mainToolbarBtnBg: 'secondary lighten-1',
                    firstSplashForegroundColor: '#000',
                    firstSplashBackgroundColor: light.primary.lighten1,
                    secondSplashForegroundColor: '#000',
                    secondSplashBackgroundColor: light.secondary.lighten1,
                },
                {
                    id: routeIds.PAGE_PROFILE,
                    cardTitleBackgroundColor: light.secondary.lighten1,
                },
                {
                    id: routeIds.LAYOUT_DEFAULT,
                    appbarBackgroundColor: light.primary.base,
                    footerFirstLineBackgroundColor: light.primary.base,
                    footerSecondLineBackgroundColor: light.primary.darken1,
                },
                {
                    id: routeIds.COMPONENT_SUBPAGE,
                    splashForegroundColor: '#000',
                    splashBackgroundColor: light.secondary.lighten1,
                },
            ],
        }],
});

export const mutations = {
    setTheme(state, payload)
    {
        state.theme = payload;
    },
};

export const getters = {
    themeById: state => themeId =>
        state.themes.find((theme) => theme.id === themeId),
    element: (state, getters) => (themeId, routeId) =>
    {
        const theme = getters['themeById'](themeId);
        return theme
            ? theme.elements.find(element =>
                element.id === routeId)
            : {};
    },
    theme: state => state.theme,
    isThemeDark: state => state.theme == themeIds.THEME_DARK,
};

export const actions = {
    async initTheme({ commit, rootGetters }, { vuetify })
    {
        let theme = rootGetters['cookies/cookieValueById'](
            cookieNames.COOKIE_STRAHINJA_ORG_THEME,
            themeIds.THEME_LIGHT
        );
        if (!theme)
        {
            theme = themeIds.THEME_LIGHT;
        }

        if (vuetify && vuetify.theme)
        {
            if (theme == themeIds.THEME_DARK)
            {
                vuetify.theme.dark = true;
            }
            else if (vuetify)
            {
                vuetify.theme.dark = false;
            }
        }
        commit('setTheme', theme);
    },
    async setTheme({ commit, dispatch }, { theme, vuetify })
    {
        if (vuetify && vuetify.theme)
        {
            if (theme == themeIds.THEME_DARK)
            {
                vuetify.theme.dark = true;
            }
            else
            {
                vuetify.theme.dark = false;
            }
        }
        await dispatch('cookies/setCookie', {
            id: cookieNames.COOKIE_STRAHINJA_ORG_THEME,
            value: theme
        }, { root: true });
        commit('setTheme', theme);
    },
    async cycleTheme({ dispatch, getters }, { vuetify })
    {
        if (getters['theme'] == themeIds.THEME_DARK)
        {
            await dispatch('setTheme', {
                vuetify,
                theme: themeIds.THEME_LIGHT
            });
        }
        else
        {
            await dispatch('setTheme', {
                vuetify,
                theme: themeIds.THEME_DARK
            });
        }
    },
};
