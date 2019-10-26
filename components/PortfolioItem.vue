<template>
    <v-hover>
        <template #default="{ hover }">
            <!--hover height="100%"-->
            <v-card
                hover
                :color="getItemColor(itemIndex)"
                class="pointer-arrow"
                raised="10">
                <v-img
                    :src="getImagePath(item.image_thumb)"
                    style="min-height: 200px;"
                    :aspect-ratio="16 / 9">
                    <v-expand-transition>
                        <div
                            v-if="hover"
                            class="d-flex transition-fast-in-fast-out v-card--reveal white--text"
                            style="height: 100%;">
                            <v-container
                                fill-height
                                class="orange darken-3 v-card--reveal-bg">
                                <v-row />
                            </v-container>
                            <v-container
                                fill-height grid-list-sm class="pt-0 pb-0"
                                no-gutters>
                                <v-row
                                    class="text-center" align="center"
                                    justify="center">
                                    <v-col
                                        :cols="12" :class="{'text-center':
                                            $breakpoint.is.xsOnly}">
                                        <v-btn
                                            depressed
                                            text
                                            fab
                                            dark
                                            large
                                            title="Преглед слике"
                                            class="text-xs-center align-center"
                                            @click="
                                                cardPreview(
                                                    getImagePath(item.image)
                                                )
                                            ">
                                            <v-icon dark class="align-center">
                                                mdi-eye
                                            </v-icon>
                                        </v-btn>
                                    </v-col>
                                    <v-col
                                        :cols="12" :class="{'text-center':
                                            $breakpoint.is.xsOnly}">
                                        <v-btn
                                            depressed
                                            text
                                            fab
                                            dark
                                            large
                                            title="Отвори у новом прозору"
                                            class="text-center align-center"
                                            @click="cardNavigate(item.path)">
                                            <v-icon dark class="align-center">
                                                mdi-open-in-app
                                            </v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </div>
                    </v-expand-transition>
                </v-img>
                <v-container fluid no-gutters>
                    <v-row fill-height>
                        <v-col :cols="12">
                            <v-card-title primary-title class="d-block">
                                <h3 class="headline text-truncate">
                                    {{ item.name }}
                                </h3>
                                <h4 class="subtitle-1">
                                    {{ item.short_desc }}
                                </h4>
                            </v-card-title>
                            <v-card-actions>
                                <v-spacer />
                                <v-btn
                                    :key="'card-arrow-button-' + itemIndex"
                                    icon
                                    text
                                    @click="showCardText = !showCardText">
                                    <v-icon :class="{'rotated': showCardText}">
                                        mdi-chevron-down
                                    </v-icon>
                                </v-btn>
                            </v-card-actions>
                            <v-slide-y-transition>
                                <v-card-text
                                    v-show="showCardText"
                                    :key="'card-text-' + itemIndex">
                                    <p>
                                        {{
                                            prettyDateRange(
                                                item.created,
                                                item.modified
                                            )
                                        }}
                                    </p>
                                    <p>{{ item.description }}</p>
                                </v-card-text>
                            </v-slide-y-transition>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </template>
    </v-hover>
</template>

<script>
export default {
    name: 'PortfolioItem',
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

<style scoped>
.v-card--reveal
 {
    align-items: center;
    bottom: 0;
    justify-content: center;
    position: absolute;
    width: 100%;
}

.v-card--reveal-bg
 {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .7;
    position: absolute;
    width: 100%;
}
</style>
