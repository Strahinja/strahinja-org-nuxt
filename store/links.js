export const state = () => ({
    list: [],
    listByCategories: [],
    categories: [],
    apiUrl: '/favorites',
    apiCategoriesUrl: '/categories?ct=favorite',
    numPages: 0,
    itemsPerPage: 12,
    itemCount: 0,
    pageNumber: 1,
    loadedInitially: false,
});

export const mutations = {
    setList(state, payload)
    {
        state.list = payload;
    },
    setCategories(state, payload)
    {
        state.categories = payload;
    },
    setListByCategories(state, payload)
    {
        state.listByCategories = payload;
    },
    setNumPages(state, payload)
    {
        state.numPages = payload;
    },
    setItemsPerPage(state, payload)
    {
        state.itemsPerPage = payload;
    },
    setItemCount(state, payload)
    {
        state.itemCount = payload;
    },
    setPageNumber(state, payload)
    {
        state.pageNumber = payload;
    },
    setLoadedInitially(state, payload)
    {
        state.loadedInitially = payload;
    },
};

export const getters = {
    apiPath: state => state.apiUrl,
    apiCategoriesPath: state => state.apiCategoriesUrl,
    itemCount: state => state.itemCount,
    numPages: state => state.numPages,
    itemsPerPage: state => state.itemsPerPage,
    pageNumber: state => state.pageNumber,
    offset: (state, getters) =>
        (getters['pageNumber'] - 1) * getters['itemsPerPage'],
    list: state => state.list,
    categories: state => state.categories,
    categoriesCount: state => state.categories.length,
    listByCategories: state => state.listByCategories,
    listByCategory: state => categoryId =>
        state.listByCategories.filter(cat =>
            cat.list.length>0 && cat.id === categoryId),
    loadedInitially: state => state.loadedInitially,
};

export const actions = {
    loadCategories({ commit, getters }, options =
    { callbackThen: () =>
    {}, callbackCatch: () =>
    {} })
    {
        this.$axios
            .$get(getters['apiCategoriesPath'])
            .then(res =>
            {
                if (res.data)
                {

                    if (res.code === 200)
                    {
                        commit('setCategories', res.data);
                        if (options.callbackThen) options.callbackThen();
                    }
                }
            })
            .catch(function(error)
            {
                console.log('store/links.js: ', error);
                if (options.callbackCatch) options.callbackCatch();
            });
    },

    arrangeAndSetListByCategories({ commit, getters }, options = {
        list: [],
        callbackThen: () =>
        {}
    })
    {
        let listByCat = [];
        for (let catIndex in getters['categories'])
        {
            listByCat.push({
                id: getters['categories'][catIndex].id,
                name: getters['categories'][catIndex].name,
                list: options.list.filter(lnk =>
                    lnk.idcategory === getters['categories'][catIndex].id
                )
            });
        }
        commit('setListByCategories',
               listByCat.filter(
                   cat => cat.list.length > 0
               ));
        if (options.callbackThen) options.callbackThen();
    },

    loadItems({ commit, dispatch, getters }, options =
    {
        byCat: false,
        callbackThen: () =>
        {},
        callbackCatch: () =>
        {}
    })
    {
        let count = getters['itemsPerPage'];
        let offset = getters['offset'];
        this.$axios
            .$get(
                getters['apiPath'] +
                    '?c=' +
                    count +
                    '&o=' +
                    offset +
                    (options.byCat ? '&sb=cat_id' : '')
            )
            .then(res =>
            {
                if (options.callbackThen) options.callbackThen();
                if (res.data)
                {
                    if (res.code === 200)
                    {
                        let itemCount = parseInt(res.num_rows);
                        commit('setNumPages', Math.ceil(
                            itemCount / count
                        ));
                        commit('setItemCount', itemCount);
                        if (options.byCat)
                        {
                            dispatch('arrangeAndSetListByCategories',
                                     { list: res.data }
                            );
                        }
                        else
                        {
                            commit('setList', res.data);
                        }
                    }
                }
            })
            .catch(function(error)
            {
                console.log('store/links.js: ', error);
                if (options.callbackCatch) options.callbackCatch();
            });
    },
    load({ dispatch, commit })
    {
        commit('setNumPages', 0);
        commit('setItemCount', 0);
        dispatch('loading/startLoading', {
            id: 'links'
        }, { root: true });
        dispatch('loadCategories')
            .then(() =>
            {
                dispatch('loadItems');
                dispatch('loadItems', {
                    byCat: true,
                    callbackThen: () =>
                    {
                        commit('setLoadedInitially', true);
                        dispatch('loading/stopLoading', {
                            id: 'links'
                        }, { root: true });
                    },
                    callbackCatch: () => dispatch('loading/stopLoading', {
                        id: 'links'
                    }, { root: true })
                });
            });
    }
};

