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
    },

    setItem(state, payload)
    {
        state.list[payload.index] = payload.item;
    }
};

export const getters = {
    count: state => state.list.length,
    list: state => state.list,
    findIndexByLinkId: state => linkId => state.list.findIndex(item => item.link_id == linkId),
    findByLinkId: state => linkId => state.list.find(item => item.link_id == linkId),
    apiPath: state => state.apiUrl,
    apiAddPath: state => state.apiAddUrl,
    apiUpdatePath: state => state.apiUpdateUrl,
};

export const actions = {
    async loadItems({ commit, dispatch, getters })
    {
        if (!getters['count'])
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

    /*async addItem({ dispatch, getters })
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
    },*/

    addItem({ commit, getters }, item)
    {
        let list = getters['list'];
        list.push(item);
        commit('setList', list);
    },

    /*async updatePortfolioItem({ dispatch, getters })
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
    },*/

    updateItem({ commit, getters }, item)
    {
        let index = getters['findIndexByLinkId'](item.link_id);
        if (index != -1)
        {
            commit('setItem', { index, item });
        }
    },

    removeItem({ commit, getters }, itemIndex)
    {
        let list = getters['list'];
        list.splice(itemIndex, 1);
        commit('setList', list);
    },

    moveItemUp({ commit, getters }, itemIndex)
    {
        if (itemIndex < 1)
        {
            return;
        }

        let newList = [].concat(getters['list']);
        let item = newList.splice(itemIndex, 1)[0];

        newList.splice(itemIndex-1, 0, item);

        console.log('store/portfolio: moveItemUp: list[before] = ', getters['list']);
        commit('setList', newList);
        console.log('store/portfolio: moveItemUp: list[after] = ', getters['list']);

        newList = null;
        item = null;
    },

    moveItemDown({ commit, getters }, itemIndex)
    {
        if (itemIndex > getters['count']-2)
        {
            return;
        }

        let newList = [].concat(getters['list']);
        let item = newList.splice(itemIndex, 1)[0];

        newList.splice(itemIndex+1, 0, item);

        console.log('store/portfolio: moveItemDown: list[before] = ', getters['list']);
        commit('setList', newList);
        console.log('store/portfolio: moveItemDown: list[after] = ', getters['list']);

        newList = null;
        item = null;
    },
};

