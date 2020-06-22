export default function({ app, store, $vuetify })
{
    store.dispatch('themes/setTheme', {
        vuetify: $vuetify,
        theme: app.$cookies.get('strahinja-org-theme'),
    }, { root: true });
}

