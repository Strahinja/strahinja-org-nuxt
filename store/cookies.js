export const cookieNames = {
    STRAHINJA_ORG_COOKIE_CONSENT :  'strahinja-org-cookie-consent',
    STRAHINJA_ORG_THEME          :  'strahinja-org-theme',
};

export const state = () => ({
    list: [],
});

export const getters = {
    list: state => state.list,
    getCookie: state => cookieName =>
        state.list.find(cookie => cookie.name == cookieName),
    getCookieIndex: state => cookieName =>
        state.list.findIndex(cookie => cookie.name == cookieName),
};

export const mutations = {
    setCookie(state, { index, value })
    {
        state.list[index].value = value;
    },
    addCookie(state, { name, value })
    {
        state.list.push({
            name,
            value,
        });
    },
    removeCookie(state, { cookieIndex })
    {
        state.list.splice(cookieIndex, 1);
    },
};

export const actions = {
    initCookie({ commit, getters }, {
        name,
        value,
    })
    {
        let index = getters['getCookieIndex'](name);
        if (index != -1)
        {
            commit('setCookie', {
                index,
                value,
            });
        }
        else
        {
            commit('addCookie', {
                name,
                value,
            });
        }
    },
    async setCookie({ dispatch }, {
        name,
        value,
    })
    {
        await dispatch('initCookie', {
            name,
            value,
        });
        this.$cookies.set(name, value, {
            maxAge: 15 * 365 * 24 * 60 * 60,
            sameSite: 'Strict',
        });
    },
    initKnownCookies({ dispatch })
    {
        Object.keys(cookieNames).forEach(async name =>
        {
            await dispatch('initCookie', {
                name: cookieNames[name],
                value: this.$cookies.get(cookieNames[name]),
            });
        });
    },
};

