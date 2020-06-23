import { themeIds } from '~/store/themes';
export default function({ app, store, $vuetify })
{
    const cookie = app.$cookies.get('strahinja-org-theme');
    store.dispatch('themes/setTheme', {
        vuetify: $vuetify,
        theme: cookie ? cookie : themeIds.THEME_LIGHT,
    }, { root: true });
}

