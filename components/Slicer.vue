<template>
    <div
        class="slicer"
        :class="{
            'inside-container': insideContainer,
            'starting-at-top': startingAtTop,
            'ending-at-bottom': endingAtBottom,
            xs: $vuetify.breakpoint.xs,
            'xs-and-down': $vuetify.breakpoint.xsOnly,
            sm: $vuetify.breakpoint.smAndUp,
            'sm-and-down': $vuetify.breakpoint.smAndDown,
            md: $vuetify.breakpoint.mdAndUp,
            'md-and-down': $vuetify.breakpoint.mdAndDown,
            lg: $vuetify.breakpoint.lgAndUp,
            'lg-and-down': $vuetify.breakpoint.lgAndDown,
            xl: $vuetify.breakpoint.xlOnly,
            'xl-and-down': $vuetify.breakpoint.xl
        }">
        <slicer-item
            v-for="(item, itemIndex) in items"
            :key="itemIndex"
            :link="item.url.path"
            :title="item.title"
            :image-url="item.imageUrl"
            :color-class="item.colorClass"
            :items-length="items.length" />
    </div>
</template>

<script>
import SlicerItem from './SlicerItem.vue';

export default {
    name: 'Slicer',
    components: { SlicerItem },
    props: {
        insideContainer: Boolean,
        startingAtTop: Boolean,
        //containerCount: { type: Number, default: 1 },
        endingAtBottom: Boolean,
        items: { type: Array, default: () => [] }
    },
    data()
    {
        return {};
    },
    methods: {}
};
</script>

<style lang="sass" scoped>
$margin-amount: 24px
$margin-amount-smanddown: 16px

.slicer
    width: 100%
    height: 200px
    overflow: hidden
    font-size: 0
    font-family: 'Fira Sans Extra Condensed', Arial, sans-serif !important

.xs.slicer
    height: auto
    overflow: auto
    overflow-x: hidden

.slicer.inside-container
    width: calc(100% + #{2 * $margin-amount})
    margin-left: -1 * $margin-amount
    margin-right: -1 * $margin-amount

.slicer.inside-container.sm-and-down
    width: calc(100% + #{2 * $margin-amount-smanddown})
    margin-left: -1 * $margin-amount-smanddown
    margin-right: -1 * $margin-amount-smanddown

.slicer.inside-container.starting-at-top
    margin-top: -1 * $margin-amount

.slicer.inside-container.ending-at-bottom
    margin-bottom: -1 * $margin-amount

</style>
