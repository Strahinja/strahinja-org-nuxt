<template lang="pug">
    subpage
        h1.display-1 Текстови
        p
            nuxt-link(:to="'/tekstovi/softver'") Текстови о софтверу
</template>

<script>
import Subpage from '~/components/Subpage';
export default {
    name: 'Tekstovi',
    components: { Subpage },
    data()
    {
        return {
        };
    }
};
</script>

