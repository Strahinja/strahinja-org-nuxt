export const state = () => ({
    list: [],
    apiUrl: '/portfolio?c=12',
    apiReadUrl: '/portfolio/{0}',
    apiSerializeUrl: '/portfolio/serialize',
    apiOrderingUrl: '/portfolio/order',
    apiRemoveUrl: '/portfolio/delete',
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
    firstN: state => n => state.list.slice(0, n),
    indexByLinkId: state => linkId =>
        state.list.findIndex(item => item.link_id == linkId),
    itemByLinkId: state => linkId =>
        state.list.find(item => item.link_id == linkId),
    apiPath: state => state.apiUrl,
    apiReadPath: state => itemId =>
        state.apiReadUrl.replace('{0)', itemId),
    apiSerializePath: state => state.apiSerializeUrl,
    apiOrderingPath: state => state.apiOrderingUrl,
    apiRemovePath: state => state.apiRemovePath,
    itemIdList: state => state.list.map(item => item.id),
};

export const actions = {
    async loadItems({ commit, /*dispatch,*/ getters })
    {
        if (!getters['count'])
        {
            let res = null;
            //dispatch('loading/startLoading', { id: 'portfolio', },
            //{ root: true });
            try
            {
                res = await this.$axios.$get(getters['apiPath']);
            }
            catch(error)
            {
                //dispatch('loading/stopLoading', { id: 'portfolio' },
                //{ root: true });
                console.error('store/portfolio.js: ', error);
            }
            //dispatch('loading/stopLoading', { id: 'portfolio' },
            //{ root: true });

            if (res && res.data && res.code === 200)
            {
                res.data.forEach((item) =>
                {
                    item.old_link_id = item.link_id;
                });
                commit('setList', res.data);
            }
        }
    },

    async loadItem({ getters }, itemId)
    {
        return await this.$axios.$get(getters['apiReadPath'](itemId));
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
        item.added = true;
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

    async saveItem({ commit, getters }, payload)
    {
        let index = getters['indexByLinkId'](payload.linkId);

        if (index != -1)
        {
            //console.log('store/portfolio: saveItem: index = ', index);
            let item = getters['itemByLinkId'](payload.linkId);
            //console.log('store/portfolio: saveItem: item = ', item);

            try
            {
                let result = await this.$axios.$post(
                    getters['apiSerializePath'], item);
                if (result && result.code==200)
                {
                    item.added = false;
                    item.old_link_id = item.link_id;
                    commit('setItem', { index, item });
                    if (payload.success)
                    {
                        payload.success(result);
                    }
                }
                else if (payload.error)
                {
                    payload.error(result);
                }
            }
            catch(err)
            {
                if (payload.error)
                {
                    payload.error({ message: err });
                }
            }
        }
    },

    async removeItem({ commit, getters }, payload)
    {
        let index = getters['indexByLinkId'](payload.linkId);
        let link_id = payload.linkId;

        try
        {
            let result = await this.$axios.$post(getters['apiRemovePath'],
                                                 { link_id });
            if (result.code == 200)
            {
                let list = getters['list'];
                list.splice(index, 1);
                commit('setList', list);
                if (payload.success)
                {
                    payload.success(result);
                }
            }
            else if (payload.error)
            {
                payload.error(result);
            }
        }
        catch(err)
        {
            if (payload.error)
            {
                payload.error({ message: err });
            }
        }
    },

    moveItemUp({ commit, getters }, linkId)
    {
        let itemIndex = getters['indexByLinkId'](linkId);

        if (itemIndex < 1)
        {
            return;
        }

        let newList = [].concat(getters['list']);
        let item = newList.splice(itemIndex, 1)[0];

        newList.splice(itemIndex-1, 0, item);

        //console.log('store/portfolio: moveItemUp: list[before] = ', getters['list']);
        commit('setList', newList);
        //console.log('store/portfolio: moveItemUp: list[after] = ', getters['list']);

        newList = null;
        item = null;
    },

    moveItemDown({ commit, getters }, linkId)
    {
        let itemIndex = getters['indexByLinkId'](linkId);

        if (itemIndex > getters['count']-2)
        {
            return;
        }

        let newList = [].concat(getters['list']);
        let item = newList.splice(itemIndex, 1)[0];

        newList.splice(itemIndex+1, 0, item);

        //console.log('store/portfolio: moveItemDown: list[before] = ', getters['list']);
        commit('setList', newList);
        //console.log('store/portfolio: moveItemDown: list[after] = ', getters['list']);

        newList = null;
        item = null;
    },

    changeLinkId({ commit, getters }, payload)
    {
        let item = getters['itemByLinkId'](payload.from);
        if (item)
        {
            let index = getters['indexByLinkId'](payload.from);
            item.link_id = payload.to;
            if (!item.old_link_id)
            {
                item.old_link_id = payload.from;
            }
            commit('setItem', { index, item });
        }
    },

    async saveOrdering({ getters }, payload)
    {
        let items = getters['itemIdList'];

        //console.log('store/portfolio: saveOrdering: items = ', items);

        try
        {
            let result = await this.$axios.$post(
                getters['apiOrderingPath'], { items });
            if (result && result.code==200)
            {
                if (payload.success)
                {
                    payload.success(result);
                }
            }
            else if (payload.error)
            {
                payload.error(result);
            }
        }
        catch(err)
        {
            if (payload.error)
            {
                payload.error({ message: err });
            }
        }
    },
};

