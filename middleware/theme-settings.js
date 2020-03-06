export default function({ app, store })
{
    store.dispatch('pages/setTheme', {
        vuetify: null,
        theme: app.$cookies.get('strahinja-org-theme'),
    }, { root: true });
}

