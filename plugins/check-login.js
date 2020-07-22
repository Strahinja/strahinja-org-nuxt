export default function({ store })
{
    console.log('plugins/check-login: loading.');
    store.dispatch('local-auth/checkLogin', { root: true });
}

