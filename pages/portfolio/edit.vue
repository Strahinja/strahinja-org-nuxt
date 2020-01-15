<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <h3>Edit</h3>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'PortfolioEdit',
    middleware: ['auth'],
};
</script>

<style lang="sass">

</style>
