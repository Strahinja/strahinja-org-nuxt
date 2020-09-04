<template lang="pug">
    subpage(
    source-url)
        template(#header)
            h1.display-1 Портфолио
        v-progress-linear.my-5(v-if="portfolioLoading",
        indeterminate,
        :active="portfolioLoading")
        template(#outside-content)
            three-dee-list(item-width="400"
            item-height="500"
            :items="portfolio")
</template>

<script>
export default {
    name: 'Portfolio',
    data()
    {
        return {
            portfolio: [],
        };
    },
    computed:
    {
        portfolioLoading()
        {
            return this && this.$store && this.$store.getters
                ? this.$store.getters['loading/isLoading']('portfolio')
                : true;
        },
    },
    async asyncData({ store })
    {
        await store.dispatch('loading/clearLoading', null, { root: true });
        await store.dispatch('portfolio/loadItems',
                             null, { root: true });
        return {
            portfolio: store.getters['portfolio/list'],
        };
    },
    async mounted()
    {
        await this.$store.dispatch('loading/clearLoading', null, { root: true });
    },
};
</script>

