export const state = () => ({
    itemList: []
});

export const mutations = {
    addItem(state, payload)
    {
        state.itemList.push(payload);
    },
    removeItem(state, payload)
    {
        state.itemList.splice(payload, 1);
    }
};

export const getters = {
    isLoading: state => itemId => state.itemList.findIndex(item =>
        item.id == itemId) != -1,
    isStoreLoading: state => state.itemList.length>0,
    itemList: state => state.itemList,
    count: state => state.itemList.length,
};

export const actions = {
    startLoading({ commit, getters }, payload)
    {
        /*if (!getters['isStoreLoading'])
        {
            this.$nuxt.$loading.start();
        }*/
        if (!getters['itemList'].find(item =>
            item.id == payload.id))
        {
            commit('addItem', payload);
        }
        //console.trace('store/loading: startLoading: id = ', payload.id);
    },
    stopLoading({ commit, getters }, payload)
    {
        let payloadIndex = getters['itemList'].findIndex(item =>
            item.id == payload.id);
        if (payloadIndex != -1)
        {
            if (getters['itemList'][payloadIndex].callback)
            {
                getters['itemList'][payloadIndex].callback();
            }
            commit('removeItem', payloadIndex);
        }
        /*if (!getters['isStoreLoading'])
        {
            this.$nuxt.$loading.finish();
        }*/
    },
};

