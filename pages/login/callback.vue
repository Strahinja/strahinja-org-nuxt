<template>
    <div class="login">
        <v-progress-circular
            indeterminate
            color="primary"
            :size="50"
            :width="6" />
    </div>
</template>

<script>
export default {
    name: 'Callback',
    middleware: ['auth'],
};
</script>

<style lang="sass">
</style>

