export default function({ store })
{
    store.dispatch('local-auth/checkLogin', null, { root: true });
}

