export default function({ route, redirect })
{
    //console.log('middleware/four-oh-four: route = ', route);
    if (route.matched.length == 0)
    {
        redirect('/error/404');
    }
}

