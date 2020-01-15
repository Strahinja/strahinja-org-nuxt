export default
{
    created()
    {
        console.log('mixins/four-oh-four.created: route = ', this.$route);
        if (this.$route.matched.length == 0)
        {
            this.$router.push('/error/404');
        }
    },
    mounted()
    {
        console.log('mixins/four-oh-four.mounted: route = ', this.$route);
        if (this.$route.matched.length == 0)
        {
            this.$router.push('/error/404');
        }
    },
    fetch({ route, app })
    {
        console.log('mixins/four-oh-four.fetch: route = ', route);
        if (route.matched.length == 0)
        {
            app.router.push('/error/404');
        }
    }
};

