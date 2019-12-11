import gistIds from '../static/blog/blog-gist-ids.json';

export const state = () => ({
    list: [],
    debug: process.env.VUE_APP_MODE == 'staging',
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
        gist => gist.data.id == gistId),
    debug: state => state.debug,
};

export const actions = {
    async loadGists({ dispatch, getters })
    {
        for (let gistId of gistIds)
        {
            if (!getters['gistById'](gistId))
            {
                await dispatch('loadGist', { gistId });
            }
        }
    },
    async loadGist({ commit, getters }, { gistId })
    {
        try
        {
            let debug = getters['debug'];
            let gist = null;
            if (!debug)
            {
                gist = await this.$axios.$get(
                    `https://api.github.com/gists/${gistId}`);
                if (gist)
                {
                    commit('addGist', {
                        gistId: gistId,
                        data: gist
                    });
                    return gist;
                }
            }
            else
            {
                commit('addGist', {
                    gistId: gistId,
                    data: {}
                });
                return {};
            }
        }
        catch (e)
        {
            console.log('store/gists.js.loadGist: ', e);
        /*commit('addGist', {
            gistId: gistId,
            data: {}
        });
        return {};*/
        }
        return null;
    }
};

