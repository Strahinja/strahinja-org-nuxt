export const state = () => ({
    list: []
});

export const mutations = {
    addPost(state, payload)
    {
        if (!state.list.includes(payload))
        {
            state.list.push(payload);
        }
    },
    addPosts(state, payload)
    {
        let postsToAdd = payload.filter(item => !state.list.includes(item));
        state.list = state.list.concat(postsToAdd);
    },
    sortPosts(state)
    {
        state.list.sort((post1, post2) =>
        {
            return post1.frontmatter.date >
                post2.frontmatter.date ? -1 : 1;
        });
    }
};

export const actions = {
    async loadPosts({ commit, getters, rootGetters })
    {
        if (getters['postCount']==0)
        {
            const resolve = await require.context('~/static/blog', true, /\.md$/);
            var posts = [];
            await resolve.keys().map(key =>
            {
                return {
                    name: key,
                    file: resolve(key)
                };
            }).forEach(async fileObj =>
            {
                const attr = fileObj.file.attributes;
                var myParams = {};
                if (attr && attr.extraComponent &&
                attr.extraComponent == 'Gist' &&
                attr.extraComponentParams &&
                attr.extraComponentParams.gistId)
                {
                    const gistId = attr.extraComponentParams.gistId;
                    const filteredGist = rootGetters['gists/gistById'](gistId);
                    myParams = {...myParams, ...attr.extraComponentParams};
                    if (filteredGist)
                    {
                        myParams.gist = filteredGist.data;
                    }
                }
                posts.push({
                    frontmatter: {
                        colors: attr.colors,
                        date: attr.date,
                        categories: attr.categories,
                        tags: attr.tags,
                        description: attr.description,
                        image: attr.image,
                        imageAlt: attr.imageAlt,
                        id: attr.id,
                        name: fileObj.name
                            .replace(/\.\//, '').replace(/\.md$/, ''),
                        related: attr.related,
                        title: attr.title,
                    },
                    renderFunc: fileObj.file.vue.render,
                    staticRenderFuncs: fileObj.file.vue.staticRenderFns,
                    extraComponent: attr.extraComponent,
                    extraComponentParams: myParams
                });
            });
            commit('addPosts', posts);
        }
        commit('sortPosts');
        return getters['all'];
    }
};

export const getters = {
    all: state => state.list,
    postBySlug: state => slug =>
    {
        return state.list.find(post => post.frontmatter.name == slug);
    },
    postsByTag: state => tag =>
    {
        return state.list.filter(
            postToCompare => postToCompare.frontmatter.tags.indexOf(tag) != -1);
    },
    postsBySearchTerm: state => searchTerm =>
    {
        return state.list.filter(
            postToCompare => postToCompare.frontmatter.tags.indexOf(searchTerm) != -1
            /*|| new RegExp(searchTerm).exec(postToCompare.renderFunc)*/);
    },
    postCount: state => state.list.length
};

