<template lang="pug">
    .foldable-wrapper(ref="wrapper",
    :class="{ folded }",
    :style="foldableStyle")
        .foldable(ref="foldable")
            slot/
</template>

<script>
export default {
    name: 'Foldable',
    props: {
        folded: { type: Boolean, default: true, required: false },
        foldedHeight: { type: String, default: '0', required: false },
    },
    data()
    {
        return {
            foldableStyle: {
                height: this && this.folded ? this.foldedHeight : 'auto',
            },
            animationHandle: null,
            animationEnd: () =>
            {},
            secondaryAnimationHandle: null,
            secondaryAnimationEnd: () =>
            {},
            secondaryAnimationDelay: 1000,
        };
    },
    watch: {
        folded: function(value)
        {
            let height = getComputedStyle(this.$refs.foldable).height;

            if (this.secondaryAnimationHandle)
            {
                clearTimeout(this.secondaryAnimationHandle);
                this.secondaryAnimationEnd();
            }
            else if (this.animationHandle)
            {
                clearTimeout(this.animationHandle);
                this.animationEnd();
            }

            if (value)
            {
                // fold /\
                this.$refs.wrapper.style.height = height;

                // Trigger redraw
                getComputedStyle(this.$refs.wrapper).height;

                this.animationEnd = () =>
                {
                    this.$refs.wrapper.style.height = this.foldedHeight;
                    this.animationHandle = null;
                };
                this.animationHandle = setTimeout(this.animationEnd, 100);
            }
            else
            {
                // unfold \/
                this.$refs.wrapper.style.height = this.foldedHeight;
                getComputedStyle(this.$refs.wrapper).height;

                this.animationEnd = () =>
                {
                    this.$refs.wrapper.style.height = height;
                    this.animationHandle = null;
                    this.secondaryAnimationEnd = () =>
                    {
                        this.$refs.wrapper.style.height = 'auto';
                        this.secondaryAnimationHandle = null;
                    };
                    this.secondaryAnimationHandle =
                        setTimeout(this.secondaryAnimationEnd,
                                   this.secondaryAnimationDelay);
                };
                this.animationHandle = setTimeout(this.animationEnd, 100);
            }
        }
    },
};
</script>

<style lang="sass" scoped>
.foldable-wrapper
    overflow-y: hidden
    transition: height .5s ease-in-out

</style>
