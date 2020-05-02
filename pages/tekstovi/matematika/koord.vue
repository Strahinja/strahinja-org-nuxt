<template lang="pug">
    static-markdown(link-id="koord")
</template>

<script>
import StaticMarkdown from '~/components/StaticMarkdown';
export default {
    name: 'Koord',
    components: { StaticMarkdown },
    head: {
        link: [
            {
                rel: 'stylesheet',
                href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.11.1/katex.min.css'
            },
        ],
    },
};
</script>

