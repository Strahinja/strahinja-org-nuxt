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
    name: 'Login',
    middleware: ['auth'],
    data()
    {
        return {
            params: {},
        };
    },
    computed:
    {
        loggedIn()
        {
            if (this && this.$auth)
            {
                return this.$auth.loggedIn ? 'true' : 'false';
            }
            return 'N/A';
        },
        provider()
        {
            if (this && this.$route && this.$route.params)
            {
                return this.$route.params.provider;
            }
            return '';
        }
    },
    mounted()
    {
        let params = {};
        this.$auth.setStrategy(this.provider);
        /*if (this.$route.hash)
        {
            this.$route.hash
                .replace(/#/, '')
                .split('&')
                .forEach(param =>
                {
                    const [key, val] = param.split('=');
                    params[key] = val;
                });
            console.log('params = ', params);
            this.params = params;
            if (params.access_token)
            {
                console.log('auth.setUserToken');
                let token = params.access_token;
                if (this.provider == 'facebook' ||
                    this.provider == 'google')
                {
                    token = 'Bearer ' + token;
                }
                this.$auth.setUserToken(token)
                    .then(() =>
                    {
                        console.log('setUserToken ok, $auth = ', this.$auth);
                        this.$auth.fetchUser()
                            .then(() =>
                            {
                                console.log('after fetchUser, $auth = ', this.$auth);
                                console.log('this.user = ', this.$auth.user);
                            })
                            .catch(e =>
                            {
                                this.$toast.error('fetchUser error', {
                                    icon: 'mdi mdi-alert',
                                });
                                console.error('fetchUser error: ', e);
                            });
                    })
                    .catch(e =>
                    {
                        this.$toast.error('setUserToken error', {
                            icon: 'mdi mdi-alert',
                        });
                        console.error('setUserToken error: ', e);
                    });
            }
        }
        else
        {
            let code = this.$route.query.code;
            let state = this.$route.query.state;
        }*/
    },
    methods: {
    }
};
</script>

<style lang="sass">
</style>

