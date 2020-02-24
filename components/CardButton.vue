<template lang="pug">
    v-card.card-button(:dark="enabled && dark",
    :light="enabled && !dark",
    :disabled="!enabled",
    :color="enabled ? color : null",
    :hover="enabled && hover",
    :class="{ disabled: !enabled }",
    outlined=true,
    :width="width",
    @click.stop="enabled ? $emit('clicked', buttonId) : false")
        v-card-title.justify-center
            v-icon {{ icon }}
        v-card-subtitle
            v-subheader.justify-center {{ title }}
</template>

<script>
export default {
    name: 'CardButton',
    props: {
        buttonId: { type: String, default: null, required: true },
        icon: { type: String, default: '', required: true },
        enabled: { type: Boolean, default: true, required: false },
        color: { type: String, default: 'transparent', required: false },
        dark: { type: Boolean, default: true, required: false },
        hover: { type: Boolean, default: true, required: false },
        light: { type: Boolean, default: false, required: false },
        shortDesc: { type: String, default: '', required: false },
        title: { type: String, default: '', required: false },
        width: { type: String, default: null, required: false },
    },
};
</script>

<style lang="sass">
.v-application .card-button
    -webkit-user-select: none
    -moz-user-select: none
    -khtml-user-select: none
    -ms-user-select: none
    margin: .2rem

.v-application .card-button .v-subheader
    font-family: $body-font-family !important
    font-weight: 500 !important
    letter-spacing: .0892857143em
    text-transform: uppercase

.v-application .card-button.disabled
    background-color: rgba(0,0,0,.12) !important
    color: rgba(0,0,0,.26) !important
</style>

