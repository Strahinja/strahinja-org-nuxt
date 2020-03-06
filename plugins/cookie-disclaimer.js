export default function({ app, store })
{
    store.dispatch('pages/setCookieConsent',
                   app.$cookies.get('strahinja-org-cookie-consent') == '1', { root: true });
}

