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
                height: this && this.folded ? this.foldedHeight : null,
            },
        };
    },
    watch: {
        folded: function(value)
        {
            let wr = this.$refs.wrapper;
            let el = this.$refs.foldable;
            let height = getComputedStyle(el).height;

            if (value)
            {
                // fold /\
                wr.style.height = height;

                // Trigger redraw
                getComputedStyle(wr).height;

                setTimeout(() =>
                {
                    wr.style.height = this.foldedHeight;
                    el = null;
                    wr = null;
                }, 100);
            }
            else
            {
                // unfold \/
                wr.style.height = this.foldedHeight;
                getComputedStyle(wr).height;

                setTimeout(() =>
                {
                    wr.style.height = height;
                    setTimeout(() =>
                    {
                        wr.style.height = 'auto';
                        el = null;
                        wr = null;
                    }, 1000);
                }, 100);
            }
        }
    },
};
</script>

<style lang="sass" scoped>
.foldable-wrapper
    overflow-y: hidden
    transition: all .5s ease-in-out

</style>
