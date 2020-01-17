export const state = () => ({
    list: [],
    apiUrl: '/users',
    apiAddUrl: '/users/add',
    apiUpdateUrl: '/users/update',
});

export const mutations = {
    addUser(state, payload)
    {
        state.list.push(payload);
    },
    updateUser(state, payload)
    {
        let userIndex = getters['indexOfUserByEmail'](payload.email);
        if (userIndex != -1)
        {
            state.list[userIndex] = payload;
        }
    },
    deleteUser({ state, getters }, payload)
    {
        let userIndex = getters['indexOfUserByEmail'](payload);
        if (userIndex != -1)
        {
            state.list.splice(userIndex, 1);
        }
    },
    setList(state, payload)
    {
        state.list = payload;
    }
};

export const getters = {
    itemCount: state => state.list.length,
    list: state => state.list,
    apiPath: state => state.apiUrl,
    apiAddPath: state => state.apiAddUrl,
    apiUpdatePath: state => state.apiUpdateUrl,
    userById: state => userId =>
        state.list.find(user => user.user_id == userId),
    userByEmail: state => email =>
        state.list.find(user => user.email == email),
    indexOfUserByEmail: state => email =>
        state.list.indexOf(user => user.email == email),
    isAdmin: (state, getters) => email =>
    {
        const user = getters['userByEmail'](email);
        return user ? user.role == state.adminRoleId : false;
    }
};

export const actions = {
    addUser({ commit, dispatch, getters }, payload)
    {
        if (payload.data && payload.data.email && !getters['userByEmail'](payload.data.email))
        {
            dispatch('loading/startLoading', {
                id: 'users'
            }, { root: true });
            this.$axios.post(getters['apiAddPath'], {
                provider: payload.provider,
                token: payload.data.token,
                name: payload.data.name,
                surname: payload.data.surname,
                email: payload.data.email,
            })
                .then(res =>
                {
                    dispatch('loading/stopLoading', {
                        id: 'users'
                    }, { root: true });
                    if (res.data && res.code == 200)
                    {
                        commit('addUser', res.data);
                    }
                })
                .catch(error =>
                {
                    dispatch('loading/stopLoading', {
                        id: 'users'
                    }, { root: true });
                    console.error('store/users.js: ', error);
                });
        }
    },
    updateUser({ commit, dispatch, getters }, payload)
    {
        if (payload.data && payload.data.email && getters['userByEmail'](payload.data.email))
        {
            dispatch('loading/startLoading', {
                id: 'users'
            }, { root: true });

            this.$axios.post(getters['apiUpdatePath'], {
                provider: payload.provider,
                token: payload.data.token,
                name: payload.data.name,
                surname: payload.data.surname,
                email: payload.data.email,
            })
                .then(res =>
                {
                    dispatch('loading/stopLoading', {
                        id: 'users'
                    }, { root: true });
                    if (res.data && res.code == 200)
                    {
                        commit('updateUser', res.data);
                    }
                })
                .catch(error =>
                {
                    dispatch('loading/stopLoading', {
                        id: 'users'
                    }, { root: true });
                    console.error('store/users.js: ', error);
                });
        }
    },
    deleteUser({ commit, dispatch, getters }, payload)
    {
        if (payload.email && getters['userByEmail'](payload.email))
        {
            dispatch('loading/startLoading', {
                id: 'users'
            }, { root: true });
            this.$axios.$delete(getters['apiPath'], payload.email)
                .then(res =>
                {
                    dispatch('loading/stopLoading', {
                        id: 'users'
                    }, { root: true });
                    if (res.data && res.data.email && res.code == 200)
                    {
                        commit('deleteUser', res.data.email);
                    }
                })
                .catch(error =>
                {
                    dispatch('loading/stopLoading', {
                        id: 'users'
                    }, { root: true });
                    console.error('store/users.js: ', error);
                });
        }
    },
    loadUsers({ commit, dispatch, getters }, payload)
    {
        if (!getters['itemCount'])
        {
            dispatch('loading/startLoading', {
                id: 'users'
            }, { root: true });
            this.$axios.$get(getters['apiPath'])
                .then(res =>
                {
                    dispatch('loading/stopLoading', {
                        id: 'users'
                    }, { root: true });
                    if (res.data && res.code == 200)
                    {
                        commit('setList', res.data);
                    }
                    if (payload && payload.thenCallback)
                    {
                        payload.thenCallback();
                    }
                })
                .catch(error =>
                {
                    dispatch('loading/stopLoading', {
                        id: 'users'
                    }, { root: true });
                    console.error('store/users.js: ', error);
                });
        }
        else
        {
            if (payload && payload.thenCallback)
            {
                payload.thenCallback();
            }
        }
    }
};

