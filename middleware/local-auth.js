export default async function({ store, route, app, /*redirect, */error })
{
    try
    {
        await store.dispatch('local-auth/checkLogin', null, { root: true });
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
                error({ statusCode: 401, message: 'Забрањен приступ' });
                //redirect('/');
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
            error({ statusCode: 401, message: 'Забрањен приступ' });
            //redirect('/');
        }
    }
    catch(err)
    {
        //app.$toast.error(err, { icon: 'mdi mdi-alert' });
    }
}

