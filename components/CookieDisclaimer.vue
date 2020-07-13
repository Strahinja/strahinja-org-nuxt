<template lang="pug">
    v-scroll-y-transition
        v-sheet(v-if="show"
            elevation="10"
            :color="color"
            class="cookie-disclaimer")
            v-container(fluid)
                v-row
                    v-col(class="message align-self-center py-0"
                        :cols="12"
                        :sm="6"
                        :class="{ xs: $breakpoint.is.xsOnly }")
                        slot(name="message")
                            | This website uses cookies to store settings and provide social
                            | login.
                            br
                            | Овај сајт користи колачиће (cookies) за чување
                            | подешавања и пријављивање преко друштвених мрежа.
                    v-col(:cols="12"
                    :sm="6"
                    class="text-right align-self-center py-0")
                        v-btn(color="accent"
                            class="black--text"
                            @click="acceptClick()")
                            v-icon mdi-check
                            | I accept / Прихватам
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
    z-index: 45
    position: fixed
    bottom: 0
    width: 100%
    padding: 0 .5rem
    font-size: .8rem

.message.xs
    font-size: .7rem
    padding-bottom: .5rem
</style>

