<template lang="pug">
    subpage
        h1.display-1 Профил
        v-container
            v-row
                v-col
                    v-card(v-if="loggedIn")
                        v-card-title
                            v-row
                                v-col.card-left-col(:class=`{
                                    xs: $breakpoint.is.xsOnly
                                }`)
                                    v-avatar.card-avatar(:size="90")
                                        v-img(:src="userAvatar")
                                v-col.py-0(:cols="10",
                                :xs="12")
                                    h4 {{ userDisplayName }}
                        v-card-text
                            v-container
                                v-row
                                    v-col.card-left-col.field-title(:class=`{
                                        xs: $breakpoint.is.xsOnly
                                    }`) Провајдери:
                                    v-col(:cols="10",
                                    :xs="12")
                                        ul
                                            li(v-for="(provider, providerIndex) in userProviders"
                                            :key="providerIndex") {{ provider.name }}
                                v-row
                                    v-col.card-left-col.field-title(:class=`{
                                        xs: $breakpoint.is.xsOnly
                                    }`) email:
                                    v-col(:cols="10",
                                    :xs="12") {{ userEmail }}
                                v-row
                                    v-col.card-left-col.field-title(:class=`{
                                        xs: $breakpoint.is.xsOnly
                                    }`) Улога:
                                    v-col(:cols="10",
                                    :xs="12") {{ userRole }}
                        v-card-actions
                            v-row
                                v-col.px-7(:cols="12")
                                    v-spacer/
                                    v-btn(color="primary",
                                    dark,
                                    @click="logoutClick()")
                                        v-icon mdi-logout
                                        | Одјави се
</template>

<script>
//import Subpage from '~/components/Subpage';
export default {
    name: 'Me',
    //components: { Subpage },
    middleware: ['local-auth', 'load-single-user'],
    head()
    {
        return {
            meta: [
                { name: 'robots', content: 'noindex' },
            ],
        };
    },
    computed: {
        loggedIn()
        {
            return this && this.$store.getters['local-auth/loggedIn'];
        },
        userId()
        {
            return this && this.loggedIn
                ? this.$store.getters['local-auth/userId']
                : 0;
        },
        user()
        {
            return this && this.userId
                ? this.$store.getters['users/userById'](this.userId)
                : {};
        },
        userProviders()
        {
            return this && this.user
                ? this.user.providers
                : [];
        },
        userDisplayName()
        {
            return this && this.user ? this.user.username : 'Анониман';
        },
        userEmail()
        {
            return this && this.user ? this.user.email : null;
        },
        userAvatar()
        {
            return this && this.loggedIn
                ? this.$store.getters['local-auth/avatarUrl']
                : null;
        },
        userRole()
        {
            return this && this.user
                ? this.user.role
                : 'Непозната';
        },
    },
    methods:
    {
        logoutClick()
        {
            if (this.loggedIn)
            {
                this.$store.dispatch('local-auth/logout', { root: true });
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

