<template lang="pug">
    subpage(splash,
    source-url,
    source-url-light)
        template(#header)
            h1.display-1 Математика
        template(#outside-content)
            fancy-list(:items="subpages")
</template>

<script>
import FancyList from '~/components/FancyList';
import Subpage from '~/components/Subpage';

export default {
    name: 'Matematika',
    components: { FancyList, Subpage },
    data()
    {
        return {
            subpages: [],
        };
    },
    asyncData({ store })
    {
        let subpages = [];
        store.getters['pages/subpages']('/tekstovi/matematika')
            .forEach((item) =>
            {
                subpages.push({
                    name: item.title,
                    icon: item.icon,
                    iconSvg: store.getters['pages/svgComponentName'](item.iconSvg),
                    image: item.image,
                    description: item.text,
                    path: item.url.path,
                    short_desc: item.text,
                    created: '',
                    modified: '',
                });
            });
        return {
            subpages
        };
    },
};
</script>

