export const state = () => ({
    article: {},
    apiUrl: '/article/{0}',
    apiSerializeUrl: '/article/{0}/serialize',
    apiRemoveUrl: '/article/{0}/delete',
});

export const mutations = {
    setArticle(state, payload)
    {
        state.article = payload;
    },
};

export const getters = {
    article: state => state.article,
    apiPath: state => linkId => state.apiUrl.replace('{0}', linkId),
    apiSerializePath: state => linkId => state.apiSerializeUrl.replace('{0}', linkId),
    apiOrderingPath: state => linkId => state.apiOrderingUrl.replace('{0}', linkId),
};

export const actions = {
    async loadArticle({ commit, dispatch, getters }, payload)
    {
        if (payload && payload.linkId)
        {
            //await dispatch('loading/startLoading', { id: 'article', },
            //{ root: true });

            try
            {
                let res = await this.$axios.$get(getters['apiPath'](payload.linkId));

                //await dispatch('loading/stopLoading', { id: 'article', },
                //{ root: true });

                if (res && res.code == 200)
                {
                    commit('setArticle', res.data);
                }
                else
                {
                    let msg = '';
                    if (res.code)
                    {
                        msg += res.code;
                    }
                    commit('setArticle', {});
                    this.$toast.error(`Грешка ${msg}`, { icon: 'mdi mdi-alert' });
                }
            }
            catch(err)
            {
                commit('setArticle', {});
                //await dispatch('loading/stopLoading', { id: 'article', },
                //{ root: true });
                this.$toast.error(err, { icon: 'mdi mdi-alert' });

            }
        }
    }
};

