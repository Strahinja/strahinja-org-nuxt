export default async function ({ app })
{
    if (!app || !app.$auth || !app.$auth.loggedIn)
    {
        console.log('plugins/auth.js: Not logged in');
        /*app.$toast.error('plugins/auth.js: Корисник није пријављен', {
            icon: 'mdi mdi-alert',
        });*/
        return;
    }

    app.$toast.info('plugins/auth.js: Корисник је пријављен', {
        icon: 'mdi mdi-account-check',
    });

    const auth = app.$auth;
    const authStrategy = auth.strategy.name;

    if (authStrategy === 'facebook' || authStrategy === 'google')
    {
        const token = auth.getToken(authStrategy);
        const refreshToken = auth.getRefreshToken(authStrategy);

        console.log('plugins/auth.js: token = ', token);
        console.log('plugins/auth.js: refreshToken = ', refreshToken);
        try
        {
            await auth.fetchUser();
        }
        catch(error)
        {
            console.log(error);
        }
    }
}

