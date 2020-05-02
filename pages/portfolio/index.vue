<template lang="pug">
    subpage(:splash="true",
    :source-url="true",
    :source-url-light="true")
        template(#header)
            h1.display-1 Портфолио
        v-progress-linear.my-5(v-if="portfolioLoading",
        indeterminate=true,
        :active="portfolioLoading")
        template(#outside-content)
            fancy-grid(:items="portfolio")
</template>

<script>
import Subpage from '~/components/Subpage';
import FancyGrid from '~/components/FancyGrid';

export default {
    name: 'Portfolio',
    components: { Subpage, FancyGrid },
    computed:
    {
        portfolio()
        {
            if (this && this.$store)
            {
                return this.$store.getters['portfolio/list'];
            }
            return [];
        },
        portfolioLoading()
        {
            return this && this.$store && this.$store.getters ?
                this.$store.getters['loading/isLoading']('portfolio') :
                true;
        },
    },
    fetch({ store })
    {
        store.dispatch('portfolio/loadItems');
    },
    created()
    {
        this.$store.dispatch('portfolio/loadItems');
    },
};
</script>

