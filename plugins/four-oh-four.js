export default function ({ app })
{
    console.log('plugins/four-oh-four: app = ', app);
    app.router.beforeEach((to, from, next) =>
    {
        console.log('plugin/four-oh-four: beforeEach: to = ', to, ', from = ', from);
        if (to.matched.length == 0)
        {
            console.log('plugin/four-oh-four: redirecting to /error/404');
            app.router.push('/error/404');
        }
        next();
    });
}

