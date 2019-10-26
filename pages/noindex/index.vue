<template>
    <v-layout
        row
        mt-3
        mb-7
        no-gutters
        wrap>
        <v-flex
            xs2 sm1
            class="align-center text-center"
            style="

                min-width: 60px;">
            <v-btn
                fab depressed dark small
                :to="'/'"
                color="secondary"
                class="text-center align-center mr-3 mt-1">
                <v-icon
                    dark
                    class="align-center">
                    mdi-arrow-left
                </v-icon>
            </v-btn>
        </v-flex>
        <v-flex
            xs8
            sm10>
            <h3 class="display-1">
                Код 401: Уклоњено
            </h3>
            <p>Ова страница је премештена или уклоњена.</p>
        </v-flex>
    </v-layout>
</template>
<script>
export default {
    name: 'Noindex',
    head()
    {
        let globals = {
            title: 'Уклоњено',
        };
        return {
            meta: [
                { name: 'robots', content: 'noindex' }
            ],
            title: globals.title,
        };
    }
};
</script>
<style lang="sass" scoped>
</style>

