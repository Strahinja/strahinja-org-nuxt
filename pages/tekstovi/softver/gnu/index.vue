<template lang="pug">
    subpage
        h1 Текстови о ГНУ-у
        p
            nuxt-link(:to="'/tekstovi/softver/gnu/ojl'") ГНУ-ова ОЈЛ
</template>

<script>
import Subpage from '~/components/Subpage';
export default {
    name: 'Gnu',
    components: { Subpage },
    data()
    {
        return {
        };
    },
};
</script>

