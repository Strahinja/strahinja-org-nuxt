<template lang="pug">
    v-bottom-sheet.login-sheet(v-model="sheetActive",
    inset,
    :max-width="width",
    :width="width")
        template(v-slot:activator="{ on }")
            slot(name="login-sheet-activator")
        login-form(:standalone="false",
        @login-success="setSheetActive(false)",
        @close-button-clicked="setSheetActive(false)",
        @service-button-clicked="serviceBtnClick($event)")
</template>

<script>
//import LoginForm from '~/components/LoginForm';

export default {
    name: 'LoginSheet',
    //components: { LoginForm },
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
            /*console.log('components/LoginSheet.vue: passed parameter changed,'
                + ' setting this.sheetActive = ', newActive);*/
            this.sheetActive = newActive;
        },
        sheetActive(newValue)
        {
            this.$emit('active-changed', newValue);
        }
    },
    methods: {
        serviceBtnClick(serviceName)
        {
            //console.log('LoginSheet.serviceBtnClick(', serviceName, ')');
            this.setSheetActive(false);
            this.$emit('service-button-clicked', serviceName);
        },
        setSheetActive(newValue)
        {
            /*console.log('components/LoginSheet.vue: setSheetactive(', newValue,
                        ')');*/
            this.sheetActive = newValue;
            this.$emit('active-changed', newValue);
        },
    }
};
</script>

<style lang="sass">
</style>

