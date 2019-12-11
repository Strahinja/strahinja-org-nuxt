<template>
    <div class="login">
        <h1>Logged In</h1>
        <p>
            provider = {{ provider }}
            params = {{ params }}
        </p>
    </div>
</template>

<script>

export default {
    name: 'Login',
    data()
    {
        return {
            params: {},
        };
    },
    computed:
    {
        provider()
        {
            if (this)
            {
                console.log('this.$route = ', this.$route);
            }
            if (this && this.$route && this.$route.params)
            {
                console.log('this.$route.params = ', this.$route.params);
                return this.$route.params.provider;
            }
            return '';
        }
    },
    mounted()
    {
        this.$auth.getToken('facebook');
        let params = {};
        if (this.$route.hash)
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
                this.$auth.setToken('facebook', params.access_token);
                this.$auth.getToken('facebook');
            }
        }
    },
    methods: {
    }
};
</script>

<style lang="sass">
</style>

