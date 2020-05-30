<template lang="pug">
    v-form(v-model="loginFormValid",
    ref="loginForm",
    @submit.prevent="submitBtnClick()")
        v-card.pa-5
            v-card-title.pa-0.justify-end
                v-spacer/
                | Пријављивање
                //-преко друштвених мрежа
                v-spacer/
                v-tooltip(v-if="!standalone",
                bottom=true)
                    template(v-slot:activator="{ on }")
                        v-btn(:class=`{
                            'px-5': $breakpoint.is.xsOnly
                        }`,
                        icon=true,
                        v-on="on",
                        @click.stop="closeBtnClick()")
                            v-icon mdi-close
                    span Затвори панел
                v-progress-linear(v-if="processingLogin",
                indeterminate)
            v-card-text.pa-0
                v-text-field(v-model="username",
                name="username",
                :rules="usernameRules",
                label="Корисничко име",
                :disabled="processingLogin",
                :readonly="processingLogin",
                autofocus,
                prepend-icon="mdi-account")
                v-text-field(v-model="password",
                name="password",
                :rules="passwordRules",
                label="Лозинка",
                :disabled="processingLogin",
                :readonly="processingLogin",
                type="password",
                prepend-icon="mdi-key")
                .caption.text-center.error--text(v-if="loginError.message")
                    | Грешка {{loginError.code}}:
                    |{{ loginError.message }}
            v-card-actions.pa-0.pt-5.justify-center
                v-btn(color="primary",
                :dark="!processingLogin",
                :light="processingLogin",
                :disabled="processingLogin",
                type="submit",
                @click.prevent="submitBtnClick()")
                    | Пошаљи

                    //-card-button(v-for="social in socials",
                        :key="social.id",
                        :enabled="social.enabled",
                        :button-id="social.id",
                        :color="social.color",
                        :dark="social.dark",
                        :hover="true",
                        :icon="social.icon",
                        :title="social.title",
                        :short-desc="social.shortDesc",
                        width="7rem",
                        @clicked="serviceBtnClick($event)")
</template>

<script>
//import CardButton from '~/components/CardButton';

export default {
    name: 'LoginForm',
    //components: { CardButton },
    props: {
        standalone: { type: Boolean, default: true, required: false },
    },
    data()
    {
        return {
            tab: null,
            valid: false,
            username: null,
            password: null,
            usernameRules: [
                v => !!v || 'Мора се унети име',
                v => (!!v && v.length <= 45) || 'Име не сме бити веће од 45 знакова',
                v => (!!v && !!v[0] && (v[0].toLocaleUpperCase() != v[0].toLocaleLowerCase()))
                    || 'Име мора почињати словом',
                v => (!!v && v.search(/^(\p{L}|\p{N}|@|-|_|\.)+$/u) != -1)
                    || 'Име може садржати само слова, бројеве и знаке @-_.',
                v => (!!v && v[v.length-1] != '@')
                    || 'Име се не сме завршавати знаком @',
            ],
            passwordRules: [
                v => !!v || 'Мора се унети лозинка',
                v => !!v && v.length <= 65 || 'Лозинка не сме бити већа од 65 знакова',
            ],
        };
    },
    computed:
    {
        /*socials()
        {
            if (this && this.$store)
            {
                return this.$store.getters['social/loginProviders'];
            }
            return [];
        },*/
        processingLogin()
        {
            return this && this.$store
                && this.$store.getters['local-auth/processingLogin'];
        },
        loginError()
        {
            return this && this.$store
                ? this.$store.getters['local-auth/loginError']
                : {};
        },
        loggedIn()
        {
            return this && this.$store
                && this.$store.getters['local-auth/loggedIn'];
        },
    },
    watch:
    {
        loggedIn(newValue)
        {
            if (newValue)
            {
                this.$emit('login-success');
            }
            else
            {
                this.$emit('logout-success');
            }
        }
    },
    methods: {
        closeBtnClick()
        {
            this.$emit('close-button-clicked');
        },
        /*serviceBtnClick(serviceName)
        {
            this.$emit('service-button-clicked', serviceName);
        },*/
        submitBtnClick()
        {
            if (!this.loginFormValid)
            {
                this.$refs.loginForm.validate();
                return;
            }

            //console.log(`components/LoginForm.vue: submitBtnClick(${this.username}, ${this.password})`);

            this.$store.dispatch('local-auth/login', {
                username: this.username,
                password: this.password,
                success: (/*res*/) =>
                {
                    //console.log('components/LoginForm.vue: login-success callback, res = ', res);
                    this.$emit('login-success');
                },
                error: (/*err*/) =>
                {
                    //console.log('components/LoginForm.vue: ', err.message);
                    this.$emit('login-error');
                },
            }, { root: true });
        },
    }
};
</script>

