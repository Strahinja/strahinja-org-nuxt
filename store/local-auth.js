export const state = () => ({
    user: {},
    processingLogin: false,
    loginError: {},
    apiUrl: '/login',
    apiCheckLoginUrl: '/check_login',
    apiLogoutUrl: '/logout',
    avatarUrl: '/img/user/{0}/avatar.jpg',
});

export const mutations = {
    setUser(state, payload)
    {
        state.user = payload;
    },
    setProcessingLogin(state, payload)
    {
        state.processingLogin = payload;
    },
    setLoginError(state, payload)
    {
        state.loginError = payload;
    },
};

function isObjectEmpty(obj)
{
    //eslint-disable-next-line 
    for (let prop in obj) return false;
    return true;
}

export const getters = {
    user: state => state.user,
    apiPath: state => state.apiUrl,
    apiCheckLoginPath: state => state.apiCheckLoginUrl,
    apiLogoutPath: state => state.apiLogoutUrl,
    processingLogin: state => state.processingLogin,
    loginError: state => state.loginError,
    loggedIn: state => !isObjectEmpty(state.user),
    userId: state => !isObjectEmpty(state.user) ? state.user.id : 0,
    avatarUrl: state => !isObjectEmpty(state.user)
        ? state.avatarUrl.replace('{0}', state.user.id)
        : null,
};

export const actions = {
    login({ commit, getters }, payload)
    {
        commit('setProcessingLogin', true);
        commit('setLoginError', {});

        this.$axios.$post(getters['apiPath'], {
            username: payload.username,
            password: payload.password,
        })
            .then((res) =>
            {
                if (res.code==200)
                {
                    if (payload.success)
                    {
                        payload.success(res);
                    }
                }
                else
                {
                    if (payload.error)
                    {
                        payload.error(res);
                    }
                }

                console.log('store/local-auth: res = ', res);
                commit('setProcessingLogin', false);
                commit('setUser', res.data || {});
                if (!getters['loggedIn'])
                {
                    commit('setLoginError', res);
                }
            })
            .catch((err) =>
            {
                this.$toast.error(err, { icon: 'mdi mdi-alert' });
                commit('setProcessingLogin', false);
                commit('setLoginError', err);
            });
    },

    async checkLogin({ commit, getters })
    {
        try
        {
            let res = await this.$axios.$get(getters['apiCheckLoginPath']);
            console.log('store/local-auth: checkLogin: res = ', res);
            commit('setUser', res.data || {});
            if (res.code != 200 && res.message != 'Недоступан кључ')
            {
                this.$toast.error(res.message, { icon: 'mdi mdi-alert' });
            }
        }
        catch(err)
        {
            if (err != 'Недоступан кључ')
            {
                this.$toast.error(err, { icon: 'mdi mdi-alert' });
            }
        }
    },

    logout({ commit, getters, rootGetters })
    {
        //console.log('store/local-auth: logout()');
        this.$axios.$get(getters['apiLogoutPath'])
            .then((/*res*/) =>
            {
                //console.log('store/local-auth: logout.then(): res = ', res);
                commit('setUser', {});
                if (rootGetters['pages/isPageProtectedById'](rootGetters['pages/pageId']))
                {
                    this.$router.push('/');
                }
            })
            .catch((err) =>
            {
                this.$toast.error(err, { icon: 'mdi mdi-alert' });
            });
    },
};

