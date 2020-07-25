export const cookieNames = {
    COOKIE_STRAHINJA_ORG_COOKIE_CONSENT :  'strahinja-org-cookie-consent',
    COOKIE_STRAHINJA_ORG_THEME          :  'strahinja-org-theme',
};

export const state = () => ({
    list: [],
});

export const getters = {
    list: state => state.list,
    findIndexById: state => cookieId =>
        state.list.findIndex(cookie => cookie.id == cookieId),
    cookieById: state => cookieId =>
        state.list.find(cookie => cookie.id == cookieId),
    cookieValueById: state => (cookieId, valueIfNull) =>
    {
        const cookie = state.list.find(cookie => cookie.id == cookieId);
        return cookie ? cookie.value : valueIfNull;
    },
};

export const mutations = {
    addCookie(state, { id, value })
    {
        state.list.push({ id, value });
    },
    setCookie(state, { index, value })
    {
        state.list[index].value = value;
    },
};

export const actions = {
    loadCookies({ commit, getters })
    {
        Object.values(cookieNames).forEach(id =>
        {
            const value = this.$cookies.get(id);
            const index = getters['findIndexById'](id);
            if (index == -1)
            {
                commit('addCookie', { id, value });
            }
            else
            {
                commit('setCookie', { index, value });
            }
        });
    },
    setCookie({ commit, getters }, { id, value })
    {
        const index = getters['findIndexById'](id);
        this.$cookies.set(id, value, {
            maxAge: 15 * 365 * 24 * 60 * 60,
            path: '/',
            sameSite: 'Strict',
        });
        if (index == -1)
        {
            commit('addCookie', { id, value });
        }
        else
        {
            commit('setCookie', { index, value });
        }
    },
};

