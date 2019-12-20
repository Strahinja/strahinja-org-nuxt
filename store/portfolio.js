export const state = () => ({
    list: [],
    apiUrl: '/portfolio?c=12',
});

export const mutations = {
    setList(state, payload)
    {
        state.list = payload;
    }
};

export const getters = {
    itemCount: state => state.list.length,
    list: state => state.list,
    apiPath: state => state.apiUrl,
};

export const actions = {
    loadPortfolio({ commit, dispatch, getters })
    {
        if (!getters['itemCount'])
        {
            dispatch('loading/startLoading', {
                id: 'portfolio',
            }, { root: true });
            this.$axios
                .$get(getters['apiPath'])
                .then(res =>
                {
                    dispatch('loading/stopLoading', {
                        id: 'portfolio'
                    }, { root: true });
                    if (res.data && res.code === 200)
                    {
                        commit('setList', res.data);
                    }
                })
                .catch(error =>
                {
                    dispatch('loading/stopLoading', {
                        id: 'portfolio'
                    }, { root: true });
                    console.error('store/portfolio.js: ', error);
                });
        }
    }
};

