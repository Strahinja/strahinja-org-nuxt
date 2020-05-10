<template lang="pug">
    subpage(source-url)
        template(#header)
            h1.display-1 Програми
        canvas#dos-canvas
</template>

<script>
import Subpage from '~/components/Subpage';
export default {
    name: 'Programi',
    components: { Subpage },
    mounted()
    {
        if (process.client)
        {
            require('js-dos');
            /*const Dos = window.Dos;

            Dos(document.getElementById('dos-canvas')).ready((fs, main) =>
            {
                fs.extract('/programi/paskal/zvez.zip').then(() =>
                {
                    main(['-c', 'ZVEZ.EXE']);
                });
            });*/
        }
    },
};
</script>

<style lang="sass" scoped>
#canvas
    width: 800
    height: 600
    background: #000
    border: 1px solid #999
</style>
