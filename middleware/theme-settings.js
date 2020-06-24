import { themeIds } from '~/store/themes';
export default function({ app, store })
{
    const cookie = app.$cookies.get('strahinja-org-theme');
    store.dispatch('themes/setTheme', {
        vuetify: null,
        theme: cookie ? cookie : themeIds.THEME_LIGHT,
    }, { root: true });
}

