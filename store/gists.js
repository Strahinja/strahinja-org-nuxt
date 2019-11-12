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
    loadGists({ dispatch, rootGetters })
    {
        for (let gistId of gistIds)
        {
            if (!rootGetters['gists/gistById'](gistId))
            {
                dispatch('gists/loadGist', { gistId });
            }
        }
    },
    async loadGist({ commit }, { gistId })
    {
        const gist = await this.$axios.get(
            `https://api.github.com/gists/${gistId}`);
        if (gist && gist.data)
        {
            commit('gists/addGist', {
                gistId: gistId,
                data: gist.data
            });
        }
    }
};

export const getters = {
    loadedGistsCount: state => state.list.length,
    gistById: state => filterGistId =>
    {
        const filteredGists = state.list.filter(
            gistToCompare => gistToCompare.gistId == filterGistId);
        if (filteredGists.length>0)
        {
            return filteredGists[0];
        }
        else
        {
            return null;
        }
    }
};

