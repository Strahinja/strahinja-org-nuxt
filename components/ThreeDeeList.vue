<template lang="pug">
    .tdlist(ref="list")
        v-img.tdlist-background(:src="selectedImage")
        .tdlist-inner(:style=`{
            'margin-left': listMargin,
            width: listWidth,
        }`)
            .tdlist-item(v-for="item,index in items"
            :key="index"
            :class=`{
                left: index<selectedItem,
                center: index==selectedItem,
                right: index>selectedItem,
            }`
            @click="itemClick(index)")
                .tdlist-item-inner(:style=`{
                    'max-width': '' + itemWidth + unit,
                    'min-width': '' + itemWidth + unit,
                    'min-height': '' + itemHeight + unit,
                }`)
                    h2 {{ item.name }}
                    p {{ item.description }}
                    v-btn(text
                    large
                    :href="item.image"
                    target="_blank")
                        v-icon mdi-image
                        | Преглед слике
                    v-btn(text
                    large
                    :href="item.path"
                    target="_blank")
                        v-icon mdi-open-in-new
                        | Отвори
        .tdlist-navigation.prev
            v-btn(fab small dark
            :disabled="selectedItem==0"
            color="primary"
            @click="prevClick()")
                v-icon mdi-chevron-left
        .tdlist-navigation.next
            v-btn(fab small dark
            :disabled="selectedItem==items.length-1"
            color="primary"
            @click="nextClick()")
                v-icon mdi-chevron-right
</template>

<script>
export default {
    name: 'ThreeDeeList',
    props: {
        itemWidth: { type: Number, default: 60, required: false },
        itemHeight: { type: Number, default: 100, required: false },
        items: { type: Array, default: () => ([]), required: false },
    },
    data: function()
    {
        return {
            unit: 'px',
            selectedItem: 0,
            clientWidth: 0,
            onresizeListener: null,
            keyupListener: null,
        };
    },
    computed: {
        listWidth()
        {
            return '' + (this.itemWidth * this.items.length) + this.unit;
        },
        listMargin()
        {
            if (this.clientWidth > 0)
            {
                return ''
                    + (Math.floor(this.clientWidth/2)
                         -Math.floor(this.itemWidth/2)
                         -(this.selectedItem
                            * this.itemWidth))
                    + this.unit;
            }
            return 0;
        },
        selectedImage()
        {
            if (this.items && this.items[this.selectedItem])
            {
                return this.items[this.selectedItem].image;
            }
            return '';
        },
    },
    mounted()
    {
        this.clientWidth = this.$refs.list.clientWidth;
        if (!this.keyupListener)
        {
            this.keyupListener = document.addEventListener('keyup', (event) =>
            {
                this.onKeyup(event);
            });
        }
        if (!this.onresizeListener)
        {
            this.onresizeListener = window.onresize = () =>
            {
                if (this.clientWidth)
                {
                    console.log('resize: recalculating clientWidth');
                    this.clientWidth = this.$refs.list.clientWidth;
                }
            };
        }
    },
    methods: {
        itemClick(index)
        {
            this.selectedItem = index;
        },
        prevClick()
        {
            this.selectedItem--;
            if (this.selectedItem < 0)
            {
                this.selectedItem = 0;
            }
        },
        nextClick()
        {
            this.selectedItem++;
            if (this.selectedItem >= this.items.length)
            {
                this.selectedItem = this.items.length-1;
            }
        },
        onKeyup(event)
        {
            if (this.prevClick)
            {
                console.log('onKeyup: ', event);
                switch (event.code)
                {
                case 'h': case 'H': case 'х': case 'Х':
                case 'ArrowLeft':
                    this.prevClick();
                    break;
                case 'l': case 'L': case 'л': case 'Л':
                case 'ArrowRight':
                    this.nextClick();
                    break;
                default:
                }
            }
        },
    },
};
</script>

<style lang="sass" scoped>
.tdlist
    position: relative
    //overflow-x: hidden
    //overflow-y: visible
    overflow: hidden
    padding: 2em 0
    font-size: 80%

.tdlist-navigation
    position: absolute
    text-align: center
    top: 50%
    transform: translate(0 -50%)
    width: 3em
    height: 3em

.tdlist-navigation.prev
    left: 0

.tdlist-navigation.next
    right: 0

.tdlist-inner
    display: flex
    justify-content: center
    flex-direction: row
    transition: all 0.25s ease

.tdlist-item
    display: inline-flex
    //-margin-left: .5em
       margin-right: .5em
    perspective-origin: 50% 50%
    perspective: 50em
    transform: scale(1.0)

.tdlist-item:first-child
    margin-left: 0

.tdlist-item:last-child
    margin-right: 0

.tdlist-item-inner
    //-overflow: hidden
    padding: 1em
    //-border: 1px solid #000
       border-radius: 200px
    transition: all 0.25s ease
    cursor: pointer

.tdlist-item.left .tdlist-item-inner
    transform: scale(0.6) rotateY(-45deg)

.tdlist-item.right .tdlist-item-inner
    transform: scale(0.6) rotateY(45deg)

.tdlist-background
    //transform: translate(0, -50%)
    filter: grayscale(1) contrast(.3)
    //top: 50%
    //left: 50%
    //width: 100%
    left: 0
    right: 0
    top: 0
    bottom: 0
    position: absolute
    opacity: 0.2
</style>
