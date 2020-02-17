<template lang="pug">
    v-bottom-sheet.login-sheet(v-model="sheetActive",
    :width="width")
        template(v-slot:activator="{ on }")
            slot(name="login-sheet-activator")
        login-form(:standalone="false",
        @close-button-clicked="sheetActive = false",
        @service-button-clicked="serviceBtnClick($event)")
</template>

<script>
import LoginForm from '~/components/LoginForm';

export default {
    name: 'LoginSheet',
    components: { LoginForm },
    props: {
        width: { type: Number, default: 500, required: false },
        active: { type: Boolean, default: false, required: false },
    },
    data()
    {
        return {
            sheetActive: false,
        };
    },
    watch:
    {
        active: function(newActive)
        {
            this.sheetActive = newActive;
        },
        sheetActive: function(newSheetActive)
        {
            this.$emit('active-changed', newSheetActive);
        }
    },
    methods: {
        serviceBtnClick(serviceName)
        {
            console.log('LoginSheet.serviceBtnClick(', serviceName, ')');
            this.sheetActive = false;
            this.$emit('service-button-clicked', serviceName);
        }
    }
};
</script>

<style lang="sass">
</style>

