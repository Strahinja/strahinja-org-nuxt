export default function({ app, store })
{
    store.dispatch('themes/setTheme', {
        vuetify: null,
        theme: app.$cookies.get('strahinja-org-theme'),
    }, { root: true });
}

