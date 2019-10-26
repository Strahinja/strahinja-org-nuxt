<template>
    <vue-markdown>
        <slot />
    </vue-markdown>
</template>

<script>
import { VueMarkdown } from 'vue-markdown';

export default {
    name: 'MarkdownText',
    components: {
        VueMarkdown
    },
    props: {
    },
    data()
    {
    }
};
</script>

<style lang="sass" scoped>
</style>

