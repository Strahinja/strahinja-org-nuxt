<template lang="pug">
    .gist
        .gist-file
            .gist-data
                .js-gist-file-update-container.js-task-list-container.file-box
                    .file
                        .Box-body.p-0.blob-wrapper(itemprop="text")
                            table.highlight.tab-size.js-file-line-container(
                            data-tab-size="8",
                            v-html="formatGistLinesAsHtml(gistLines)")
            .gist-meta
                a.gist-raw(:href="gistRawUrl",
                target="_blank"
                :class=`{
                    'xs': $breakpoint.is.xsOnly
                }`) сиров преглед
                | #[a(href="#") {{ filename }}] хостује са &#10084;
                | #[a(href="https://github.com")] GitHub
</template>

<script>
export default {
    name: 'Gist',
    props: {
        gist: { type: Object, default: () => ({}), required: true },
        filename: { type: String, default: '', required: true },
        highlightedLine: { type: Number, default: 0, required: false },
    },
    computed: {
        gistRawUrl()
        {
            if (!this || !this.gist || !this.gist.files || this.filename.length==0
                || !this.gist.files[this.filename])
            {
                return null;
            }
            return this.gist.files[this.filename].raw_url;
        },
        gistLines()
        {
            if (!this || !this.gist || !this.gist.files || this.filename.length==0
                || !this.gist.files[this.filename])
            {
                return null;
            }
            return this.gist.files[this.filename].content;
        },
    },
    methods: {
        escapeHtml(html)
        {
            return html
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');
        },
        formatGistLinesAsHtml(lines)
        {
            let result = '';
            if (lines && lines.length>0)
            {
                let linesArray = lines.split('\n');
                for (let line in linesArray)
                {
                    result += (this.highlightedLine==parseInt(line)+1 ?
                        '<tr class="highlighted-line">\n' :
                        '<tr>\n') +
                    '<td class="blob-num js-line-number" data-line-number="' +
                    (parseInt(line)+1).toString() + '"></td>\n' +
                    '<td class="blob-code blob-code-inner js-file-line">' +
                    this.escapeHtml(linesArray[line]) +
                    '</td>\n' +
                    '</tr>\n';
                }
            }
            return result;
        }
    },
};
</script>

<style lang="sass">
@import '~/assets/sass/gist.sass'
</style>
