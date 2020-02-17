<template lang="pug">
    v-container(fluid=true)
        v-row
            v-col
                h3 Edit
</template>

<script>
export default {
    name: 'PortfolioEdit',
    middleware: ['auth'],
};
</script>

<style lang="sass">

</style>
