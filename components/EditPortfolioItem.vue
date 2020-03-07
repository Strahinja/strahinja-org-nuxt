<template lang="pug">
    v-list-item(selectable=true,
    link=true)
        v-container(fluid=true)
            v-row
                v-col
                    v-text-field(label="Name",
                    dense=true,
                    v-model="itemName")
                v-col
                    v-text-field(label="Description",
                    dense=true,
                    v-model="itemDesc")
                v-col
                    v-text-field(label="Short Description",
                    dense=true,
                    v-model="itemShortDesc")
            v-row
                v-col
                    v-text-field(label="Image",
                    dense=true,
                    v-model="itemImage")
                v-col
                    v-text-field(label="Thumbnail Image",
                    dense=true,
                    v-model="itemThumbImage")
                v-col(:justify-self="'end'")
                    v-tooltip(bottom=true)
                        template.text-center.align-center(v-slot:activator="{ on }")
                            v-btn.spaced(fab=true,
                            color="success",
                            dark=true,
                            depressed=true,
                            small=true,
                            v-on="on")
                                v-icon.align-center(dark=true) mdi-content-save
                        span Сачувај
                    v-tooltip(bottom=true)
                        template.text-center.align-center(v-slot:activator="{ on }")
                            v-btn.spaced(fab=true,
                            color="primary",
                            dark=true,
                            depressed=true,
                            small=true,
                            v-on="on")
                                v-icon.align-center(dark=true) mdi-chevron-up
                        span Помери нагоре
                    v-tooltip(bottom=true)
                        template.text-center.align-center(v-slot:activator="{ on }")
                            v-btn.spaced(fab=true,
                            color="primary",
                            dark=true,
                            depressed=true,
                            small=true,
                            v-on="on")
                                v-icon.align-center(dark=true) mdi-chevron-down
                        span Помери надоле

</template>

<script>
export default {
    name: 'EditPortfolioItem',
    props: {
        item: { type: Object, default: null, required: true },
    },
    data()
    {
        return {
            itemName: '',
            itemDesc: '',
            itemShortDesc: '',
            itemImage: '',
            itemThumbImage: '',
        };
    },
    watch: {
        item(newItem)
        {
            this.itemName = newItem.name;
            this.itemDesc = newItem.description;
            this.itemShortDesc = newItem.short_desc;
            this.itemImage = newItem.image;
            this.itemThumbImage = newItem.image_thumb;
        },
        itemName(newName)
        {
            if (this.item)
            {
                this.item.name = newName;
            }
        },
        itemDesc(newDesc)
        {
            if (this.item)
            {
                this.item.description = newDesc;
            }
        },
        itemShortDesc(newShortDesc)
        {
            if (this.item)
            {
                this.item.short_desc = newShortDesc;
            }
        },
        itemImage(newImage)
        {
            if (this.item)
            {
                this.item.image = newImage;
            }
        },
        itemThumbImage(newThumbImage)
        {
            if (this.item)
            {
                this.item.image_thumb = newThumbImage;
            }
        },
    }
};
</script>

<style scoped lang="sass">
.spaced
    margin-right: 1em
</style>
