<template lang="pug">
    .tdlist(ref="list"
    :class=`{
        xs: $breakpoint.is.xsOnly,
    }`)
        .tdlist-background
            .tdlist-background-inner(:style=`{
                'margin-left': backgroundMargin,
            }`)
                v-img(v-for="item,index in items"
                :contain="false"
                :width="clientWidth + unit"
                :key="item"
                :src="item.image")
        .tdlist-header
            slot(name="header")/
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
                    .tdlist-item-actions
                        v-btn(text
                        :disabled="item.image_active!='1'"
                        :href="item.image"
                        target="_blank")
                            v-icon mdi-image
                            | Слика екрана
                        v-btn(text
                        :disabled="item.path_active!='1'"
                        :href="item.path"
                        target="_blank")
                            v-icon mdi-open-in-new
                            | Отвори
                    h2 {{ item.name }}
                    p.description {{ item.description }}
                    p.date {{ prettyDateRange(item.created, item.modified) }}
        .tdlist-navigation.prev
            v-tooltip(bottom)
                template(#activator="{ on }")
                    v-btn(v-on="on"
                    fab small dark
                    :disabled="selectedItem==0"
                    color="primary"
                    @click="prevClick()")
                        v-icon mdi-chevron-left
                span Претходни пројекат
        .tdlist-navigation.next
            v-tooltip(bottom)
                template(#activator="{ on }")
                    v-btn(v-on="on"
                    fab small dark
                    :disabled="selectedItem==items.length-1"
                    color="primary"
                    @click="nextClick()")
                        v-icon mdi-chevron-right
                span Следећи пројекат
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
        backgroundMargin()
        {
            if (this.clientWidth > 0)
            {
                return ''
                    + (-this.clientWidth * this.selectedItem)
                    + this.unit;
            }
            return 0;
        },
        //selectedImage()
        //{
        //if (this.items && this.items[this.selectedItem])
        //{
        //return this.items[this.selectedItem].image;
        //}
        //return '';
        //},
    },
    mounted()
    {
        this.clientWidth = this.$refs.list.clientWidth;
        if (process.client)
        {
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
        prettyDate(dateStr)
        {
            if (dateStr && typeof(dateStr)==='string')
            {
                let [sdate/*, stime*/] = dateStr.split(' ');
                let [year, month/*, day*/] = sdate.split('-');
                //let [hour, minute, sec] = stime.split(':');
                return '' + month + '.' + year;
            }
            else
            {
                return '';
            }
        },
        prettyDateRange(startDate, endDate)
        {
            let startFormatted = this.prettyDate(startDate);
            let endFormatted = this.prettyDate(endDate);
            if (startFormatted === endFormatted)
            {
                return startFormatted;
            }
            else
            {
                return startFormatted + '-' + endFormatted;
            }
        },
    },
};
</script>

<style lang="sass" scoped>
@import '~/assets/sass/variables.sass'

.tdlist
    position: relative
    //overflow-x: hidden
    //overflow-y: visible
    overflow: hidden
    padding: 2em 0
    font-size: 85%
    height: 100%

.tdlist-navigation
    position: fixed
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

.tdlist-header
    position: relative
    color: #fff

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
    //border: 1px solid #000
    border-radius: 20px
    background: $app-sheet-background-color
    transition: all 0.25s ease
    cursor: pointer

.theme--dark .tdlist-item-inner
    background: $app-sheet-background-color-dark
    //border-color: #fff

.tdlist-item.left .tdlist-item-inner
    transform: scale(0.6) rotateY(-45deg)

.tdlist-item.right .tdlist-item-inner
    transform: scale(0.6) rotateY(45deg)

.tdlist-item-inner p.date
    font-weight: bold

.tdlist-item-actions
    margin-bottom: 1em
    //position: absolute
    //bottom: 1em

.tdlist-item-actions .v-btn
    font-size: 85%

.tdlist-background
    overflow: hidden
    //transform: translate(0, -50%)
    //top: 50%
    //left: 50%
    //width: 100%
    left: 0
    right: 0
    top: 0
    bottom: 0
    position: absolute

.tdlist-background:after
    content: ' '
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: var(--v-primary-base)
    opacity: .75

.tdlist-background-inner
    display: flex
    position: absolute
    justify-content: center
    flex-direction: row
    transition: all .25s ease
    filter: grayscale(1) contrast(.3) blur(5px)

</style>
