<template lang="pug">
    subpage(source-url)
        blog-post(v-if="document"
        :document="document")
</template>

<script>
export default {
    name: 'Cont',
    data()
    {
        return {
            document: {},
        };
    },
    computed: {
        slug()
        {
            return this && this.document && this.document.slug
                ? this.document.slug
                : '';
        }
    },
    async asyncData({ $content, params, error, store })
    {
        let document;
        try
        {
            document = await $content(`blog/${params.slug}`).fetch();
            //console.log('asyncData: document = ', document);
            if (!document)
            {
                error({ statusCode: 404, message: 'Чланак није пронађен' });
            }

            if (document.gistId)
            {
                try
                {
                    await store.dispatch('gists/loadGist', { gistId: document.gistId });
                    const gist = store.getters['gists/gistById'](document.gistId);
                    if (!gist)
                    {
                        throw 'Неуспешно учитавање';
                    }
                    document.gist = gist.data;
                    /*
                     *console.log('pages/cont/_slug.vue: loaded gist: ',
                     *            document.gist);
                     */
                }
                catch(err)
                {
                    error({ statusCode: 500,
                        message: `Гист ${document.gistId} не може да се учита` });
                }
            }
        }
        catch(err)
        {
            error({ statusCode: 500, message: err });
            //console.error('pages/cont/slug: ', err);
        }
        return {
            document,
        };
    }
};
</script>

<style lang="sass" scoped>
@import '~vuetify/src/styles/styles.sass'
@import '~/assets/sass/code.sass'
@import '~/assets/sass/markdown.sass'
</style>
