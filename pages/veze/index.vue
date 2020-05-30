<template lang="pug">
    subpage
        v-row(no-gutters)
            v-col.mb-3(:cols="12",
            :md="4",
            :class=`{
                'text-center': $breakpoint.is.smAndDown,
                'text-left': $breakpoint.is.mdAndUp
            }`)
                v-toolbar-title.display-1 Везе
            v-col.mb-3(:cols="12",
            :md="4",
            :class=`{
                'text-center': $breakpoint.is.xsOnly
            }`)
                v-pagination(v-model="pageNumber",
                color="secondary",
                :value="pageNumber",
                :length="numPages",
                total-visible="4",
                @input="paginationChange()")
            v-col.mb-3(:cols="12",
            :md="4",
            :class=`{
                'text-center': $breakpoint.is.smAndDown,
                'text-right': $breakpoint.is.mdAndUp
            }`)
                v-btn-toggle(v-model="displayByCategory")
                    v-tooltip(bottom=true)
                        template(v-slot:activator="{ on }")
                            v-btn(:value="false",
                            v-on="on")
                                v-icon mdi-view-dashboard
                                span.hidden-sm-and-down Све везе
                        span Све везе
                    v-tooltip(bottom=true)
                        template(v-slot:activator="{ on }")
                            v-btn(:value="true",
                            v-on="on")
                                v-icon mdi-shape
                                span.hidden-sm-and-down По категоријама
                        span По категоријама

        v-progress-linear.my-5(indeterminate=true,
        :active="loading")

        div(v-if="displayByCategory")
            v-container.px-0.mx-0(v-for="category in linksByCat",
            :key="category.id",
            no-gutters=true,
            fluid=true)
                v-row
                    v-col
                        v-subheader {{ category.name }}
                        v-container.px-0.mx-0(grid-list-md=true,
                        fluid=true,
                        no-gutters=true)
                            v-row
                                v-col.mb-1(v-for="(item, itemIndex) in category.list",
                                :key="item.id",
                                :cols="12",
                                :sm="6",
                                :md="4")
                                    link-item(
                                    :expanded="$breakpoint.is.smAndUp ? true : false",
                                    :item="item",
                                    :item-index="itemIndex")
                            //-(:class=`{
                            //-'breakout-row': $breakpoint.is.smAndDown
                            //-}`)

        v-container.px-0.mx-0(v-else=true,
        grid-list-md=true,
        no-gutters=true,
        fluid=true)
            v-row
                v-col.mb-1(v-for="(item, itemIndex) in links",
                :key="item.id",
                :cols="12",
                :sm="6",
                :md="4")
                    link-item(:expanded="$breakpoint.is.smAndUp ? true : false"
                    :item="item",
                    :item-index="itemIndex")
</template>

<script>
//import Subpage from '~/components/Subpage';
//import LinkItem from '~/components/LinkItem';

export default {
    name: 'Links',
    //components: { LinkItem, Subpage },
    data()
    {
        return {
            displayByCategory: false,
            itemsPerPage: 12,
            pageNumber: 1,
        };
    },
    computed:
    {
        numPages()
        {
            if (this && this.$store)
            {
                return this.$store.getters['links/numPages'];
            }
            return 0;
        },
        links()
        {
            if (this && this.$store)
            {
                return this.$store.getters['links/list'];
            }
            return [];
        },
        linksByCategory(categoryId)
        {
            if (this && this.$store)
            {
                return this.$store.getters['links/listByCategory'](categoryId).list;
            }
            return [];
        },
        linksByCat()
        {
            if (this && this.$store)
            {
                return this.$store.getters['links/listByCategories'];
            }
            return [];
        },
        categories()
        {
            if (this && this.$store)
            {
                return this.$store.getters['links/categories'];
            }
            return [];
        },
        nonemptyCategories()
        {
            if (this && this.$store)
            {
                return this.$store.getters['links/nonemptyCategories'];
            }
            return [];
        },
        loading()
        {
            if (this && this.$store)
            {
                return this.$store.getters['loading/isStoreLoading'];
            }
            return true;
        },
    },
    fetch({ store })
    {
        if (!store.getters['links/loadedInitially'])
        {
            store.commit('links/setItemsPerPage', 12);
            store.commit('links/setPageNumber', 1);
            store.dispatch('links/load');
        }
    },
    created()
    {
        if (!this.$store.getters['links/loadedInitially'])
        {
            this.$store.commit('links/setItemsPerPage', 12);
            this.$store.commit('links/setPageNumber', 1);
            this.$store.dispatch('links/load');
        }
    },
    methods: {
        paginationChange()
        {
            this.$store.commit('links/setItemsPerPage', this.itemsPerPage);
            this.$store.commit('links/setPageNumber', this.pageNumber);
            this.$store.dispatch('links/load');
        },
    },
};
</script>

