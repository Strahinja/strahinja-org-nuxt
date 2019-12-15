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
                        :enabled="social.enabled"
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
    computed:
    {
        socials()
        {
            if (this && this.$store)
            {
                return this.$store.getters['pages/socialLoginProviders'];
            }
            return [];
        }
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

