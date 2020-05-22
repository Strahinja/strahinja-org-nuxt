<template lang="pug">
    .splash(:class=`{
        xs: $breakpoint.is.xs,
        'xs-and-down': $breakpoint.is.xsOnly,
        sm: $breakpoint.is.smAndUp,
        'sm-and-down': $breakpoint.is.smAndDown,
        md: $breakpoint.is.mdAndUp,
        'md-and-down': $breakpoint.is.mdAndDown,
        lg: $breakpoint.is.lgAndUp,
        'lg-and-down': $breakpoint.is.xl,
        vcentered,
    }`,
    :style="splashComputedStyle")
        slot/
</template>

<script>
export default {
    name: 'Splash',

    props: {
        bgColor: { type: String, default: '#fff', required: false },
        fgColor: { type: String, default: '#000', reqired: false },
        height: { type: String, default: '300px', required: false },
        align: { type: String, default: 'center', reqired: false },
        paddingLeft: { type: String, default: '0', required: false },
        paddingRight: { type: String, default: '0', required: false },
        paddingTop: { type: String, default: '0', required: false },
        paddingBottom: { type: String, default: '0', required: false },
        vcentered: { type: Boolean, default: true, required: false },
    },

    computed: {
        splashComputedStyle()
        {
            return {
                'min-height': this.height,
                'background-color': this.bgColor,
                color: this.fgColor,
                'text-align': this.align,
                'padding-left': this.paddingLeft,
                'padding-right': this.paddingLeft,
                'padding-top': this.paddingLeft,
                'padding-bottom': this.paddingLeft,
            };
        }
    }
};
</script>

<style lang="sass" scoped>

.splash
    display: flex
    width: 100%
    justify-content: center
    align-items: center

.splash h1
    font-size: 30pt
    line-height: 30pt
    display: inline-block
    vertical-align: middle

//.splash.vcentered:before
    //content: ' '
    //display: inline-block
    //vertical-align: middle
    //height: 100%

</style>

