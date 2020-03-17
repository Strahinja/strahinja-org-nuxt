<template lang="pug">
    v-card
        v-card-title.justify-end
            v-spacer/
            v-subheader.text-center(:class=`{
                xs: $breakpoint.is.xsOnly
            }`) Пријављивање преко друштвених мрежа
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
        v-card-text
            v-container
                v-row.justify-center
                    card-button(v-for="social in socials",
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
            tab: null,
        };
    },
    computed:
    {
        socials()
        {
            if (this && this.$store)
            {
                return this.$store.getters['social/loginProviders'];
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

<style lang="sass" scoped>
.v-application .v-subheader.xs
    line-height: normal
    padding-top: 2rem
</style>

