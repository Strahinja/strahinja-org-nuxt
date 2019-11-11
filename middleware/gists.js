import axios from 'axios';
import gistIds from '../static/blog/blog-gist-ids.json';

export default function ({ store })
{
    gistIds.forEach(async gistId =>
    {
        const gistRes = await axios.get(//`https://gist.github.com/${gistId}.json`);
            `https://api.github.com/gists/${gistId}`);
        if (gistRes && gistRes.data)
        {
            store.commit('gists/addGistRes', {
                gistId: gistId,
                data: gistRes.data
            });
        }
    });
}

