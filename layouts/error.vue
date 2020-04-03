<template lang="pug">
        //-v-app

        subpage
            h1.display-1.
                Код {{ code }}: {{ message }}
            p {{ description }}
            p Назад на #[nuxt-link(:to="'/'") почетну страницу]
</template>

<script>
import Subpage from '~/components/Subpage';
var getProp = require('dotprop');
export default {
    layout: 'default',
    components: { Subpage },
    props: {
        error: { type: Object, default: () =>
        {}, required: false },
    },
    data()
    {
        return {
            image: 'http://strahinja.org/img/preview-home-strahinja-org.png',
            imageAlt: 'Иницијали СР и текст //strahinja.org',
            parentUrl: '/',
        };
    },
    computed: {
        code()
        {
            return this.error ? this.error.statusCode : 0;
        },
        message()
        {
            return (this.error && this.error.message !== '-')
                ? this.error.message
                : this.$store.getters['errors/messageByCode'](this.code);
        },
        description()
        {
            return this.$store.getters['errors/descriptionByCode'](this.code);
        },
        url()
        {
            return getProp(this, '$route.path') || '';
        },
        title()
        {
            return `Код ${this.code}`;
        },
    },
    mounted()
    {
        console.log('layouts/error: error = ');
        console.dir(this.error);
    },
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
