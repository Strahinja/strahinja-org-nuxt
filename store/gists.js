export const state = () => ({
    gists: []
});

export const mutations = {
    addGist(state, payload)
    {
        state.gists.push(payload);
    }
};

export const getters = {
    gistById: state => filterGistId =>
    {
        const filteredGists = state.gists.filter(
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

