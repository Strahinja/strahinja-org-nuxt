export default async function ({ app })
{
    if (!app || !app.$auth || !app.$auth.loggedIn)
    {
        console.log('plugins/auth.js: Not logged in');
        return;
    }

    const auth = app.$auth;
    const authStrategy = auth.strategy.name;

    if (authStrategy === 'facebook' || authStrategy === 'google')
    {
        const token = auth.getToken(authStrategy);

        console.log('plugins/auth.js: token = ', token);
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

