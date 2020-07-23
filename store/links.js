export const state = () => ({
    list: [],
    listByCategories: [],
    categories: [],
    apiUrl: '/favorites?c={0}&o={1}{2}',
    apiCategoriesUrl: '/categories?ct=favorite',
    apiThumbnailsUrl: '/thumbnail/{0}',
    apiThumbnailCacheUrl: '/img/thumbnails/{0}.jpg',
    thumbnailLoadingQueue: [],
    numPages: 0,
    itemsPerPage: 12,
    count: 0,
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
    setCount(state, payload)
    {
        state.count = payload;
    },
    setPageNumber(state, payload)
    {
        state.pageNumber = payload;
    },
    setLoadedInitially(state, payload)
    {
        state.loadedInitially = payload;
    },
    setThumbnail(state, { id, image })
    {
        state.list.find(item => item.id===id).thumbnail = image;
    },
    addToThumbnailLoadingQueue(state, { url })
    {
        state.thumbnailLoadingQueue.push(url);
    },
    removeFromThumbnailLoadingQueue(state, { url })
    {
        state.thumbnailLoadingQueue.splice(
            state.thumbnailLoadingQueue.indexOf(url), 1);
    },
};

export const getters = {
    apiPath: state => (count, offset, byCat) =>
        state.apiUrl
            .replace('{0}', count)
            .replace('{1}', offset)
            .replace('{2}', byCat ? '&sb=cat_id' : ''),
    apiCategoriesPath: state => state.apiCategoriesUrl,
    apiThumbnailsPath: state => url => state.apiThumbnailsUrl
        .replace('{0}', encodeURIComponent(url.replace('/', '#'))),
    apiThumbnailsCachePath: state => md5 =>
        md5 ? state.apiThumbnailsCacheUrl.replace('{0}', md5) : '',
    count: state => state.count,
    numPages: state => state.numPages,
    itemsPerPage: state => state.itemsPerPage,
    itemById: state => itemId => state.list.find(item => item.id === itemId),
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
    async loadCategories({ commit, getters })
    {
        try
        {
            const res = await this.$axios.$get(getters['apiCategoriesPath']);
            if (res.data && res.code === 200)
            {
                commit('setCategories', res.data);
            }
        }
        catch(err)
        {
            console.error('store/links.js: ', err);
        }
    },

    arrangeAndSetListByCategories({ commit, getters }, { list })
    {
        let listByCat = [];
        const categories = getters['categories'];
        categories.forEach(({ id, name }) =>
        {
            listByCat.push({
                id,
                name,
                list: list.filter(lnk => lnk.idcategory === id)
            });
        });
        commit('setListByCategories',
               listByCat.filter(
                   cat => cat.list.length > 0
               ));
    },

    async loadItems({ commit, dispatch, getters }, byCat)
    {
        const itemsPerPage = getters['itemsPerPage'];
        const offset = getters['offset'];
        try
        {
            const res = await this.$axios.$get(
                getters['apiPath'](itemsPerPage, offset, byCat)
            );
            if (res.data && res.code === 200)
            {
                const resultItemCount = parseInt(res.num_rows);
                commit('setNumPages', Math.ceil(
                    resultItemCount / itemsPerPage
                ));
                commit('setCount', resultItemCount);
                if (byCat)
                {
                    await dispatch('arrangeAndSetListByCategories',
                                   { list: res.data }
                    );
                }
                else
                {
                    commit('setList', res.data);
                }
            }
        }
        catch(err)
        {
            console.error('store/links.js: ', err);
        }
    },
    async load({ dispatch, commit })
    {
        commit('setNumPages', 0);
        commit('setItemCount', 0);
        await dispatch('loading/startLoading', {
            id: 'links'
        }, { root: true });
        await dispatch('loadCategories');
        await dispatch('loadItems');
        try
        {
            await dispatch('loadItems', {
                byCat: true,
            });
            commit('setLoadedInitially', true);
        }
        catch(err)
        {
            console.error('store/links.js: ', err);
        }
        await dispatch('loading/stopLoading', {
            id: 'links'
        }, { root: true });
    },
    async loadThumbnail({ dispatch, commit, getters }, { id, url })
    {
        let item = getters['itemById'](id);
        if (item)
        {
            if (item.thumbnail)
            {
                return item.thumbnail;
            }

            dispatch('loading/startLoading', {
                id: 'thumbnail'+id
            }, { root: true });
            try
            {
                let md5 = await this.$axios.get(getters['apiThumbnailsPath'](url));
                let imagePath = getters['apiThumbnailsCachePath'](md5);
                dispatch('loading/stopLoading', {
                    id: 'thumbnail'+id
                }, { root: true });
                commit('setThumbnail', { id, image: imagePath });
                return imagePath;
            }
            catch(err)
            {
                dispatch('loading/stopLoading', {
                    id: 'thumbnail'+id
                }, { root: true });
                console.error('store/links: ', err);
            }
        }
        return null;
    },
};

