<script>
export default {
    name: 'DynamicMarkdown',
    //eslint-disable-next-line vue/require-prop-types
    props: [ 'renderFunc', 'staticRenderFuncs', 'extraComponent' ],
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
    },
    render (createElement)
    {
        return this.templateRender ? this.templateRender() :
            createElement('div', 'Rendering...');
    }
};
</script>
