<template lang="pug">
    subpage(:splash="true",
    :source-url="true",
    :source-url-light="true")
        template(#header)
            h1.display-1 Текстови
        template(#outside-content)
            fancy-list(:items="formattedSubpages")
</template>

<script>
import FancyList from '~/components/FancyList';
import Subpage from '~/components/Subpage';
export default {
    name: 'Tekstovi',
    components: { FancyList, Subpage },
    data()
    {
        return {
            formattedSubpages: [],
        };
    },
    computed:
    {
        subpages()
        {
            return this.$store.getters['pages/subpages']('/tekstovi');
        }
    },
    mounted()
    {
        this.formattedSubpages = [];
        this.subpages.forEach((item) =>
        {
            this.formattedSubpages.push({
                name: item.title,
                icon: item.icon,
                image: item.image,
                description: item.text,
                path: item.url.path,
                short_desc: item.text,
                created: '',
                modified: '',
            });
        });
    },
};
</script>

