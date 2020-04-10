export default function({ store })
{
    return store.dispatch('users/loadUser');
}

