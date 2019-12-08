export const state = () => ({
    list: [],
    apiUsers: process.env.VUE_APP_API_PATH + '/users',
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
    apiPath: state => state.apiUsers,
    userById: state => userId =>
        state.list.find(user => user.user_id == userId),
    userByEmail: state => email =>
        state.list.find(user => user.email == email),
    indexOfUserByEmail: state => email =>
        state.list.indexOf(user => user.email == email),
};

export const actions = {
    createUser({ commit, dispatch, getters }, payload)
    {
        if (payload.email && !getters['userByEmail'](payload.email))
        {
            dispatch('loading/startLoading', {
                id: 'users'
            });
            this.$axios.$put(getters['apiPath'], payload)
                .then(res =>
                {
                    dispatch('loading/stopLoading', {
                        id: 'users'
                    });
                    if (res.data && res.code == 200)
                    {
                        commit('addUser', res.data);
                    }
                })
                .catch(error =>
                {
                    dispatch('loading/stopLoading', {
                        id: 'users'
                    });
                    console.error('store/users.js: ', error);
                });
        }
    },
    updateUser({ commit, dispatch, getters }, payload)
    {
        if (payload.email && getters['userByEmail'](payload.email))
        {
            dispatch('loading/startLoading', {
                id: 'users'
            });
            this.$axios.$patch(getters['apiPath'], payload)
                .then(res =>
                {
                    dispatch('loading/stopLoading', {
                        id: 'users'
                    });
                    if (res.data && res.code == 200)
                    {
                        commit('updateUser', res.data);
                    }
                })
                .catch(error =>
                {
                    dispatch('loading/stopLoading', {
                        id: 'users'
                    });
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
            });
            this.$axios.$delete(getters['apiPath'], payload.email)
                .then(res =>
                {
                    dispatch('loading/stopLoading', {
                        id: 'users'
                    });
                    if (res.data && res.data.email && res.code == 200)
                    {
                        commit('deleteUser', res.data.email);
                    }
                })
                .catch(error =>
                {
                    dispatch('loading/stopLoading', {
                        id: 'users'
                    });
                    console.error('store/users.js: ', error);
                });
        }
    },
    loadUsers({ commit, dispatch, getters })
    {
        if (!getters['itemCount'])
        {
            dispatch('loading/startLoading', {
                id: 'users'
            });
            this.$axios.$get(getters['apiPath'])
                .then(res =>
                {
                    dispatch('loading/stopLoading', {
                        id: 'users'
                    });
                    if (res.data && res.code == 200)
                    {
                        commit('setList', res.data);
                    }
                })
                .catch(error =>
                {
                    dispatch('loading/stopLoading', {
                        id: 'users'
                    });
                    console.error('store/users.js: ', error);
                });
        }
    }
};

