<template lang="pug">
    .profile-menu
        login-sheet(v-if="!loggedIn",
        :key="refreshOnAuthChange",
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
        v-menu(v-if="loggedIn",
        :key="refreshOnAuthChange",
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
</template>

<script>
var getProp = require('dotprop');
import LoginSheet from '~/components/LoginSheet';
export default {
    name: 'ProfileMenu',
    components: { LoginSheet },
    data()
    {
        return {
            loginSheetActive: false,
            refreshOnAuthChange: new Date().toISOString(),
        };
    },
    computed: {
        loggedIn()
        {
            return this && this.$store
                ? this.$store.getters['local-auth/loggedIn']
                : false;
            // return getProp(this.$auth, 'loggedIn') || false;
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
            //return getProp(this.$auth, 'user.name') || 'Анониман';
        },
        userAvatar()
        {
            return this && this.$store
                ? this.$store.getters['local-auth/avatarUrl']
                : null;
            /*return getProp(this.$auth, 'user.picture.data.url')
                || getProp(this.$auth, 'user.picture')
                || null;*/
        },
    },
    watch: {
        loggedIn()
        {
            this.refreshOnAuthChange = new Date().toISOString();
        },

        /*async loggedIn(newValue)
        {
            if (!newValue) return;

            let auth = this ? this.$auth : null;

            if (!auth) return;

            let authStrategy = auth && auth.strategy ?
                auth.strategy.name : '';

            let store = this.$store;

            if (authStrategy === 'facebook' || authStrategy === 'google' ||
        authStrategy === 'github')
            {
                const token = auth.getToken(authStrategy);
                const refreshToken = auth.getRefreshToken(authStrategy);

                console.log('ProfileMenu: token = ', token);
                console.log('ProfileMenu: refreshToken = ', refreshToken);
                try
                {
                    await auth.fetchUser();
                    store.dispatch('users/loadUsers', {
                        thenCallback: () =>
                        {
                            console.log('ProfileMenu: auth.user = ', auth.user);
                            console.log('ProfileMenu: store.state.users.list = ', store.state.users.list);
                            if (auth.user.family_name)
                            {
                                let name = auth.user.given_name;
                                let surname = auth.user.family_name;
                                if (store.getters['users/userByEmail'](auth.user.email))
                                {
                                    store.dispatch('users/updateUser', {
                                        provider: authStrategy,
                                        data: {
                                            email: auth.user.email,
                                            token,
                                            name,
                                            surname
                                        }
                                    });
                                }
                                else
                                {
                                    store.dispatch('users/addUser', {
                                        provider: authStrategy,
                                        data: {
                                            email: auth.user.email,
                                            token,
                                            name,
                                            surname
                                        }
                                    });
                                }
                            }
                            else
                            {
                                let name = auth.user.name;
                                if (store.getters['users/userByEmail'](auth.user.email))
                                {
                                    store.dispatch('users/updateUser', {
                                        provider: authStrategy,
                                        data: {
                                            email: auth.user.email,
                                            token,
                                            name
                                        }
                                    });
                                }
                                else
                                {
                                    store.dispatch('users/addUser', {
                                        provider: authStrategy,
                                        data: {
                                            email: auth.user.email,
                                            token,
                                            name
                                        }
                                    });
                                }
                            }
                        }
                    });
                }
                catch(error)
                {
                    console.error(error);
                }
            }
        }*/
    },
    methods:
    {
        setLoginSheetActive(newValue)
        {
            console.log('components/ProfileMenu.vue: setLoginSheetActive(',
                        newValue, ')');
            this.loginSheetActive = newValue;
        },
        settingsClick()
        {
            this.$router.push({ path: '/users/me' });
        },
        logoutClick()
        {
            console.log('components/ProfileMenu.vue: logoutClick()');
            this.$store.dispatch('local-auth/logout', { root: true });

            /*if (this.$auth && this.loggedIn)
            {
                this.$auth.logout()
                    .then(() =>
                    {
                        this.refreshOnAuthChange = new Date().toISOString();
                    });
            }*/
        },
        loginSheetActivatorClick()
        {
            console.log('components/ProfileMenu.vue: loginSheetActivatorClick()');
            console.log('(before) this.loginSheetActive = ', this.loginSheetActive ? 'true' : 'false');
            this.loginSheetActive = true;
            console.log('(after)  this.loginSheetActive = ', this.loginSheetActive ? 'true' : 'false');
        },
        async loginSheetServiceBtnClick(serviceName)
        {
            console.log('ProfileMenu.loginSheetServiceBtnClick(',
                        serviceName, ')');
            /*if (serviceName == 'facebook' || serviceName == 'google' ||
                serviceName == 'github')
            {*/
            await this.$auth.loginWith(serviceName)
                .then((args) =>
                {
                    console.log('ProfileMenu.loginSheetServiceBtnClick: Success!');
                    this.refreshOnAuthChange = new Date().toISOString();
                    this.$toast.success('Пријављивање успело!', {
                        icon: 'mdi mdi-account-check',
                    });
                    console.log('args = ', args);
                    console.log('this.$auth.loggedIn = ',
                                this.$auth.loggedIn ? 'true' : 'false');
                    console.log('thia.$auth.user = ', this.$auth.user);
                })
                .catch(e =>
                {
                    console.log('ProfileMenu.loginSheetServiceBtnClick(await): ', e);
                    this.$toast.error('Грешка при пријављивању', {
                        icon: 'mdi mdi-alert',
                        /*action: {
                                text: 'Одбаци',
                                onClick: (e, toastObject) =>
                                {
                                    toastObject.goAway(0);
                                }
                            },*/
                    });
                });
            /*}*/
        }
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
