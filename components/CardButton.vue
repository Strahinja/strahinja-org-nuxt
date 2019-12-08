<template>
    <!--v-tooltip bottom>
        <template v-slot:activator="{ on }"-->
    <v-card
        :dark="dark"
        :light="!dark"
        :color="color"
        :hover="hover"
        class="card-button"
        outlined
        :width="width"
        v-on="on"
        @click.stop="$emit('clicked', buttonId)">
        <v-card-title class="justify-center">
            <v-icon>
                {{ icon }}
            </v-icon>
        </v-card-title>
        <v-card-subtitle>
            <v-subheader class="justify-center">
                {{ title }}
            </v-subheader>
        </v-card-subtitle>
    </v-card>
    <!--/template>
        <span>{{ shortDesc }}
        </span>
    </v-tooltip-->
</template>

<script>
export default {
    name: 'CardButton',
    props: {
        buttonId: { type: String, default: null, required: true },
        icon: { type: String, default: '', required: true },
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
</style>

