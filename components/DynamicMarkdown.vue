<script>
export default {
    name: 'DynamicMarkdown',
    //eslint-disable-next-line vue/require-prop-types
    props: [ 'highlight', 'renderFunc', 'staticRenderFuncs', 'extraComponent' ],
    computed: {
        extraComponentLoader()
        {
            if (!this.extraComponent)
            {
                return null;
            }
            return () =>
                require(`~/components/blog/${this.extraComponent}.vue`);
        }
    },
    mounted()
    {
    },
    created()
    {
        this.templateRender = new Function(this.renderFunc)();
        this.$options.staticRenderFns = new Function(this.staticRenderFuncs)();
        /*console.log('DynamicMarkdown.created: templateRender = ',
                    this.templateRender);
        console.log('DynamicMarkdown.created: staticRenderFns = ',
                    this.$options.staticRenderFns);*/
    },
    render (createElement)
    {
        /*console.log('DynamicMarkdown.render: return = ',
                    this.templateRender ? this.templateRender() :
                        createElement('div', 'Rendering...'));*/
        return this.templateRender ? this.templateRender() :
            createElement('div', 'Rendering...');
    }
};
</script>
