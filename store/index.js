import gistIds from '../static/blog/blog-gist-ids.json';

export const actions = {
    async nuxtServerInit({ commit }, { store })
    {
        for (let gistId of gistIds)
        {
            if (!store.getters['gists/gistById'](gistId))
            {
                const gist = await this.$axios.get(//`https://gist.github.com/${gistId}.json`);
                    `https://api.github.com/gists/${gistId}`);
                if (gist && gist.data)
                {
                    commit('gists/addGist', {
                        gistId: gistId,
                        data: gist.data
                    });
                }
            }
        }
    }
};

