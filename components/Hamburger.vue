<template lang="pug">
    svg(width=24,
    height=24,
    :class="{ open }")
        rect#line1(x=0, :y="gapAmount",
        :width="width", :height="barHeight")
        rect#line2(x=0, :y="2*gapAmount+barHeight",
        :width="width", :height="barHeight")
        rect#line3(x=0, :y="3*gapAmount+2*barHeight",
        :width="width", :height="barHeight")
</template>

<script>
export default {
    name: 'Hamburger',
    props: {
        open: { type: Boolean, default: false, required: false },
        width: { type: Number, default: 24, required: false },
        height: { type: Number, default: 24, required: false },
    },
    computed:
    {
        barHeight()
        {
            return Math.floor(this.height / 7);
        },
        gapAmount()
        {
            return Math.floor(
                (this.height - 3*this.barHeight)/4
            );
        }
    },
};
</script>

<style lang="sass" scoped>
svg
    transition: all .5s ease-in-out
    border: 1px solid transparent

#line1, #line3
    transition: all .5s ease-in-out
    transform-origin: 50% 50% 0

#line2
    transition: all .5s ease-in-out
    transform-origin: 50% 50% 0

svg.open #line1
    transform: translate(14%, 21%) rotate(-45deg)
    transform-origin: 50% 50% 0

svg.open #line2
    transition: all 1s ease-in-out
    transform: translateX(-150%)
    opacity: 0

svg.open #line3
    transform: translate(14%, -21%) rotate(45deg)
    transform-origin: 50% 50% 0

</style>
