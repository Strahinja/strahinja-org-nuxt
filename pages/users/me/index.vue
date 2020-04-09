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
                                    }`) Провајдер:
                                    v-col(:cols="10",
                                    :xs="12") {{ userProvider }}
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
import Subpage from '~/components/Subpage';
export default {
    name: 'Me',
    components: { Subpage },
    middleware: ['local-auth'],
    computed: {
        loggedIn()
        {
            return this ? this.$store.getters['local-auth/loggedIn'] : false;
        },
        userProvider()
        {
            if (this && this.loggedIn)
            {
                const providers =
                    this.$store.getters['social/loginProviders'];
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
                return this.$store.getters['local-auth/user'].username;
            }
            return 'Анониман';
        },
        userEmail()
        {
            if (this && this.loggedIn)
            {
                return this.$store.getters['local-auth/user'].email;
            }
            return null;
        },
        userAvatar()
        {
            if (this && this.loggedIn)
            {
                return this.$store.getters['local-auth/avatarUrl'];
            }
            return null;
        },
        userRole()
        {
            if (this && this.loggedIn)
            {
                return this.$store.getters['local-auth/user'].role;
            }
            return 'Непозната';
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

