<template lang="pug">
    three-dee-list(item-width="330"
    item-height="550"
    :items="portfolio")
        template(#header)
            subpage(source-url
            color="#fff")
                template(#header)
                    h1.display-1 Портфолио
                v-progress-linear.my-5(v-if="portfolioLoading",
                indeterminate,
                :active="portfolioLoading")
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

<style lang="sass">
.tdlist.xs
    margin-bottom: 50px
</style>

