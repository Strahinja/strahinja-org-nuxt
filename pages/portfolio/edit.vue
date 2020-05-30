<template lang="pug">
    subpage(disable-scroll)
        h1.display-1 Уређивање портфолија
        v-list(rounded)
            v-list-item-group(v-model="selectedItem")
                transition-group(name="edit-portfolio-item-trans")
                    edit-portfolio-item(v-for="(item, itemIndex) in portfolio",
                    :key="item.link_id",
                    :item="item",
                    :item-count="portfolio.length",
                    @save-clicked="saveClicked(item.link_id)",
                    @delete-clicked="deleteClicked(item.link_id)",
                    @link-id-changed="changeLinkId(item.link_id, $event)",
                    @move-up-clicked="moveUpClicked(item.link_id)",
                    @move-down-clicked="moveDownClicked(item.link_id)")
        v-fab-transition
            v-btn(v-show="showFab",
            color="primary lighten-1",
            dark,
            fixed,
            bottom,
            right,
            fab,
            @click="addItemClicked()")
                v-icon mdi-plus
        //-v-speed-dial(v-model="speedDial",
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
//import Subpage from '~/components/Subpage';
//import EditPortfolioItem from '~/components/EditPortfolioItem';
export default {
    name: 'PortfolioEdit',
    //components: { EditPortfolioItem, Subpage },
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
        store.dispatch('portfolio/loadItems', { root: true });
    },
    created()
    {
        this.$store.dispatch('portfolio/loadItems', { root: true });
    },
    mounted()
    {
        this.$store.dispatch('portfolio/loadItems', { root: true });
        this.showFab = true;
    },
    methods:
    {
        moveUpClicked(linkId)
        {
            this.$store.dispatch('portfolio/moveItemUp', linkId,
                                 { root: true });
        },

        moveDownClicked(linkId)
        {
            this.$store.dispatch('portfolio/moveItemDown', linkId,
                                 { root: true });
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
            }, { root: true });
        },

        saveClicked(linkId)
        {
            this.$store.dispatch('portfolio/saveItem', {
                linkId,
                success: () =>
                {
                    this.$store.dispatch('portfolio/saveOrdering', {
                        error: (result) =>
                        {
                            if (result.message)
                            {
                                if (this && typeof this.$toast === 'function')
                                {
                                    this.$toast(result.message, {
                                        icon: 'mdi mdi-alert',
                                    });
                                }
                                else
                                {
                                    console.error(result.message);
                                }
                            }
                        }
                    }, { root: true });
                },
                error: (result) =>
                {
                    if (result.message)
                    {
                        if (this && typeof this.$toast === 'function')
                        {
                            this.$toast(result.message, {
                                icon: 'mdi mdi-alert'
                            });
                        }
                        else
                        {
                            console.error(result.message);
                        }
                    }
                }
            }, { root: true });
        },

        deleteClicked(linkId)
        {
            this.$store.dispatch('portfolio/removeItem', {
                linkId,
                error: (result) =>
                {
                    if (result.message)
                    {
                        if (this && typeof this.$toast === 'function')
                        {
                            this.$toast(result.message, {
                                icon: 'mdi mdi-alert'
                            });
                        }
                        else
                        {
                            console.error(result.message);
                            //console.log(this);
                        }
                    }
                }
            }, { root: true });
        },

        changeLinkId(from, to)
        {
            this.$store.dispatch('portfolio/changeLinkId',
                                 { from, to }, { root: true });
        },
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
