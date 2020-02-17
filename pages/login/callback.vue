<template lang="pug">
    .login
        v-progress-circular(indeterminate=true,
        color="primary",
        :size="50",
        :width="6")
</template>

<script>
export default {
    name: 'Callback',
    middleware: ['auth'],
};
</script>

<style lang="sass">
</style>

