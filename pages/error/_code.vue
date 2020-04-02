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
    name: 'Error',
    components: { Subpage },
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
            return getProp(this, '$route.params.code') || 0;
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
};
</script>

<style scoped></style>
