var getProp = require('dotprop');

export default async function ({ store, app })
{
    if (!getProp(app, '$auth.loggedIn'))
    {
        //console.log('plugins/auth.js: Not logged in');
        /*app.$toast.error('plugins/auth.js: Корисник није пријављен', {
            icon: 'mdi mdi-alert',
        });*/
        return;
    }
    //console.log('plugins/auth.js: Logged in');

    app.$toast.info('plugins/auth.js: Корисник је пријављен', {
        icon: 'mdi mdi-account-check',
    });

    const auth = app.$auth;
    const authStrategy = auth.strategy.name;

    //console.log('plugins/auth.js: strategy = ', authStrategy);

    if (authStrategy === 'facebook' || authStrategy === 'google' ||
        authStrategy === 'github')
    {
        const token = auth.getToken(authStrategy);
        const refreshToken = auth.getRefreshToken(authStrategy);

        /*console.log('plugins/auth.js: token = ', token);
        console.log('plugins/auth.js: refreshToken = ', refreshToken);*/
        try
        {
            await auth.fetchUserOnce();
            store.dispatch('users/loadUsers', {
                thenCallback: () =>
                {
                    /*console.log('plugins/auth.js: auth.user = ', auth.user);
                    console.log('plugins/auth.js: store.state.users.list = ', store.state.users.list);*/
                    if (auth.user.family_name)
                    {
                        let name = auth.user.given_name;
                        let surname = auth.user.family_name;
                        if (store.getters['users/userByEmail'](auth.user.email))
                        {
                            store.dispatch('users/updateUser', {
                                provider: authStrategy,
                                data: {
                                    email: auth.user.email,
                                    token,
                                    name,
                                    surname
                                }
                            });
                        }
                        else
                        {
                            store.dispatch('users/addUser', {
                                provider: authStrategy,
                                data: {
                                    email: auth.user.email,
                                    token,
                                    name,
                                    surname
                                }
                            });
                        }
                    }
                    else
                    {
                        let name = auth.user.name;
                        if (store.getters['users/userByEmail'](auth.user.email))
                        {
                            store.dispatch('users/updateUser', {
                                provider: authStrategy,
                                data: {
                                    email: auth.user.email,
                                    token,
                                    name
                                }
                            });
                        }
                        else
                        {
                            store.dispatch('users/addUser', {
                                provider: authStrategy,
                                data: {
                                    email: auth.user.email,
                                    token,
                                    name
                                }
                            });
                        }
                    }
                }
            });
            /*app.$store.dispatch('users/updateUser', {
            //this.$axios.$post(app.$store.getters[', {
                data: {
                    email: auth.user.email,
                    name,
                    surname
                }
            });*/
        }
        catch(error)
        {
            console.error(error);
        }
    }
}

