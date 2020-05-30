<template lang="pug">
    .tdlist(:style=`{
        width: widthPx,
        height: heightPx,
        perspective: perspectivePx,
        margin: marginPx
    }`)
        three-d-list-item(:color="primary",
        position="left")
            template(#content)
                h1 Left item
        three-d-list-item(:color="primary",
        position="center")
            template(#content)
                h1 Center item
        three-d-list-item(:color="primary",
        position="right")
            template(#content)
                h1 Right item
</template>

<script>
//import ThreeDListItem from '~/components/ThreeDListItem';
export default {
    name: 'ThreeDList',
    //components: { ThreeDListItem },
    computed: {
        primary()
        {
            if (this.$vuetify.theme.dark)
            {
                return this.$vuetify.theme.themes.dark.primary.base;
            }
            else
            {
                return this.$vuetify.theme.themes.light.primary.base;
            }
        }
    },
};
</script>

