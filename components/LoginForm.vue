<template>
    <v-card>
        <v-card-title class="justify-end">
            <v-spacer />
            <v-subheader>
                Пријављивање преко друштвених мрежа
            </v-subheader>
            <v-spacer />
            <v-tooltip v-if="!standalone" bottom>
                <template v-slot:activator="{ on }">
                    <v-btn
                        icon
                        v-on="on"
                        @click.stop="closeBtnClick()">
                        <v-icon>
                            mdi-close
                        </v-icon>
                    </v-btn>
                </template>
                <span>Затвори панел</span>
            </v-tooltip>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-row class="justify-center">
                    <card-button
                        v-for="social in socials"
                        :key="social.id"
                        :button-id="social.id"
                        :color="social.color"
                        :dark="social.dark"
                        :hover="true"
                        :icon="social.icon"
                        :title="social.title"
                        :short-desc="social.shortDesc"
                        width="7rem"
                        @clicked="serviceBtnClick($event)" />
                </v-row>
            </v-container>
        </v-card-text>
    </v-card>
</template>

<script>
import CardButton from '~/components/CardButton';

export default {
    name: 'LoginForm',
    components: { CardButton },
    props: {
        standalone: { type: Boolean, default: true, required: false },
    },
    data()
    {
        return {
            socials: {
                facebook: {
                    id: 'facebook',
                    dark: true,
                    color: '#3b5999',
                    icon: 'mdi-facebook',
                    title: 'Фејсбук',
                    shortDesc: 'Пријављивање преко Фејсбука',
                },
                google: {
                    id: 'google',
                    dark: true,
                    color: '#dd4b39',
                    icon: 'mdi-google',
                    title: 'Гугл',
                    shortDesc: 'Пријављивање преко Гугла',
                },
                linkedin: {
                    id: 'linkedin',
                    dark: true,
                    color: '#0077B5',
                    icon: 'mdi-linkedin',
                    title: 'LinkedIn',
                    shortDesc: 'Пријављивање преко LinkedIn-а',
                },
                reddit: {
                    id: 'reddit',
                    dark: true,
                    color: '#ff5700',
                    icon: 'mdi-reddit',
                    title: 'Редит',
                    shortDesc: 'Пријављивање преко Редита',
                },
                twitter: {
                    id: 'twitter',
                    dark: false,
                    color: '#55acee',
                    icon: 'mdi-twitter',
                    title: 'Твитер',
                    shortDesc: 'Пријављивање преко Твитера',
                },
                whatsapp: {
                    id: 'whatsapp',
                    dark: false,
                    color: '#25D366',
                    icon: 'mdi-whatsapp',
                    title: 'WhatsApp',
                    shortDesc: 'Пријављивање преко WhatsApp-а',
                },
            },
        };
    },
    methods: {
        closeBtnClick()
        {
            this.$emit('close-button-clicked');
        },
        serviceBtnClick(serviceName)
        {
            this.$emit('service-button-clicked', serviceName);
        }
    }
};
</script>

<style lang="sass">
</style>

