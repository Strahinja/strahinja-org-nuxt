<template lang="pug">
    v-app(dark=true)
        h1(v-if="error.statusCode === 404") {{ pageNotFound }}
        h1(v-else=true) {{ otherError }}
        nuxt-link(:to="'/'") Почетна страница
</template>

<script>
export default {
    layout: 'empty',
    props: {
        error: {
            type: Object,
            default: null
        }
    },
    head ()
    {
        const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
        return {
            title
        };
    },
    data ()
    {
        return {
            pageNotFound: '404 није пронађено',
            otherError: 'Дошло је до грешке'
        };
    }
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
