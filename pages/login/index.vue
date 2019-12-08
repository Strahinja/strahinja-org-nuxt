<template>
    <div class="login">
        <login-form
            :standalone="true"
            @service-button-clicked="serviceBtnClick($event)" />
    </div>
</template>

<script>
import LoginForm from '~/components/LoginForm';

export default {
    name: 'Login',
    components: { LoginForm },
    methods: {
        serviceBtnClick(serviceName)
        {
            console.log('Login.serviceBtnClick(', serviceName, ')');
        }
    }
};
</script>

<style lang="sass">
</style>

