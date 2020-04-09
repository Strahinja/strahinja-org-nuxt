export default function({ store, route, app, redirect })
{
    if (store && store.getters['local-auth/loggedIn'])
    {
        if (store.getters['pages/isPageAdminById'](
            store.getters['pages/pageId'])
            && !store.getters['local-auth/user'].is_admin)
        {
            if (app && app.$toast)
            {
                app.$toast.error('Забрањен приступ '
                    + route.path, {
                    icon: 'mdi mdi-hand-right',
                });
            }
            redirect('/');
        }
    }
    else
    {
        if (app && app.$toast)
        {
            app.$toast.error('Забрањен приступ '
                + route.path, {
                icon: 'mdi mdi-hand-right',
            });
        }
        redirect('/');
    }
}

