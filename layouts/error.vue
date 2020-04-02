<template lang="pug">
    subpage
        h1.display-1.
            Код {{ code }}: {{ messages[code] }}
        p {{ messageDescriptions[code] }}
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
            messages: {
                0: '',
                200: 'Успешно',
                404: 'Није пронађено',
                410: 'Уклоњено',
                500: 'Серверска грешка'
            },
            messageDescriptions: {
                0: '',
                404: 'Страница тренутно није доступна или је'
                    + ' УРЛ који сте унели погрешан. Проверите'
                    + ' УРЛ или покушајте поново касније.',
                410: 'Ова страница је премештена или уклоњена.',
                500: 'Догодила се серверска грешка. Покушајте поново касније.',
            },
            parentUrl: '/',
        };
    },
    computed: {
        code()
        {
            if (this.error)
            {
                return this.error.statusCode;
            }
            else
            {
                return 0;
            }
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
