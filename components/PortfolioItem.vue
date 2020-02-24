<template lang="pug">
    v-hover
        template('#default'="{ hover }")
            v-card.pointer-arrow(hover=true,
            :color="getItemColor(itemIndex)",
            raised="10")
                v-img(:src="getImagePath(item.image_thumb)",
                style="min-height: 200px;",
                :aspect-ratio="16 / 9")
                    v-expand-transition
                        .d-flex.transition-fast-in-fast-out.v-card--reveal.white--text(
                        v-if="hover",
                        style="height: 100%;")
                            v-container.orange.darken-3.v-card--reveal-bg(
                            fill-height=true)
                                v-row/
                            v-container.pt-0.pb-0(fill-height=true,
                            grid-list-sm=true,
                            no-gutters=true)
                                v-row.text-center(align="center",
                                justify="center")
                                    v-col(:cols="12",
                                    :class=`{
                                        'text-center': $breakpoint.is.xsOnly
                                    }`)
                                        v-tooltip(bottom=true)
                                            template(v-slot:activator="{ on }")
                                                v-btn.text-xs-center.align-center(depressed=true,
                                                text=true,
                                                fab=true,
                                                dark=true,
                                                large=true,
                                                v-on="on",
                                                @click="cardPreview(getImagePath(item.image))")
                                                    v-icon.align-center(dark=true) mdi-eye
                                            span Преглед слике
                                    v-col(:cols="12",
                                    :class=`{
                                        'text-center': $breakpoint.is.xsOnly
                                    }`)
                                        v-tooltip(bottom=true)
                                            template(v-slot:activator="{ on }")
                                                v-btn.text-center.align-center(depressed=true,
                                                text=true,
                                                fab=true,
                                                dark=true,
                                                large=true,
                                                v-on="on",
                                                @click="cardNavigate(item.path)")
                                                    v-icon.align-center(dark=true) mdi-open-in-app
                                            span Отвори у новом прозору
                v-container(fluid=true,
                no-gutters=true)
                    v-row(fill-height=true)
                        v-col(:cols="12")
                            v-card-title.d-block(primary-title=true)
                                h3.headline.text-truncate {{ item.name }}
                                h4.subtitle-1 {{ item.short_desc }}
                            v-card-actions
                                v-spacer/
                                v-btn(:key="'card-arrow-button-' + itemIndex",
                                icon=true,
                                text=true,
                                @click="showCardText = !showCardText")
                                    v-icon(:class=`{
                                    'rotated': showCardText
                                }`) mdi-chevron-down
                            foldable(:folded="!showCardText")
                                v-card-text(:key="'card-text-' + itemIndex")
                                    p {{ prettyDateRange(item.created, item.modified) }}
                                    p {{ item.description }}
</template>

<script>
import Foldable from '~/components/Foldable.vue';

export default {
    name: 'PortfolioItem',
    components: { Foldable },
    props: {
        item: { type: Object, default: () => ({}) },
        itemIndex: { type: Number, default: -1 }
    },
    data()
    {
        return {
            showCardText: false
        };
    },
    methods: {
        cardPreview(url)
        {
            window.open(url, '_blank');
        },
        cardNavigate(url)
        {
            window.open(url, '_blank');
        },
        getImagePath(img)
        {
            return '/static/' + img;
        },
        getItemColor(itemIndex)
        {
            return (
                'orange lighten-' +
                (itemIndex % 6 > 3 ? 7 - (itemIndex % 6) : (itemIndex % 6) + 1)
            );
        },
        prettyDate(dateStr)
        {
            //eslint-disable-next-line no-unused-vars
            let [sdate, stime] = dateStr.split(' ');
            //eslint-disable-next-line no-unused-vars
            let [year, month, day] = sdate.split('-');
            //eslint-disable-next-line no-unused-vars
            let [hour, minute, sec] = stime.split(':');
            return '' + month + '.' + year;
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
        }
    }
};
</script>

<style scoped lang="sass">
.v-card--reveal
    align-items: center
    bottom: 0
    justify-content: center
    position: absolute
    width: 100%

.v-card--reveal-bg
    align-items: center
    bottom: 0
    justify-content: center
    opacity: .7
    position: absolute
    width: 100%
</style>
