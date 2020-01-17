export default function ({ app, route })
{
    console.log('plugins/four-oh-four: route = ', route);
    app.router.beforeEach((to, from, next) =>
    {
        console.log('plugin/four-oh-four: beforeEach: to = ', to, ', from = ', from);
        if (to.matched.length == 0)
        {
            app.router.push('/error/404');
        }
        next();
    });
}

