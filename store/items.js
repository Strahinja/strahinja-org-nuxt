const categoryIds = {
    ITEM_ARTICLE_SOFTWARE :  4,
    ITEM_ARTICLE_MATHS    :  5,
    ITEM_ORIGINAL_TEXT    :  11,
};

export const state = () => ({
    categoryIds,
    list: [],
    apiUrl: '/items/{0}',
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
    fileCount: (state, getters) => getters['fileList'].length,
    fileList: state => state.list.filter((item) =>
        item.icon.length > 0),
    indexByLinkId: state => linkId =>
        state.list.findIndex(item => item.link_id == linkId),
    itemByLinkId: state => linkId =>
        state.list.find(item => item.link_id == linkId),
    apiPath: state => catId => state.apiUrl.replace('{0}', catId),
};

function getIcon(path)
{
    let mappings = [
        { ext: '.pdf', icon: 'mdi-file-pdf-box' },
        { ext: '.txt', icon: 'mdi-text-box' },
        { ext: '.zip', icon: 'mdi-package-down' },
        { ext: '.gz' , icon: 'mdi-package-down' },
        { ext: '.bz2', icon: 'mdi-package-down' },
        { ext: '.rar', icon: 'mdi-package-down' },
    ];
    let index = mappings.findIndex((mapping) =>
        path.slice(-mapping.ext.length) === mapping.ext);

    return index !== -1 ? mappings[index].icon : '';
}

export const actions = {
    async loadItems({ commit, dispatch, getters }, payload)
    {
        if (payload && payload.catId)
        {
            let res = null;
            dispatch('loading/startLoading', { id: 'items', },
                     { root: true });
            try
            {
                res = await this.$axios.$get(getters['apiPath'](payload.catId));
            }
            catch(error)
            {
                dispatch('loading/stopLoading', { id: 'items' },
                         { root: true });
                console.error('store/items.js: ', error);
            }
            dispatch('loading/stopLoading', { id: 'items' },
                     { root: true });

            if (res && res.data && res.code === 200)
            {
                res.data.forEach((item) =>
                {
                    item.old_link_id = item.link_id;
                    item.icon = getIcon(item.path);
                    item.is_file = item.icon.length > 0;
                });
                commit('setList', res.data);
            }
        }
    },

    /*
     *loadItem({ getters }, itemId)
     *{
     *    return this.$axios.$get(`${getters['apiReadPath']}/${itemId}`);
     *},
     */

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

/*
 *    async saveItem({ commit, getters }, payload)
 *    {
 *        let index = getters['indexByLinkId'](payload.linkId);
 *
 *        if (index != -1)
 *        {
 *            console.log('store/portfolio: saveItem: index = ', index);
 *            let item = getters['itemByLinkId'](payload.linkId);
 *            console.log('store/portfolio: saveItem: item = ', item);
 *
 *            try
 *            {
 *                let result = await this.$axios.$post(
 *                    getters['apiSerializePath'], item);
 *                if (result && result.code==200)
 *                {
 *                    item.added = false;
 *                    item.old_link_id = item.link_id;
 *                    commit('setItem', { index, item });
 *                    if (payload.success)
 *                    {
 *                        payload.success(result);
 *                    }
 *                }
 *                else if (payload.error)
 *                {
 *                    payload.error(result);
 *                }
 *            }
 *            catch(err)
 *            {
 *                if (payload.error)
 *                {
 *                    payload.error({ message: err });
 *                }
 *            }
 *        }
 *    },
 *
 *    async removeItem({ commit, getters }, payload)
 *    {
 *        let index = getters['indexByLinkId'](payload.linkId);
 *        let link_id = payload.linkId;
 *
 *        try
 *        {
 *            let result = await this.$axios.$post(getters['apiRemovePath'],
 *                                                 { link_id });
 *            if (result.code == 200)
 *            {
 *                let list = getters['list'];
 *                list.splice(index, 1);
 *                commit('setList', list);
 *                if (payload.success)
 *                {
 *                    payload.success(result);
 *                }
 *            }
 *            else if (payload.error)
 *            {
 *                payload.error(result);
 *            }
 *        }
 *        catch(err)
 *        {
 *            if (payload.error)
 *            {
 *                payload.error({ message: err });
 *            }
 *        }
 *    },
 *
 *    moveItemUp({ commit, getters }, linkId)
 *    {
 *        let itemIndex = getters['indexByLinkId'](linkId);
 *
 *        if (itemIndex < 1)
 *        {
 *            return;
 *        }
 *
 *        let newList = [].concat(getters['list']);
 *        let item = newList.splice(itemIndex, 1)[0];
 *
 *        newList.splice(itemIndex-1, 0, item);
 *
 *        //console.log('store/portfolio: moveItemUp: list[before] = ', getters['list']);
 *        commit('setList', newList);
 *        //console.log('store/portfolio: moveItemUp: list[after] = ', getters['list']);
 *
 *        newList = null;
 *        item = null;
 *    },
 *
 *    moveItemDown({ commit, getters }, linkId)
 *    {
 *        let itemIndex = getters['indexByLinkId'](linkId);
 *
 *        if (itemIndex > getters['count']-2)
 *        {
 *            return;
 *        }
 *
 *        let newList = [].concat(getters['list']);
 *        let item = newList.splice(itemIndex, 1)[0];
 *
 *        newList.splice(itemIndex+1, 0, item);
 *
 *        console.log('store/portfolio: moveItemDown: list[before] = ', getters['list']);
 *        commit('setList', newList);
 *        console.log('store/portfolio: moveItemDown: list[after] = ', getters['list']);
 *
 *        newList = null;
 *        item = null;
 *    },
 *
 *    changeLinkId({ commit, getters }, payload)
 *    {
 *        let item = getters['itemByLinkId'](payload.from);
 *        if (item)
 *        {
 *            let index = getters['indexByLinkId'](payload.from);
 *            item.link_id = payload.to;
 *            if (!item.old_link_id)
 *            {
 *                item.old_link_id = payload.from;
 *            }
 *            commit('setItem', { index, item });
 *        }
 *    },
 *
 *    async saveOrdering({ getters }, payload)
 *    {
 *        let items = getters['itemIdList'];
 *
 *        console.log('store/portfolio: saveOrdering: items = ', items);
 *
 *        try
 *        {
 *            let result = await this.$axios.$post(
 *                getters['apiOrderingPath'], { items });
 *            if (result && result.code==200)
 *            {
 *                if (payload.success)
 *                {
 *                    payload.success(result);
 *                }
 *            }
 *            else if (payload.error)
 *            {
 *                payload.error(result);
 *            }
 *        }
 *        catch(err)
 *        {
 *            if (payload.error)
 *            {
 *                payload.error({ message: err });
 *            }
 *        }
 *    },
 */
};

