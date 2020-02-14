export const state = () => ({
    list: [],
    apiUrl: '/portfolio?c=12',
    apiReadUrl: '/portfolio',
    apiAddUrl: '/portfolio/add',
    apiUpdateUrl: '/portfolio/update',
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
    apiAddPath: state => state.apiAddUrl,
    apiUpdatePath: state => state.apiUpdateUrl,
};

export const actions = {
    async loadItems({ commit, dispatch, getters })
    {
        if (!getters['itemCount'])
        {
            let res = null;
            dispatch('loading/startLoading', { id: 'portfolio', },
                     { root: true });
            try
            {
                res = await this.$axios.$get(getters['apiPath']);
            }
            catch(error)
            {
                dispatch('loading/stopLoading', { id: 'portfolio' },
                         { root: true });
                console.error('store/portfolio.js: ', error);
            }
            dispatch('loading/stopLoading', { id: 'portfolio' },
                     { root: true });

            if (res && res.data && res.code === 200)
            {
                commit('setList', res.data);
            }
        }
    },

    loadItem({ getters }, itemId)
    {
        return this.$axios.$get(`${getters['apiReadPath']}/${itemId}`);
    },

    async addItem({ dispatch, getters })
    {
        let item = await dispatch('loadItem');
        if (!item)
        {
            try
            {
                await this.$axios.$post(getters['apiAddPath']);
            }
            catch(error)
            {
                console.error('store/portfolio: ', error);
            }
        }
    },

    async updatePortfolioItem({ dispatch, getters })
    {
        let item = await dispatch('loadItem');
        if (item)
        {
            try
            {
                await this.$axios.$post(getters['apiUpdatePath']);
            }
            catch(error)
            {
                console.error('store/portfolio: ', error);
            }
        }
    }
};

