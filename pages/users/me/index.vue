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
                <h3 class="display-1">
                    Профил
                </h3>
                <v-container>
                    <v-row>
                        <v-col>
                            <v-card>
                                <v-card-title>
                                    <v-row>
                                        <v-col
                                            class="card-left-col"
                                            :class="{ xs: $breakpoint.is.xsOnly }">
                                            <v-avatar
                                                class="card-avatar"
                                                :size="90">
                                                <v-img :src="userAvatar" />
                                            </v-avatar>
                                        </v-col>
                                        <v-col
                                            :cols="10"
                                            :xs="12"
                                            class="py-0">
                                            <h4>{{ userDisplayName }}</h4>
                                        </v-col>
                                    </v-row>
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col
                                                class="card-left-col field-title"
                                                :class="{ xs: $breakpoint.is.xsOnly }">
                                                Провајдер:
                                            </v-col>
                                            <v-col
                                                :cols="10"
                                                :xs="12">
                                                {{ userProvider }}
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col
                                                class="card-left-col field-title"
                                                :class="{ xs: $breakpoint.is.xsOnly }">
                                                email:
                                            </v-col>
                                            <v-col
                                                :cols="10"
                                                :xs="12">
                                                {{ userEmail }}
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-row>
                                        <v-col
                                            class="px-7"
                                            :cols="12">
                                            <v-spacer />
                                            <v-btn color="primary" @click="logoutClick()">
                                                <v-icon>
                                                    mdi-logout
                                                </v-icon>
                                                Одјави се
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'Me',
    middleware: ['auth'],
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
    },
    computed: {
        loggedIn()
        {
            if (this && this.$auth)
            {
                return this.$auth.loggedIn;
            }
            return false;
        },
        userProvider()
        {
            if (this && this.$store && this.loggedIn)
            {
                const providers =
                    this.$store.getters['pages/socialLoginProviders'];
                if (providers)
                {
                    return providers[this.$auth.strategy.name].title;
                }
                return '(без провајдера)';
            }
            return '(без провајдера)';
        },
        userDisplayName()
        {
            if (this && this.loggedIn)
            {
                if (this.$auth.strategy.name == 'facebook' ||
                    this.$auth.strategy.name == 'google' ||
                    this.$auth.strategy.name == 'github')
                {
                    if (this.$auth.user && this.$auth.user.name)
                    {
                        return this.$auth.user.name;
                    }
                    return 'Анониман';
                }
                return 'Анониман';
            }
            return 'Анониман';
        },
        userEmail()
        {
            if (this && this.loggedIn)
            {
                if (this.$auth.strategy.name == 'facebook' ||
                    this.$auth.strategy.name == 'google' ||
                    this.$auth.strategy.name == 'github')
                {
                    if (this.$auth.user && this.$auth.user.email)
                    {
                        return this.$auth.user.email;
                    }
                    return null;
                }
                return null;
            }
            return null;
        },
        userAvatar()
        {
            if (this && this.loggedIn)
            {
                if (this.$auth.strategy.name == 'facebook')
                {
                    if (this.$auth.user && this.$auth.user.picture &&
                        this.$auth.user.picture.data)
                    {
                        return this.$auth.user.picture.data.url;
                    }
                    return null;
                }
                else if (this.$auth.strategy.name == 'google')
                {
                    if (this.$auth.user)
                    {
                        return this.$auth.user.picture;
                    }
                    return null;
                }
                return null;
            }
            return null;
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
    methods:
    {
        logoutClick()
        {
            if (this.loggedIn)
            {
                this.$auth.logout();
            }
        }
    },
};
</script>

<style lang="sass" scoped>
.card-left-col
    width: 140px
    max-width: 140px
    text-align: center

.card-left-col .xs
    width: 100%

.field-title
    font-weight: bold

.card-avatar
    margin-top: -50px

.card-avatar::before
    content: ' '
    border-radius: 50%
    width: 100px
    height: 100px
    background: #fff
    min-width: 100px
    position: absolute
    box-shadow: 0 0 6px rgba(0,0,0,.5)
</style>

