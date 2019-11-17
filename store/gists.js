import gistIds from '../static/blog/blog-gist-ids.json';

export const state = () => ({
    list: []
});

export const mutations = {
    addGist(state, payload)
    {
        state.list.push(payload);
    }
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
    async loadGist({ commit }, { gistId })
    {
        try
        {
            const gist = await this.$http.$get(
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
        catch (e)
        {
            console.error('store/gists.js.loadGist: http error: ', e);
        }
        return null;
    }
};

export const getters = {
    loadedGistsCount: state => state.list.length,
    gistById: state => gistId => state.list.find(
        gist => gist.data.id == gistId),
};

