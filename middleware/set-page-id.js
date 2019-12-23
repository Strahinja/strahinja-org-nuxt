export default function({ store, route })
{
    return store.dispatch('pages/setCurrentPageFromRouteName', route.name, { root: true });
}

