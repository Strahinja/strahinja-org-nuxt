<template lang="pug">
    component(:is="dynamicComponent")
</template>

<script>
export default {
    name: 'DynamicMarkdown',
    //eslint-disable-next-line vue/require-prop-types
    props: {
        fileName: { type: String, default: '', required: true },
        standalone: { type: Boolean, default: true, required: false },
        highlight: { type: String, default: '', required: false },
        extraComponent: { type: String, default: null, required: false },
        extraComponentParams: { type: Object, default: null, required: false },
    },
    created()
    {
        this.dynamicComponent = () => import(`~/static/blog/${this.fileName}.md`).then((loaded) => {
            const fileName = this.fileName;
            const standalone = this.standalone;
            const highlight = this.highlight;
            const extraComponent = this.extraComponent;
            const extraComponentParams = this.extraComponentParams;
            return {
                data () {
                    return {
                        fileName,
                        standalone,
                        highlight,
                        extraComponent,
                        extraComponentParams
                    }
                },
                extends: loaded.vue.component,
                render (createElement)
                {
                    return this.templateRender
                        ? this.applyHighlight(this.templateRender(), createElement)
                        : createElement('div', 'Rendering...');
                },
                methods: {
                    applyHighlight(node, h)
                    {
                        let resultNode = node;

                        if (!this.standalone && resultNode
                            && resultNode.tag && resultNode.tag.toLowerCase() == 'h2')
                        {
                            let newNode = h('h3',
                               resultNode.data ? resultNode.data
                                : undefined,
                                resultNode.children);
                            newNode.parent = resultNode.parent;
                            resultNode = newNode;
                        }

                        if (this.highlight.length>0 && resultNode)
                        {
                            if (resultNode.text)
                            {
                                if (resultNode.text.length >= this.highlight.length)
                                {
                                    let result = [];
                                    let i = 0;
                                    let textSoFar = '';
                                    while (i < resultNode.text.length)
                                    {
                                        if (resultNode.text.substring(
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
                                            textSoFar += resultNode.text.substring(i, i+1);
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

                            if (resultNode.children && resultNode.children.length>0)
                            {
                                let children = [];

                                resultNode.children.forEach(child =>
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
                                resultNode.children = children;
                            }
                        }
                        return resultNode;
                    }
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
                            return {};
                        }
                        return this.extraComponentParams.gist;
                    }
                }
            };
        });
    }
};
</script>
