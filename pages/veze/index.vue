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
                            :to="$store.state.pages.pages[$store.state.pages.pageIndex].parentUrl"
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
                        {{
                            $store.state.pages.pages[
                                $store.state.pages.pageIndex
                            ].parentName
                        }}
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
                            v-model="page"
                            color="secondary"
                            :value="page"
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
                            v-for="(item, itemIndex) in links"
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
</template>

<script>
import axios from 'axios';
import LinkItem from '~/components/LinkItem';

export default {
    name: 'Links',
    components: { LinkItem },
    head()
    {
        let idx = this.$store.state.pages.pageIndex;
        let globals = {
            title: this.$store.state.pages.pages[idx].title,
            description: this.$store.state.pages.pages[idx].text,
            url: 'http://strahinja.org/' + this.$store.state.pages.pages[idx].url.path,
            image: this.$store.state.pages.pages[idx].image,
            imageAlt: this.$store.state.pages.pages[idx].imageAlt,
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
    data()
    {
        return {
            pageIndex: this.$store.state.pages.routeIds.PAGE_LINKS,
            apiLinks: process.env.VUE_APP_API_PATH + '/favorites',
            apiCategories:
                process.env.VUE_APP_API_PATH + '/categories?ct=favorite',
            links: [],
            linksByCat: [],
            categories: [],
            nonemptyCategories: [],
            linksByCategories: [],
            displayByCategory: false,
            numPages: 0,
            itemsPerPage: 12,
            page: 1,
            loading: false,
        };
    },
    computed: {
        showBackButton()
        {
            return this.$breakpoint.is.smAndUp;
        }
    },
    updated()
    {
        this.setpageIndex();
    },
    mounted()
    {
        this.setpageIndex();
    },
    created()
    {
        this.loading = true;
        this.getCategories(
            () =>
            {
                this.getLinks();
                this.getLinks(
                    this.itemsPerPage,
                    0,
                    true,
                    () =>
                    {
                        this.loading = false;
                    },
                    () =>
                    {
                        this.loading = false;
                    }
                );
            },
            () =>
            {
                this.loading = false;
            }
        );
    },
    methods: {
        setpageIndex()
        {
            this.$store.commit('pages/setPageIndex', { newIndex:
                this.$store.state.pages.routeIds.PAGE_LINKS });
        },
        getLinks(
            count = this.itemsPerPage,
            offset = 0,
            byCat = false,
            callbackThen = () =>
            {},
            callbackCatch = () =>
            {}
        )
        {
            axios
                .get(
                    this.apiLinks +
                        '?c=' +
                        count +
                        '&o=' +
                        offset +
                        (byCat ? '&sb=cat_id' : '')
                )
                .then(data =>
                {
                    if (callbackThen) callbackThen();
                    if (data.data)
                    {
                        if (data.data.data)
                        {
                            if (data.data.code === 200)
                            {
                                this.numPages = Math.ceil(
                                    data.data.num_rows / this.itemsPerPage
                                );
                                if (byCat)
                                {
                                    this.linksByCategories = data.data.data;
                                    this.arrangeLinksByCat();
                                    this.nonemptyCategories = this.categories.filter(
                                        (obj, catIndex) =>
                                        {
                                            return (
                                                this.linksByCat[catIndex]
                                                    .length > 0
                                            );
                                        }
                                    );
                                    this.linksByCat = this.linksByCat.filter(
                                        cat =>
                                        {
                                            return cat.length > 0;
                                        }
                                    );
                                }
                                else
                                {
                                    this.links = data.data.data;
                                }
                                /*console.log('finally:');
                                console.log('categories:', this.categories);
                                console.log('links:', this.links);*/
                            }
                        }
                    }
                })
                .catch(function(data)
                {
                    console.log('error: data = ', data);
                    if (callbackCatch) callbackCatch();
                });
        },
        getCategories(callbackThen = () =>
        {}, callbackCatch = () =>
        {})
        {
            axios
                .get(this.apiCategories)
                .then(data =>
                {
                    if (data.data)
                    {
                        if (data.data.data)
                        {
                            if (data.data.code === 200)
                            {
                                this.categories = data.data.data;
                                if (callbackThen) callbackThen();
                            }
                        }
                    }
                })
                .catch(function(data)
                {
                    console.log('error: data = ', data);
                    if (callbackCatch) callbackCatch();
                });
        },
        arrangeLinksByCat(callbackThen = () =>
        {})
        {
            this.linksByCat = [];
            for (
                let catIndex = 0;
                catIndex < this.categories.length;
                catIndex++
            )
            {
                let linksByCat = this.linksByCategories.filter(lnk =>
                {
                    return lnk.idcategory === this.categories[catIndex].id;
                });
                this.linksByCat.push(linksByCat);
            }
            if (callbackThen) callbackThen();
        },
        getOffset()
        {
            return (this.page - 1) * this.itemsPerPage;
        },
        paginationChange()
        {
            this.loading = true;
            this.getLinks(this.itemsPerPage, this.getOffset());
            this.getLinks(
                this.itemsPerPage,
                this.getOffset(),
                true,
                () =>
                {
                    this.loading = false;
                },
                () =>
                {
                    this.loading = false;
                }
            );
        },
        /*extractCategories () {
        for (let linkIndex = 0; linkIndex < this.links.length;
             linkIndex++) {
          let category = this.links[linkIndex].cat_name;
          let textId = this.links[linkIndex].txt_id;
          let textIdIndex = this.categories.map(function(cat) {
            return cat.txt_id;
          }).indexOf(textId);
          if (textIdIndex === -1) {
            this.categories.push({
              cat_name: category,
              txt_id: textId
            });
          }
        }
      }*/
    },
};
</script>

<style scoped></style>
