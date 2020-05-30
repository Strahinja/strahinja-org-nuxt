<template lang="pug">
    .profile-menu
        v-menu(v-if="loggedIn",
        offset-y=true)
            template(v-slot:activator="{ on: menu }")
                v-tooltip(bottom=true)
                    template(v-slot:activator="{ on: tooltip }")
                        v-btn(icon=true,
                        v-on="{ ...menu, ...tooltip }")
                            v-avatar
                                v-img(:src="userAvatar")
                    span {{ userDisplayName }}
            v-list
                v-list-item(@click="settingsClick()")
                    v-list-item-action
                        v-icon mdi-account-settings
                    v-list-item-title Подешавања
                v-list-item(@click="logoutClick()")
                    v-list-item-action
                        v-icon mdi-logout
                    v-list-item-title Одјављивање
        login-sheet(v-else,
        :inset="true",
        :width="500",
        :active="loginSheetActive",
        @active-changed="setLoginSheetActive($event)",
        @service-button-clicked="loginSheetServiceBtnClick($event)")
            template(#login-sheet-activator)
                v-tooltip(bottom=true)
                    template(v-slot:activator="{ on }")
                        v-btn(icon=true,
                        v-on="on",
                        @click.stop="loginSheetActivatorClick()")
                            v-icon mdi-account-question
                    span Пријава
</template>

<script>
const getProp = require('dotprop');
//import LoginSheet from '~/components/LoginSheet';
export default {
    name: 'ProfileMenu',
    //components: { LoginSheet },
    data()
    {
        return {
            loginSheetActive: false,
        };
    },
    computed: {
        loggedIn()
        {
            return this && this.$store
                ? this.$store.getters['local-auth/loggedIn']
                : false;
        },
        user()
        {
            return this && this.$store
                ? this.$store.getters['local-auth/user']
                : {};
        },
        userDisplayName()
        {
            return this
                ? this.user.username
                : 'Анониман';
        },
        userAvatar()
        {
            return this && this.$store
                ? this.$store.getters['local-auth/avatarUrl']
                : null;
        },
    },
    methods:
    {
        setLoginSheetActive(newValue)
        {
            this.loginSheetActive = newValue;
        },
        settingsClick()
        {
            this.$router.push({ path: '/users/me' });
        },
        logoutClick()
        {
            this.$store.dispatch('local-auth/logout', { root: true });
        },
        loginSheetActivatorClick()
        {
            this.loginSheetActive = true;
        },
    },
};
</script>

<style lang="sass">
.profile-menu
    display: inline-block

.v-application .v-menu__content
    z-index: 62 !important

.v-application .v-tooltip__content
    z-index: 60 !important

</style>
