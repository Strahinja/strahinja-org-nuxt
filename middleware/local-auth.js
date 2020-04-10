export default async function({ store, route, app, redirect })
{
    try
    {
        await store.dispatch('local-auth/checkLogin', { root: true });
        if (store && store.getters['local-auth/loggedIn'])
        {
            //console.log('middleware/local-auth: loggedIn == true');
            //store.dispatch('users/loadSingleUser', {
            //userId: store.getters['local-auth/userId']
            //});
            if (store.getters['pages/isPageAdminById'](
                store.getters['pages/pageId'])
                && !store.getters['local-auth/user'].is_admin)
            {
                //console.log('store.getters[user] = ', store.getters['local-auth/user']);
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
            //console.log('middleware/local-auth: loggedIn == false');
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
    catch(err)
    {
        //app.$toast.error(err, { icon: 'mdi mdi-alert' });
    }
}

