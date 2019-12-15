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
            if (serviceName == 'facebook' || serviceName == 'google' ||
                serviceName == 'github')
            {
                await this.$auth.loginWith(serviceName)
                    .then(() =>
                    {
                        this.refreshOnAuthChange = new Date().toISOString();
                        this.$toast.success('Пријављивање успело!', {
                            icon: 'mdi mdi-account-check',
                        });
                        console.log('this.$auth.loggedIn = ',
                                    this.$auth.loggedIn ? 'true' : 'false');
                        console.log('thia.$auth.user = ', this.$auth.user);
                    })
                    .catch(e =>
                    {
                        console.log('layouts/default.vue.loginSheetServiceBtnClick(await): ', e);
                        this.$toast.error('Грешка при пријављивању', {
                            icon: 'mdi mdi-alert',
                            /*action: {
                                text: 'Одбаци',
                                onClick: (e, toastObject) =>
                                {
                                    toastObject.goAway(0);
                                }
                            },*/
                        });
                    });
            }
        }
    }
};
</script>

<style lang="sass">
</style>

