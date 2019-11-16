import gistIds from '../static/blog/blog-gist-ids.json';

export const state = () => ({
    list: []
});

export const mutations = {
    addGist(state, payload)
    {
        console.log('store/gists.js.addGist: payload = ', payload);
        if (!state.list.find(gist => gist.data.id == payload.data.id))
        {
            console.log('store/gists.js.addGist: adding');
            state.list.push(payload);
            console.log('store/gists.js.addGist: list after: ', state.list);
        }
        else
        {
            console.log('store/gists.js.addGist: already in list, not adding');
        }
    }
};

export const actions = {
    async loadGists({ dispatch, getters })
    {
        console.log('store/gists.js.loadGists: called');
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
        console.log('store/gists.js.loadGist[', gistId, ']: called');
        try
        {
            console.log('store/gists.js.loadGist: calling http...');
            const gist = await this.$http.$get(
                `https://api.github.com/gists/${gistId}`);
            console.log('store/gists.js.loadGist: gist = ', gist);
            if (gist)
            {
                console.log('store/gists.js.loadGist: gist != null, calling addGist');
                commit('addGist', {
                    gistId: gistId,
                    data: gist
                });
                return gist;
            }
        }
        catch (e)
        {
            console.log('store/gists.js.loadGist: http error: ', e);
        }
        finally
        {
            console.log('store/gists.js.loadGist: done');
        }
        return null;
    }
};

export const getters = {
    loadedGistsCount: state => state.list.length,
    gistById: state => gistId => state.list.find(
        gist => gist.data.id == gistId),
};

