<!--template>
    <div class="dynamic-markdown">
        <component v-if="component && component()" :is="{ extends: component() }" ref="component"></component>
        <div v-else>Loading...</div>
    </div>
</template-->

<script>
export default {
    name: 'DynamicMarkdown',
    //eslint-disable-next-line vue/require-prop-types
    props: {
        highlight: { type: String, default: '' },
        //component: { type: Object, default: null, required: true },
        renderFunc: { type: Object, default: ({}) },
        staticRenderFuncs: { type: Object, default: ({}) },
        extraComponent: { type: String, default: null },
        extraComponentParams: { type: Object, default: null },
    },
    created()
    {
        /*this.templateRender = this.renderFunc;
        this.$options.staticRenderFns = this.staticRenderFuncs;*/
        this.templateRender = new Function(this.renderFunc)();
        this.$options.staticRenderFns = new Function(this.staticRenderFuncs)();
    },
    mounted()
    {
        this.$nextTick(() => {
            if (this.$refs.component)
            {
                this.applyHighlightDom(this.$refs.component.$el);
            }
        });
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
        /*applyHighlightDom(node)
        {
            console.log('applyHighlightDom: node = ', node, ', typeof node = ',
                typeof node, ', nodeType = ', node.nodeType);
            if (this.highlight.length>0 && node)
            {
                if (node.nodeType == 8)
                {
                    return [];
                }
                if (node.nodeType == 3)
                {
                    if (node.textContent.length >= this.highlight.length)
                    {
                        let result = [];
                        let i = 0;
                        let textSoFar = '';
                        while (i < node.textContent.length)
                        {
                            if (node.textContent.substring(
                                i,
                                i+this.highlight.length
                            )==this.highlight)
                            {
                                result.push(document.createTextNode(textSoFar));
                                let span = document.createElement('span');
                                span.textContent = this.highlight;
                                span.classList.add('highlight');
                                result.push(span);
                                textSoFar = '';
                                i += this.highlight.length;
                            }
                            else
                            {
                                textSoFar += node.textContent.substring(i, i+1);
                                i++;
                            }
                        }
                        if (textSoFar.length>0)
                        {
                            result.push(document.createTextNode(textSoFar));
                        }
                        return result;
                    }
                }

                if (node.childNodes && node.childNodes.length>0)
                {
                    let children = [];

                    node.childNodes.forEach(child =>
                    {
                        const result = this.applyHighlightDom(child);
                        if (Array.isArray(result))
                        {
                            children = children.concat(result);
                        }
                        else
                        {
                            children.push(result);
                        }
                    });
                    let i = 0;
                    while (i < node.childNodes.count)
                    {
                        node.removeChild(node.childNodes[i]);
                        i++;
                    }
                    children.forEach(child => node.appendChild(child));
                }
            }
            return node;
        },*/
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
