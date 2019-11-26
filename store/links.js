export const state = () => ({
    list: [],
    listByCategories: [],
    categories: [],
    apiLinks: process.env.VUE_APP_API_PATH + '/favorites',
    apiCategories:
        process.env.VUE_APP_API_PATH + '/categories?ct=favorite',
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
    apiPath: state => state.apiLinks,
    apiCategoriesPath: state => state.apiCategories,
    itemCount: state => state.itemCount,
    numPages: state => state.numPages,
    itemsPerPage: state => state.itemsPerPage,
    pageNumber: state => state.pageNumber,
    offset: (state, getters) =>
        (getters['pageNumber'] - 1) * getters['itemsPerPage'],
    list: state => state.list,
    categories: state => state.categories,
    categoriesCount: state => state.categories.length,
    nonemptyCategories: (state, getters) => state.categories.filter(
        (obj, catIndex) =>
            getters['listByCategory'](catIndex).length > 0
    ),
    listByCategories: state => state.listByCategories,
    listByCategory: state => categoryId =>
        state.listByCategories.filter(cat =>
            cat.id === categoryId),
    loadedInitially: state => state.loadedInitially,
};

export const actions = {
    loadCategories({ commit, getters }, options =
    { callbackThen: () =>
    {}, callbackCatch: () =>
    {} })
    {
        this.$http
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
            listByCat.push(options.list.filter(lnk =>
                lnk.idcategory === getters['categories'][catIndex].id
            ));
        }
        commit('setListByCategories',
               listByCat.filter(
                   cat => cat.length > 0
               ));
        if (options.callbackThen) options.callbackThen();
    },

    loadLinks({ commit, dispatch, getters }, options =
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
        this.$http
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
        });
        dispatch('loadCategories')
            .then(() =>
            {
                dispatch('loadLinks');
                dispatch('loadLinks', {
                    byCat: true,
                    callbackThen: () =>
                    {
                        commit('setLoadedInitially', true);
                        dispatch('loading/stopLoading', {
                            id: 'links'
                        });
                    },
                    callbackCatch: () => dispatch('loading/stopLoading', {
                        id: 'links'
                    })
                });
            });
    }
};

