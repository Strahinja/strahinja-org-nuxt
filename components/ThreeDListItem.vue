<template lang="pug">
    .tdl-item(:style=`{
        'background-color': color
    }`)
        .tdl-underlay(:style=`{
            width: itemWidthPx
        }`)
        .tdl-header
            slot(name="header")
        .tdl-contents
            slot(name="contents")
        .tdl-footer
            slot(name="footer")

</template>

<script>
export default {
    name: 'ThreeDListItem',
    props: {
        color: { type: String, default: '#fff', required: false },
    },
};
</script>

