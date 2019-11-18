<template>
    <v-container class="no-results py-0">
        <v-row>
            <v-col class="pa-0">
                <v-img
                    :width="300"
                    :height="300"
                    :src="image"
                    class="mx-auto">
                    <div class="text-center">
                        {{ message }}
                    </div>
                </v-img>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'NoResults',
    props: {
        message: { type: String, default: 'Ништа није пронађено', required: false },
        image: { type: String, default: '/img/no-results-generic.svg', required: false },
    },
};
</script>

<style type="sass">
.no-results .v-image .v-image__image
{
    opacity: .1;
}

.no-results .v-image .v-responsive__content
{
    align-self: center;
}
</style>

