export default function({ route, store, error })
{
    console.log('middleware/four-oh-four: route = ', route);
    if (route.matched.length == 0)
    {
        console.log('middleware/four-oh-four: throwing error');
        error({ statusCode: 404, message: store.getters['errors/messageByCode'](404) });
    }
}

