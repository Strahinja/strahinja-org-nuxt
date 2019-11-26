<template>
    <v-container fluid>
        <v-row
            class="mt-3 mb-7"
            no-gutters>
            <v-col
                v-if="showBackButton"
                :sm="1"
                align="center"
                class="text-center hidden-xs-only"
                style="min-width: 60px;">
                <v-tooltip
                    v-if="showBackButton"
                    class="hidden-xs-only"
                    bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn
                            v-if="showBackButton"
                            fab depressed dark small
                            :to="parentUrl"
                            color="secondary"
                            class="hidden-xs-only text-center align-center mr-3
                               mt-1"
                            v-on="on">
                            <v-icon dark class="align-center">
                                mdi-arrow-left
                            </v-icon>
                        </v-btn>
                    </template>
                    <span>Назад на
                        {{ parentName }}
                    </span>
                </v-tooltip>
            </v-col>
            <v-col
                :cols="12"
                :sm="10">
                <v-row no-gutters>
                    <v-col
                        :cols="12" :md="4" class="mb-3"
                        :class="{
                            'text-center': $breakpoint.is.smAndDown,
                            'text-left': $breakpoint.is.mdAndUp
                        }">
                        <v-toolbar-title class="display-1">
                            Везе
                        </v-toolbar-title>
                    </v-col>
                    <v-col
                        :cols="12" :md="4" class="mb-3" :class="{'text-center':
                            $breakpoint.is.xsOnly}">
                        <v-pagination
                            v-model="pageNumber"
                            color="secondary"
                            :value="pageNumber"
                            :length="numPages"
                            total-visible="4"
                            @input="paginationChange()" />
                    </v-col>
                    <v-col
                        :cols="12" :md="4" class="mb-3"
                        :class="{
                            'text-center': $breakpoint.is.smAndDown,
                            'text-right': $breakpoint.is.mdAndUp
                        }">
                        <v-btn-toggle v-model="displayByCategory">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-btn :value="false" v-on="on">
                                        <v-icon>mdi-view-dashboard</v-icon>
                                        <span class="hidden-sm-and-down">Све везе</span>
                                    </v-btn>
                                </template>
                                <span>Све везе</span>
                            </v-tooltip>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-btn :value="true" v-on="on">
                                        <v-icon>mdi-shape</v-icon>
                                        <span class="hidden-sm-and-down">По категоријама</span>
                                    </v-btn>
                                </template>
                                <span>По категоријама</span>
                            </v-tooltip>
                        </v-btn-toggle>
                    </v-col>
                </v-row>

                <v-progress-linear
                    indeterminate
                    class="my-5"
                    :active="loading" />

                <div v-if="displayByCategory">
                    <v-container
                        v-for="(category, categoryIndex) in nonemptyCategories"
                        :key="categoryIndex"
                        class="px-0 mx-0"
                        no-gutters
                        fluid>
                        <v-row>
                            <v-col>
                                <v-subheader>{{ category.name }}</v-subheader>
                                <v-container
                                    grid-list-md class="px-0 mx-0" fluid
                                    no-gutters>
                                    <v-row
                                        :class="{'breakout-row': $breakpoint.is.smAndDown}">
                                        <v-col
                                            v-for="(item, itemIndex) in linksByCat[
                                                categoryIndex
                                            ]"
                                            :key="itemIndex"
                                            :cols="12"
                                            :sm="6"
                                            :md="4"
                                            class="mb-1">
                                            <link-item :item="item" :item-index="itemIndex" />
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-col>
                        </v-row>
                    </v-container>
                </div>
                <v-container v-else grid-list-md class="px-0 mx-0" no-gutters fluid>
                    <v-row>
                        <v-col
                            v-for="item in links"
                            :key="item.id"
                            :cols="12"
                            :sm="6"
                            :md="4"
                            class="mb-1">
                            <link-item
                                :expanded="$breakpoint.is.smAndUp ?
                                    true : false"
                                :item="item" :item-index="itemIndex" />
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import LinkItem from '~/components/LinkItem';

export default {
    name: 'Links',
    components: { LinkItem },
    middleware ({store})
    {
        store.commit('pages/setPageId', { newId:
            store.state.pages.routeIds.PAGE_LINKS });
    },
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
        }
    },
    head()
    {
        let globals = {
            title: this.page.title,
            description: this.page.text,
            url: 'http://strahinja.org' + this.page.url.path,
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

<style scoped></style>
