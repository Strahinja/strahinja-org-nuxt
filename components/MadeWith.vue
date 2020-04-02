<template lang="pug">
    a.madewith-link(:href="url",
    target="_blank")
        slot/
        span.madewith-title {{ title }}
</template>

<script>
export default {
    name: 'MadeWith',
    props: {
        title: { type: String, default: '' },
        preserveAspect: { type: Boolean, default: true },
        width: { type: Number, default: -1 },
        height: { type: Number, default: 75 },
        fill: { type: String, default: '' },
        url: { type: String, default: '#' }
    },
    data()
    {
        return {
            initialWidth: '',
            initialHeight: '',
            initialFill: '',
            initialViewbox: ''
        };
    },
    watch: {
        width: {
            set: function(newWidth)
            {
                this.setWidth(newWidth);
                //this.setViewbox();
            }
        },
        height: {
            set: function(newHeight)
            {
                this.setHeight(newHeight);
                //this.setViewbox();
            }
        },
        fill: {
            set: function(newFill)
            {
                this.setFill(newFill);
            }
        }
    },
    mounted()
    {
        this.$nextTick(() =>
        {
            if (!!this.$el && !!this.$el.firstChild)
            {
                let initialWidth = this.$el.firstChild.getAttribute('width');
                let initialHeight = this.$el.firstChild.getAttribute('height');
                let initialFill = this.$el.firstChild.getAttribute('fill');
                let initialViewbox = this.$el.firstChild.getAttribute('viewBox');

                if (initialViewbox) this.initialViewbox = initialViewbox;

                if (initialWidth) this.initialWidth = initialWidth;
                if (this.width != -1) this.setWidth(this.width, this.preserveAspect);
                if (initialHeight) this.initialHeight = initialHeight;
                if (this.height != -1) this.setHeight(this.height, this.preserveAspect);
                if (initialFill) this.initialFill = initialFill;
                if (this.fill.length>0) this.setFill(this.fill);
            //this.setViewbox();
            }

        });
    },
    methods: {
        setViewbox()
        {
            if (!!this.$el && !!this.$el.firstChild)
            {
                let w = this.initialWidth, h = this.initialHeight;
                if (this.width != -1) w = this.width.toString();
                if (this.height != -1) h = this.height.toString();
                this.$el.firstChild.setAttribute(
                    'viewBox',
                    '0 0 ' + w + ' ' + h
                );
            }
        },
        getRatio: function()
        {
            let ratio = 1;
            if (this.initialViewbox.length>0)
            {
                // eslint-disable-next-line no-unused-vars
                let [left, top, width, height] = this.initialViewbox
                    .split(' ').map(v => parseInt(v));
                let initialWidth = width;
                let initialHeight = height;
                if (initialHeight != 0) ratio = initialWidth /
                        initialHeight;
            }
            return ratio;
        },
        setWidth: function(newWidth, preserveAspect = false)
        {
            if (!!this.$el && !!this.$el.firstChild)
            {
                let w;
                if (newWidth != -1)
                {
                    w = newWidth;
                    this.$el.firstChild.setAttribute('width',
                                                     w.toString());
                }
                else
                {
                    w = parseInt(this.initialWidth);
                    this.$el.firstChild.setAttribute('width', this.initialWidth);
                }

                if (preserveAspect)
                {
                    this.setHeight(w / this.getRatio());
                }
            }
        },
        setHeight: function(newHeight, preserveAspect = false)
        {
            if (!!this.$el && !!this.$el.firstChild)
            {
                let h;
                if (newHeight != -1)
                {
                    h = newHeight;
                    this.$el.firstChild.setAttribute('height',
                                                     h.toString());
                }
                else
                {
                    h = parseInt(this.initialHeight);
                    this.$el.firstChild.setAttribute('height', this.initialHeight);
                }

                if (preserveAspect)
                {
                    this.setWidth(this.getRatio() * h);
                }
            }
        },
        setFill: function(newFill)
        {
            if (!!this.$el && !!this.$el.firstChild)
            {
                let nodesWithFill = this.$el.querySelectorAll('[fill]');

                nodesWithFill.forEach(node => node.removeAttribute('fill'));
                if (newFill.length>0)
                {
                    this.$el.firstChild.setAttribute('fill', newFill);
                }
                else
                {
                    this.$el.firstChild.setAttribute('fill', this.initialFill);
                }
            }
        }
    }
};
</script>

<style lang="sass" scoped>
.madewith-link
    max-height: 100px
    display: block
    filter: grayscale(1)
    opacity: 0.5
    cursor: pointer
    text-decoration: none
    transition: all 0.3s ease
    white-space: nowrap
    margin-bottom: 40px

.madewith-link:hover
    filter: none
    opacity: 1
    transition: all 0.3s ease

.madewith-link > *
    display: inline-block
    vertical-align: middle

.madewith-title
    font-family: $heading-font-family
    font-weight: $heading-font-weight
    font-size: 30px
</style>

