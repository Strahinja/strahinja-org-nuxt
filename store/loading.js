export const state = () => ({
    list: []
});

export const mutations = {
    addItem(state, payload)
    {
        state.list.push(payload);
    },
    removeItem(state, payload)
    {
        state.list.splice(payload, 1);
    },
    setList(state, payload)
    {
        state.list = payload;
    },
};

export const getters = {
    isLoading: state => itemId => state.list.findIndex(item =>
        item.id == itemId) != -1,
    isStoreLoading: state => state.list.length>0,
    findItem: state => id => state.list.find(item => item.id == id),
    findItemIndex: state => id => state.list.findIndex(item => item.id == id),
    count: state => state.list.length,
};

export const actions = {
    clearLoading({ commit })
    {
        commit('setList', []);
    },
    startLoading({ commit, getters }, payload)
    {
        /*if (!getters['isStoreLoading'])
        {
            this.$nuxt.$loading.start();
        }*/
        if (!getters['findItem'](payload.id))
        {
            commit('addItem', payload);
        }
        //console.trace('store/loading: startLoading: id = ', payload.id);
    },
    stopLoading({ commit, state, getters }, { id })
    {
        let payloadIndex = getters['findItemIndex'](id);
        if (payloadIndex != -1)
        {
            if (state.list[payloadIndex].callback)
            {
                state.list[payloadIndex].callback();
            }
            commit('removeItem', payloadIndex);
        }
        /*if (!getters['isStoreLoading'])
        {
            this.$nuxt.$loading.finish();
        }*/
    },
};

