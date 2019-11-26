export const state = () => ({
    list: [],
    apiPortfolio: process.env.VUE_APP_API_PATH + '/portfolio?c=12',
});

export const mutations = {
    setList(state, payload)
    {
        state.list = payload;
    }
};

export const getters = {
    itemCount: state => state.list.length,
    apiPath: state => state.apiPortfolio,
};

export const actions = {
    loadPortfolio({ commit, dispatch, getters })
    {
        dispatch('loading/startLoading', {
            id: 'portfolio',
        });
        this.$http
            .$get(getters['apiPath'])
            .then(res =>
            {
                dispatch('loading/stopLoading', {
                    id: 'portfolio'
                });
                if (res.data)
                {
                    if (res.code === 200)
                    {
                        if (!getters['itemCount'])
                        {
                            commit('setList', res.data);
                        }
                    }
                }
            })
            .catch(error =>
            {
                dispatch('loading/stopLoading', {
                    id: 'portfolio'
                });
                console.error('store/portfolio.js: ', error);
            });
    }
};

