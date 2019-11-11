<script>
export default {
    name: 'DynamicMarkdown',
    //eslint-disable-next-line vue/require-prop-types
    props: [ 'highlight', 'renderFunc', 'staticRenderFuncs', 'extraComponent',
        'extraComponentParams' ],
    created()
    {
        /*this.templateRender = this.renderFunc;
        this.$options.staticRenderFns = this.staticRenderFuncs;*/
        this.templateRender = new Function(this.renderFunc)();
        this.$options.staticRenderFns = new Function(this.staticRenderFuncs)();
    },
    computed: {
        extraComponentLoader()
        {
            if (!this || !this.extraComponent)
            {
                return null;
            }
            return () => import(`~/components/blog/${this.extraComponent}.vue`);
        },
        gist()
        {
            if (!this || !this.extraComponentParams ||
                !this.extraComponentParams.gist)
            {
                return null;
            }
            return this.extraComponentParams.gist;
        }
    },
    methods: {
        applyHighlight(node, h)
        {
            if (this.highlight.length>0 && node)
            {
                if (node.text)
                {
                    if (node.text.length >= this.highlight.length)
                    {
                        let result = [];
                        let i = 0;
                        let textSoFar = '';
                        while (i < node.text.length)
                        {
                            if (node.text.substring(
                                i,
                                i+this.highlight.length
                            )==this.highlight)
                            {
                                result.push(this._v(String(textSoFar)));
                                result.push(h('span', {
                                    class: 'highlight'
                                }, this.highlight));
                                textSoFar = '';
                                i += this.highlight.length;
                            }
                            else
                            {
                                textSoFar += node.text.substring(i, i+1);
                                i++;
                            }
                        }
                        if (textSoFar.length>0)
                        {
                            result.push(this._v(String(textSoFar)));
                        }
                        return result;
                    }
                }

                if (node.children && node.children.length>0)
                {
                    let children = [];

                    node.children.forEach(child =>
                    {
                        const result = this.applyHighlight(child, h);
                        if (Array.isArray(result))
                        {
                            children = children.concat(result);
                        }
                        else
                        {
                            children.push(result);
                        }
                    });
                    node.children = children;
                }
            }
            return node;
        }
    },
    render (createElement)
    {
        return this.templateRender ? this.applyHighlight(this.templateRender(),
                                                         createElement) :
            createElement('div', 'Rendering...');
    }
};
</script>
