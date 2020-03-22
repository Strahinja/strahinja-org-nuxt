<template lang="pug">
    v-container(fluid)
        v-row.mt-3.mb-7(no-gutters)
            v-col.text-center.hidden-xs-only(v-if="showBackButton",
            :sm="1",
            align="center",
            style="min-width: 60px;")
                v-tooltip.hidden-xs-only(v-if="showBackButton",
                bottom)
                    template(v-slot:activator="{ on }")
                        v-btn.hidden-xs-only.text-center.align-center.mr-3.mt-1(
                        v-if="showBackButton",
                        fab,
                        depressed,
                        dark,
                        small,
                        :to="parentUrl",
                        color="secondary",
                        v-on="on")
                            v-icon.align-center(dark) mdi-arrow-left
                    span Назад на {{ parentName }}
            v-col(:cols="12",
            :sm="10")
                h3.display-1 Уређивање портфолија
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
                    v-icon(v-if="!speedDial") mdi-palette
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
            dark)
                v-icon mdi-delete

</template>

<script>
import EditPortfolioItem from '~/components/EditPortfolioItem';
export default {
    name: 'PortfolioEdit',
    components: { EditPortfolioItem },
    middleware: ['auth'],
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
        page()
        {
            if (this && this.$store)
            {
                return this.$store.getters['pages/pageById'](
                    this.$store.state.pages.pageId);
            }
            else
            {
                return null;
            }
        },
        parentUrl()
        {
            if (this && this.page)
            {
                return this.page.parentUrl;
            }
            return '/';
        },
        parentName()
        {
            if (this && this.page)
            {
                return this.page.parentName;
            }
            return 'почетну страницу';
        },
        showBackButton()
        {
            return this.$breakpoint.is.smAndUp;
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
    },
    head()
    {
        let globals = {
            title: this.page.title,
            description: this.page.text,
            url: 'https://strahinja.org' + this.page.url.path,
            image: this.page.image,
            imageAlt: this.page.imageAlt,
        };
        return {
            meta: [
                { hid: 'og:url', name: 'og:url', property: 'og:url', content: globals.url },
                { hid: 'og:title', name: 'og:title', property: 'og:title', content: globals.title },
                { hid: 'og:description', name: 'og:description', property: 'og:description', content: globals.description },
                { hid: 'og:image', name: 'og:image', property: 'og:image', content: globals.image},
                { hid: 'og:image:alt', name: 'og:image:alt', property: 'og:image:alt', content: globals.imageAlt },
                { hid: 'twitter:url', name: 'twitter:url', content: globals.url },
                { hid: 'twitter:title', name: 'twitter:title', content: globals.title },
                { hid: 'twitter:description', name: 'twitter:description', content: globals.description },
                { hid: 'twitter:image', name: 'twitter:image', content:
                    globals.image},
                { hid: 'name', name: 'name', itemprop: 'name', content: globals.title },
                { hid: 'description', name: 'description', itemprop: 'description', content: globals.description },
                { hid: 'image', name: 'image', itemprop: 'image', content: globals.image},
            ],
            link: [
                { hid: 'canonical', rel: 'canonical', href: globals.url }
            ],
            title: globals.title,
            description: globals.description,
        };
    }
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
