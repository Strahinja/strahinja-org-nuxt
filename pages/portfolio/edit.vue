<template lang="pug">
    subpage
        h1.display-1 Уређивање портфолија
        v-list(rounded)
            v-list-item-group(v-model="selectedItem")
                transition-group(name="edit-portfolio-item-trans")
                    edit-portfolio-item(v-for="(item, itemIndex) in portfolio",
                    :key="item.link_id",
                    :item="item",
                    :item-index="itemIndex",
                    :item-count="portfolio.length",
                    @save-clicked="saveClicked(itemIndex)",
                    @move-up-clicked="moveUpClicked(itemIndex)",
                    @move-down-clicked="moveDownClicked(itemIndex)")
        v-speed-dial(v-model="speedDial",
        direction="top",
        fixed,
        bottom,
        right,
        open-on-hover,
        transition="slide-y-reverse-transition")
            v-btn(v-show="showFab",
            slot="activator",
            v-model="speedDial",
            color="accent",
            fab,
            light)
                transition(appear,
                name="speed-dial-trans")
                    v-icon(v-if="!speedDial") mdi-format-list-text
                    v-icon(v-if="speedDial") mdi-close
            v-btn(color="success",
            fab,
            small,
            dark,
            @click="addItemClicked()")
                v-icon mdi-plus
            v-btn(color="error",
            fab,
            small,
            dark,
            @click="removeItemClicked(portfolioCount)")
                v-icon mdi-delete

</template>

<script>
import Subpage from '~/components/Subpage';
import EditPortfolioItem from '~/components/EditPortfolioItem';
export default {
    name: 'PortfolioEdit',
    components: { EditPortfolioItem, Subpage },
    middleware: ['local-auth'],
    data()
    {
        return {
            speedDial: false,
            selectedItem: null,
            showFab: false,
        };
    },
    computed: {
        portfolio()
        {
            if (this && this.$store)
            {
                return this.$store.state.portfolio.list;
            }
            return [];
        },

        portfolioCount()
        {
            if (this && this.$store)
            {
                return this.$store.getters['portfolio/count'];
            }
            return 0;
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
    mounted()
    {
        this.$store.dispatch('portfolio/loadItems');
        this.showFab = true;
    },
    methods:
    {
        moveUpClicked(itemIndex)
        {
            console.log(`pages/portfolio/edit: moveUpClicked(${itemIndex})`);
            this.$store.dispatch('portfolio/moveItemUp', itemIndex);
        },

        moveDownClicked(itemIndex)
        {
            console.log(`pages/portfolio/edit: moveDownClicked(${itemIndex})`);
            this.$store.dispatch('portfolio/moveItemDown', itemIndex);
        },

        addItemClicked()
        {
            this.$store.dispatch('portfolio/addItem', {
                name: 'New Item',
                link_id: 'newitem',
                path: '/',
                description: 'Item description',
                short_desc: 'Short description',
                image: 'untitled.png',
                image_thumb: 'untitled_thumb.png',
            });
        },

        saveClicked(itemIndex)
        {
            // this.$store.dispatch('portfolio/updateItem', itemIndex);
        },

        removeItemClicked(itemIndex)
        {
            this.$store.dispatch('portfolio/removeItem', itemIndex);
        }
    },
};
</script>

<style lang="sass">
.edit-portfolio-item-trans-enter-active,
.edit-portfolio-item-trans-leave-active
    transition: all 1s

.edit-portfolio-item-trans-enter
    opacity: 0
    transform: scale(1.2, 1.2) translateY(10px)

.edit-portfolio-item-trans-leave-to
    opacity: 0
    transform: scale(.8, .8) translateX(10px)

.edit-portfolio-item-trans-move
    transition: all 1s ease-in-out

.speed-dial-trans-enter-active,
.speed-dial-trans-leave-active
    transition: all 1s

.speed-dial-trans-enter,
.speed-dial-trans-leave-to
    opacity: 0

</style>
