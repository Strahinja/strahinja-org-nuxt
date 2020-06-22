export const themeIds = {
    THEME_DARK: 'dark',
    THEME_LIGHT: 'light',
};

import light from '~/theme/dunedain-light';
import dark from '~/theme/dunedain-dark';
import { routeIds } from './pages';

export const state = () => ({
    themeIds,
    themes: [{
        id: themeIds.THEME_LIGHT,
        theme: light,
        elements: [
            {
                id: routeIds.PAGE_HOME,
                mainToolbarBtnBg: 'secondary darken-1',
                firstSplashForegroundColor: '#fff',
                firstSplashBackgroundColor: '#1d221d',
                secondSplashForegroundColor: '#fff',
                secondSplashBackgroundColor: '#1e231e',
            },
        ],
    },{
        id: themeIds.THEME_DARK,
        theme: dark,
        elements: [
            {
                id: routeIds.PAGE_HOME,
                mainToolbarBtnBg: 'secondary lighten-1',
                firstSplashForegroundColor: '#000',
                firstSplashBackgroundColor:
                        light.primary.lighten1,
                secondSplashForegroundColor: '#000',
                secondSplashBackgroundColor:
                        light.secondary.lighten1,
            } ,
        ],
    }],
});

export const getters = {
    themeById: state => themeId =>
        state.themes.find((theme) => theme.id === themeId),
    element: (state, getters) => (themeId, routeId) =>
        getters['themeById'](themeId).elements.find(element =>
            element.id === routeId),
};

