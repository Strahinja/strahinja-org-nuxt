export const state = () => ({
    list: []
});

export const mutations = {
    addPost(state, payload)
    {
        state.list.push(payload);
    },
    addPosts(state, payload)
    {
        state.list.concat(payload);
    }
};

export const actions = {
    async loadPosts({ commit, rootGetters })
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
        posts.sort((post1, post2) =>
        {
            return post1.frontmatter.date >
                post2.frontmatter.date ? -1 : 1;
        });
        commit('addPosts', posts);
    }
};

export const getters = {
    postBySlug: state => slug =>
    {
        const filteredPosts = state.list.filter(
            postToCompare => postToCompare.name == slug);
        if (filteredPosts.length>0)
        {
            return filteredPosts[0];
        }
        else
        {
            return null;
        }
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
    }
};

