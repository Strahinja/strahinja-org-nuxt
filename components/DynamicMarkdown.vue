<template lang="pug">
    component(:is="dynamicComponent")
</template>

<script>
export default {
    name: 'DynamicMarkdown',
    //eslint-disable-next-line vue/require-prop-types
    props: {
        fileName: { type: String },
        highlight: { type: String, default: '' },
        extraComponent: { type: String, default: null },
        extraComponentParams: { type: Object, default: null },
    },
    created()
    {
        this.dynamicComponent = () => import(`~/static/blog/${this.fileName}.md`).then((loaded) => {
            const highlight = this.highlight;
            const extraComponent = this.extraComponent;
            const extraComponentParams = this.extraComponentParams;
            return {
                data () {
                    return {
                        highlight,
                        extraComponent,
                        extraComponentParams
                    }
                },
                extends: loaded.vue.component,
                render (createElement)
                {
                    return this.templateRender ? this.applyHighlight(this.templateRender(),
                                                                    createElement) :
                        createElement('div', 'Rendering...');
                },
                methods: {
                    applyHighlight(node, h)
                    {
                        if (highlight.length>0 && node)
                        {
                            if (node.text)
                            {
                                if (node.text.length >= highlight.length)
                                {
                                    let result = [];
                                    let i = 0;
                                    let textSoFar = '';
                                    while (i < node.text.length)
                                    {
                                        if (node.text.substring(
                                            i,
                                            i+highlight.length
                                        )==highlight)
                                        {
                                            result.push(this._v(String(textSoFar)));
                                            result.push(h('span', {
                                                class: 'highlight'
                                            }, highlight));
                                            textSoFar = '';
                                            i += highlight.length;
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
