<template lang="pug">
    subpage
        h1 Текстови о софтверу
        p
            nuxt-link(:to="'/tekstovi/softver/gnu'") Текстови о ГНУ-у
</template>

<script>
import Subpage from '~/components/Subpage';
export default {
    name: 'Softver',
    components: { Subpage },
    data()
    {
        return {
        };
    },
};
</script>

