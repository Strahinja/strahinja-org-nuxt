export default function({ store })
{
    store.dispatch('local-auth/checkLogin', { root: true });
}

