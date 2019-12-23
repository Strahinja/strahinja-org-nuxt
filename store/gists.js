import gistIds from '../static/blog/blog-gist-ids.json';

export const state = () => ({
    list: [],
    debug: process.env.VUE_APP_MODE == 'staging',
    cacheDir: 'static/blog/gist-cache',
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
    cacheDir: state => state.cacheDir,
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
        var fs = require('fs');
        let cacheFileName = getters['cacheDir'] + `/${gistId}.json`;
        //console.log('store/gists: cacheFileName = ', cacheFileName);
        let gist = null;
        try
        {
            gist = fs.readFileSync(cacheFileName);
        }
        catch(e)
        {
            console.error('store/gists: readFileSync error: ', e);
        }
        if (gist)
        {
            //console.log('store/gists: readFileSync = ', gist);
            gist = JSON.parse(gist);
            //console.log('store/gists: JSON.parse = ', gist);
            commit('addGist', {
                gistId: gistId,
                data: gist,
            });
            return gist;
        }
        //console.log(`store/gists: Gist ${gistId} not cached, fetching by axios instead`);
        try
        {
            let debug = getters['debug'];
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
                    try
                    {
                        fs.writeFileSync(cacheFileName, JSON.stringify(gist));
                    }
                    catch(e)
                    {
                        console.error('store/gists: writeFileSync error: ', e);
                    }
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

