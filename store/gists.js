import gistIds from '../content/blog/blog-gist-ids.json';

export const state = () => ({
    list: [],
    apiUrl: '/gists/',
});

export const mutations = {
    addGist(state, payload)
    {
        state.list.push(payload);
    }
};

export const getters = {
    loadedGistsCount: state => state.list.length,
    gistById: state => gistId => state.list.find(
        gist => gist.data.id === gistId),
    apiPath: state => state.apiUrl,
};

export const actions = {
    async loadItems({ dispatch, getters })
    {
        dispatch('loading/startLoading', {
            id: 'gists',
        }, { root: true });
        for (let gistId of gistIds)
        {
            if (!getters['gistById'](gistId))
            {
                await dispatch('loadGist', { gistId });
            }
        }
        dispatch('loading/stopLoading', {
            id: 'gists'
        }, { root: true });
    },

    async loadGist({ commit, dispatch, getters }, { gistId })
    {
        if (!getters['gistById'](gistId))
        {
            try
            {
                let res = await this.$axios.$get(getters['apiPath'] + gistId);

                dispatch('loading/stopLoading', {
                    id: 'gists'
                }, { root: true });
                if (res.data && res.code === 200)
                {
                    commit('addGist', {
                        gistId,
                        data: res.data,
                    });
                }
            }
            catch(error)
            {
                dispatch('loading/stopLoading', {
                    id: 'gists'
                }, { root: true });
                console.error(`store/gists[${gistId}]: `, error);
            }
        }
    },
};

