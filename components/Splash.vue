<template lang="pug">
    .splash(:class=`{
        xs: $breakpoint.is.xs,
        'xs-and-down': $breakpoint.is.xsOnly,
        sm: $breakpoint.is.smAndUp,
        'sm-and-down': $breakpoint.is.smAndDown,
        md: $breakpoint.is.mdAndUp,
        'md-and-down': $breakpoint.is.mdAndDown,
        lg: $breakpoint.is.lgAndUp,
        'lg-and-down': $breakpoint.is.xl
    }`,
    :style="splashComputedStyle")
        slot/
</template>

<script>
export default {
    name: 'Splash',

    props: {
        //insideContainer: { type: Boolean, default: false },
        bgColor: { type: String, default: '#fff' },
        fgColor: { type: String, default: '#000' },
        //startingAtTop: { type: Boolean, default: false },
        //endingAtBottom: { type: Boolean, default: false },
        height: { type: String, default: '300px' }
    },

    computed: {
        splashComputedStyle()
        {
            return 'height: ' + this.height
                + ';min-height: ' + this.height
                //+ ';line-height: ' + this.height
                + ';background-color: ' + this.bgColor
                + ';color: ' + this.fgColor;
        }
    }
};
</script>

<style lang="sass" scoped>
$margin-amount: 24px
$margin-amount-smanddown: 12px

.splash
    display: block
    text-align: center
    width: 100%

.splash h1
    font-size: 30pt
    line-height: 30pt
    display: inline-block
    vertical-align: middle

.splash:before
    content: ' '
    display: inline-block
    vertical-align: middle
    height: 100%

/* .splash.inside-container
    width: calc(100% + #{2 * $margin-amount})
    margin-left: -1 * $margin-amount
    margin-right: -1 * $margin-amount

/* .splash.inside-container.sm-and-down
    width: calc(100% + #{2 * $margin-amount-smanddown})
    margin-left: -1 * $margin-amount-smanddown
    margin-right: -1 * $margin-amount-smanddown

/* .splash.inside-container.sm-and-down.starting-at-top
    margin-top: -1 * $margin-amount-smanddown

/* .splash.inside-container.starting-at-top
    margin-top: -1 * $margin-amount

/* .splash.inside-container.sm-and-down.ending-at-bottom
    margin-bottom: -1 * $margin-amount-smanddown

/* .splash.inside-container.ending-at-bottom
    margin-bottom: -1 * $margin-amount
</style>

