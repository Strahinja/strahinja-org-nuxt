export default function({ store })
{
    return store.dispatch('users/loadSingleUser', {
        userId: store.getters['local-auth/userId']
    });
}

