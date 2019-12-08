export default function({ store })
{
    return store.dispatch('posts/loadPosts');
}

