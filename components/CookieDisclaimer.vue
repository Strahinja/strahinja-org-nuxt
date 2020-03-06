<template>
    <v-scroll-y-transition>
        <v-sheet
            v-if="show"
            elevation="10"
            :color="color"
            class="cookie-disclaimer">
            <v-container fluid>
                <v-row>
                    <v-col
                        class="message align-self-center py-0"
                        :class="{ xs: $breakpoint.is.xsOnly }">
                        <slot name="message">
                            This website uses cookies to store settings and provide social
                            login.<br> Овај сајт користи колачиће (cookies) за чување
                            подешавања и пријављивање преко друштвених мрежа.
                        </slot>
                    </v-col>
                    <v-col class="text-right align-self-center py-0">
                        <v-btn
                            color="accent"
                            class="black--text"
                            @click="acceptClick()">
                            <v-icon>mdi-check</v-icon>
                            I accept / Прихватам
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-sheet>
    </v-scroll-y-transition>
</template>

<script>
export default {
    name: 'CookieDisclaimer',
    props: {
        color: { type: String, default: null, required: false },
        show: { type: Boolean, default: true, required: false },
    },
    methods: {
        acceptClick()
        {
            this.$store.dispatch('pages/setCookieConsent', true);
        },
    },
};
</script>

<style lang="sass" scoped>
.cookie-disclaimer
    z-index: 10
    position: fixed
    bottom: 0
    width: 100%
    padding: 0 .5rem
    font-size: .8rem

.message.xs
    font-size: .7rem
</style>

