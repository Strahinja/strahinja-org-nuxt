<template lang="pug">
    subpage(splash,
    source-url,
    source-url-light)
        template(#header)
            h1.display-1 Текстови
        template(#outside-content)
            fancy-list(:items="items")
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
            items: [],
        };
    },
    async asyncData({ store })
    {
        let items = [];
        let subpages = [];

        store.getters['pages/subpages']('/tekstovi')
            .forEach((item) =>
            {
                subpages.push({
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
        items.push({
            title: 'Странице',
            list: subpages,
        });

        await store.dispatch('items/loadItems', {
            catId: store.state.items.categoryIds.ITEM_ORIGINAL_TEXT
        }, { root: true });

        if (store.getters['items/fileCount'] > 0)
        {
            items.push({
                title: 'Фајлови',
                list: store.getters['items/fileList'],
            });
        }

        return {
            items
        };
    },
};
</script>

