export const state = () => ({
    list: [],
    apiUrl: '/users',
    apiAddUrl: '/users/add',
    apiUpdateUrl: '/users/update',
    apiSingleUserUrl: '/users/{0}',
    avatarUrl: '/img/user/{0}/avatar.jpg',
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
    },
    setListAtIndex(state, payload)
    {
        state.list[payload.index] = payload.data;
    },
};

export const getters = {
    count: state => state.list.length,
    list: state => state.list,
    apiPath: state => state.apiUrl,
    apiAddPath: state => state.apiAddUrl,
    apiUpdatePath: state => state.apiUpdateUrl,
    apiSingleUserPath: state => userId =>
        userId ? state.apiSingleUserUrl.replace('{0}', userId)
            : null,
    userById: state => userId =>
        state.list.find(user => user.id == userId),
    userByEmail: state => email =>
        state.list.find(user => user.email == email),
    indexOfUserByEmail: state => email =>
        state.list.indexOf(user => user.email == email),
    isAdmin: (state, getters) => email =>
    {
        const user = getters['userByEmail'](email);
        return user && user.is_admin == 1;
    },
    avatarUrlForId: state => userId =>
        userId ? state.avatarUrl.replace('{0}', userId)
            : null,
    indexById: state => userId =>
        state.list.findIndex(user => user.id == userId),
};

export const actions = {
    async addUser({ commit, dispatch, getters }, payload)
    {
        if (payload.data && payload.data.email && !getters['userByEmail'](payload.data.email))
        {
            await dispatch('loading/startLoading', {
                id: 'users'
            }, { root: true });
            try
            {
                const res = await this.$axios.post(getters['apiAddPath'], {
                    provider: payload.provider,
                    token: payload.data.token,
                    name: payload.data.name,
                    surname: payload.data.surname,
                    email: payload.data.email,
                });
                await dispatch('loading/stopLoading', {
                    id: 'users'
                }, { root: true });
                if (res.data && res.code == 200)
                {
                    commit('addUser', res.data);
                }
            }
            catch(err)
            {
                await dispatch('loading/stopLoading', {
                    id: 'users'
                }, { root: true });
                console.error('store/users.js: ', err);
            }
        }
    },
    async updateUser({ commit, dispatch, getters }, payload)
    {
        if (payload.data && payload.data.email && getters['userByEmail'](payload.data.email))
        {
            await dispatch('loading/startLoading', {
                id: 'users'
            }, { root: true });

            try
            {
                const res = await this.$axios.post(getters['apiUpdatePath'], {
                    provider: payload.provider,
                    token: payload.data.token,
                    name: payload.data.name,
                    surname: payload.data.surname,
                    email: payload.data.email,
                });
                await dispatch('loading/stopLoading', {
                    id: 'users'
                }, { root: true });
                if (res.data && res.code == 200)
                {
                    commit('updateUser', res.data);
                }
            }
            catch(err)
            {
                await dispatch('loading/stopLoading', {
                    id: 'users'
                }, { root: true });
                console.error('store/users.js: ', err);
            }
        }
    },
    async deleteUser({ commit, dispatch, getters }, payload)
    {
        if (payload.email && getters['userByEmail'](payload.email))
        {
            await dispatch('loading/startLoading', {
                id: 'users'
            }, { root: true });
            try
            {
                const res = await this.$axios.$delete(
                    getters['apiPath'], payload.email);
                await dispatch('loading/stopLoading', {
                    id: 'users'
                }, { root: true });
                if (res.data && res.data.email && res.code == 200)
                {
                    commit('deleteUser', res.data.email);
                }
            }
            catch(err)
            {
                await dispatch('loading/stopLoading', {
                    id: 'users'
                }, { root: true });
                console.error('store/users.js: ', err);
            }
        }
    },
    async loadUsers({ commit, dispatch, getters }, payload)
    {
        if (!getters['count'])
        {
            await dispatch('loading/startLoading', {
                id: 'users'
            }, { root: true });

            try
            {
                let res = await this.$axios.$get(getters['apiPath']);
                await dispatch('loading/stopLoading', {
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
            }
            catch(error)
            {
                await dispatch('loading/stopLoading', {
                    id: 'users'
                }, { root: true });
                console.error('store/users.js: ', error);
            }
        }
        else
        {
            if (payload && payload.thenCallback)
            {
                payload.thenCallback();
            }
        }
    },
    async loadSingleUser({ commit, dispatch, getters }, payload)
    {
        //console.log('store/users: loadSingleUser: payload = ', payload);
        await dispatch('loading/startLoading', {
            id: 'single-user'
        }, { root: true });
        try
        {
            let res = await this.$axios.$get(getters['apiSingleUserPath'](
                payload.userId));
            await dispatch('loading/stopLoading', {
                id: 'single-user'
            }, { root: true });
            if (res.data && res.code == 200)
            {
                let index = getters['indexById'](payload.userId);
                let data = res.data;

                if (index != -1)
                {
                    commit('setListAtIndex', { data, index });
                }
                else
                {
                    commit('addUser', data);
                }
            }
            if (payload && payload.thenCallback)
            {
                payload.thenCallback();
            }
        }
        catch(err)
        {
            await dispatch('loading/stopLoading', {
                id: 'single-user'
            }, { root: true });
            console.error('store/users.js: ', err);
        }
    }
};

