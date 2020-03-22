<template lang="pug">
    v-list-item(:key="item.link_id",
    :ripple="false")
        v-container.pa-0(fluid,
        :key="item.link_id")
            v-row
                v-col(:cols="12",
                :sm="6")
                    v-container(fluid)
                        v-row
                            v-col.pa-0
                                v-text-field(label="Назив",
                                v-model="item.name")
                        v-row
                            v-col.pa-0
                                v-text-field(label="Кратак опис",
                                v-model="item.short_desc")
                v-col(:cols="12",
                :sm="6")
                    v-textarea(label="Опис",
                    :rows="4",
                    v-model="item.description")
            v-row
                v-col(:cols="12",
                :sm="3")
                    v-container.pa-0(fluid)
                        v-row
                            v-col.py-0
                                v-datetime-picker(label="Датум настанка",
                                date-format="yyyy-MM-dd",
                                time-format="HH:mm:ss",
                                :clear-text="clearTextLabel",
                                :ok-text="okTextLabel",
                                :date-picker-props="datePickerProps",
                                :text-field-props="textFieldProps",
                                :time-picker-props="timePickerProps",
                                v-model="item.created")
                                    template('v-slot:dateIcon'='')
                                        v-icon mdi-calendar
                                    template('v-slot:timeIcon'='')
                                        v-icon mdi-calendar-clock
                        v-row
                            v-col.py-0
                                v-datetime-picker(label="Датум измене",
                                date-format="yyyy-MM-dd",
                                time-format="HH:mm:ss",
                                :clear-text="clearTextLabel",
                                :ok-text="okTextLabel",
                                :date-picker-props="datePickerProps",
                                :text-field-props="textFieldProps",
                                :time-picker-props="timePickerProps",
                                v-model="item.modified")
                                    template('v-slot:dateIcon'='')
                                        v-icon mdi-calendar
                                    template('v-slot:timeIcon'='')
                                        v-icon mdi-calendar-clock
                v-col(:cols="12",
                :sm="3")
                    v-text-field(label="Веза",
                    dense,
                    v-model="item.path")
                v-col(:cols="12",
                :sm="3")
                    v-container.pa-0(fluid)
                        v-row
                            v-col.py-0
                                v-text-field(label="Слика",
                                dense,
                                v-model="item.image")
                        v-row
                            v-col.py-0
                                v-text-field(label="Умањени приказ",
                                dense,
                                v-model="item.image_thumb")
                v-col(:cols="12",
                :sm="3")
                    v-container.full-height(fluid)
                        v-row.full-height(align="end")
                            v-col.pa-0.d-flex.flex-end(align-self="end")
                                v-tooltip(bottom)
                                    template.text-center.align-center(v-slot:activator="{ on }")
                                        v-btn.spaced(fab,
                                        color="success",
                                        light,
                                        depressed,
                                        small,
                                        v-on="on")
                                            v-icon.align-center(light) mdi-content-save
                                    span Сачувај
                                v-tooltip(bottom)
                                    template.text-center.align-center(v-slot:activator="{ on }")
                                        v-btn.spaced(fab,
                                        color="primary",
                                        :disabled="upBtnDisabled",
                                        :dark="upBtnDark",
                                        :light="!upBtnDark",
                                        depressed,
                                        small,
                                        v-on="on",
                                        @click="$emit('move-up-clicked')")
                                            v-icon.align-center(dark) mdi-chevron-up
                                    span Помери нагоре
                                v-tooltip(bottom)
                                    template.text-center.align-center(v-slot:activator="{ on }")
                                        v-btn.spaced(fab,
                                        color="primary",
                                        :disabled="downBtnDisabled",
                                        :dark="downBtnDark",
                                        :light="!downBtnDark",
                                        depressed,
                                        small,
                                        v-on="on",
                                        @click="$emit('move-down-clicked')")
                                            v-icon.align-center(dark) mdi-chevron-down
                                    span Помери надоле

</template>

<script>
export default {
    name: 'EditPortfolioItem',
    props: {
        item: { type: Object, default: () =>
        {
            return {
                name: '',
                description: '',
                short_desc: '',
                link_id: '',
                image: '',
                image_thumb: '',
            };
        }, required: true },
        itemIndex: { type: Number, default: 0, required: true },
        itemCount: { type: Number, default: 0, required: true },
    },
    data()
    {
        return {
            okTextLabel: 'ОК',
            clearTextLabel: 'Очисти',
            textFieldProps: {
                dense: true,
            },
            datePickerProps: {
                locale: 'sr',
            },
            timePickerProps: {
                format: '24hr',
                useSeconds: true,
            },
        };
    },
    computed:
    {
        upBtnDisabled()
        {
            return this.itemIndex < 1;
        },
        downBtnDisabled()
        {
            return this.itemIndex > this.itemCount-2;
        },
        upBtnDark()
        {
            return this.upBtnDisabled ?
                this.$store.getters['pages/isThemeDark']
                : true;
        },
        downBtnDark()
        {
            return this.downBtnDisabled ?
                this.$store.getters['pages/isThemeDark']
                : true;
        },
    },
    mounted()
    {
        if (this && this.item && this.item.link_id)
        {
            console.log('EditPortfolioItem.mounted: link_id = ',
                        this.item.link_id);
        }
        else
        {
            console.log('EditPortfolioItem.mounted: this = null');
        }
    }
};
</script>

<style scoped lang="sass">
.flex-end
    justify-content: flex-end !important

.v-list-item:nth-child(2n+1)
    background-color: rgba(0,0,0,.05)

.v-list-item:nth-child(2n)
    background-color: rgba(0,0,0,.1)

.v-application.theme--dark .v-list-item:nth-child(2n+1)
    background-color: rgba(255,255,255,.05)

.v-application.theme--dark .v-list-item:nth-child(2n)
    background-color: rgba(255,255,255,.1)

.spaced
    margin-right: 1em
</style>
