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
        async serviceBtnClick(serviceName)
        {
            console.log('Login.serviceBtnClick(', serviceName, ')');
            if (serviceName == 'facebook')
            {
                await this.$auth.loginWith('facebook')
                    .catch(e =>
                    {
                        console.log('Login.serviceBtnClick(await): ', e);
                        this.$toast.show('Login error', {
                            icon: 'mdi-user-question'
                        });
                    });
            }
        }
    }
};
</script>

<style lang="sass">
</style>

