<template>
    <div
        class="slicer-item"
        :class="{
            s6: s6(),
            s4: s4(),
            s3: s3()
        }">
        <a :href="link">
            <span
                class="overlay-background"
                :class="colorClass" />
            <span class="overlay">{{ title }}</span>
            <img :src="imageUrl">
        </a>
    </div>
</template>

<script>
export default {
    name: 'SlicerItem' ,

    props: {
        link: { type: String, default: ''
        },
        title:  { type: String, default:''},
        imageUrl: { type: String, default: ''},
        itemsLength: { type: Number, default: 0 },
        colorClass: { type: String, default: '' }
    },
    data()
    {
        return {};
    },
    methods   :
    {
        s6()
        {
            return this.itemsLength === 2;
        },
        s4()
        {
            return this.itemsLength === 3;
        },
        s3()
        {
            return this.itemsLength === 4;
        }
    }
};
</script>

<style scoped>
.slicer-item
 {
    font-size: 36px;
    overflow: hidden;
    display: inline-block;
    height: 200px;
    text-shadow: 0 0 10px rgba(0, 0, 0, .5);
}

.sm-and-down .slicer-item
 {
    font-size: 30px;
}

.xs .slicer-item
 {
    display: block;

    /* width: 100% !important; */
    font-size: 26px;
}

.slicer-item > a
 {
    color: #fff;
    text-decoration: none;
}

.slicer-item:not(:first-child)
 {
    clip-path: polygon(25px 0, 100% 0, calc(100% - 25px) 100%, 0 100%);
}

.slicer-item:first-child
 {
    clip-path: polygon(0 0, 100% 0, calc(100% - 25px) 100%, 0 100%);
}

.slicer-item:last-child
 {
    clip-path: polygon(25px 0, 100% 0, 100% 100%, 0 100%);
}

.xs .slicer-item:not(:first-child),
.xs .slicer-item:first-child,
.xs .slicer-item:last-child
 {
    clip-path: none;
}

.s4
 {
    width: 33.33%;
}

.s4:not(:first-child)
 {
    margin-left: -26px;
    width: calc(33.33% + 52px);
}

.s4:last-child
 {
    width: 33.33%;
}

.s3
 {
    width: 25%;
}

.s3:not(:first-child)
 {
    margin-left: -26px;
    width: calc(25% + 52px);
}

.s3:last-child
 {
    width: 25%;
}

.xs .s3,
.xs .s4
 {
    margin-left: -26px !important;
    width: calc(100% + 52px) !important;
}

.slicer-item > a
 {
    display: block;
    position: relative;
    width: 100%;
    height: 200px;
    line-height: 200px;
}

.overlay
 {
    display: block;
    position: absolute;
    width: calc(100% + 25px);
    top: 0;
    bottom: 0;
    text-align: center;
    background: rgba(0, 0, 0, .3);
    transform: skew(-8deg);
    left: -12px;
}

.xs .overlay
 {
    /* width: 100% !important;
    left: 0 !important; */
    width: calc(100% + 25px) !important;
    left: -12px !important;
    text-align: center !important;
    padding: 0 !important;
}

.slicer-item:first-child > a > .overlay
 {
    text-align: right;
    padding-right: 50px;
    left: auto;
    right: 0;
}

.xs .slicer-item:first-child > a > .overlay
 {
    padding-right: 25px;
}

.slicer-item:last-child > a > .overlay
 {
    text-align: left;
    padding-left: 50px;
    left: 0;
}

.xs .slicer-item:last-child > a > .overlay
 {
    padding-left: 25px;
}

.overlay-background
 {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    opacity: .5;
}
</style>
