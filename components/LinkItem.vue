<template>
    <v-card
        hover
        height="100%"
        :color="getItemColor(itemIndex)"
        raised="10"
        @click="cardNavigate(item.url)">
        <v-container fluid no-gutters class="pa-0">
            <v-row class="ma-0">
                <v-col :cols="12" class="pa-0">
                    <v-card-title>
                        <v-container fluid no-gutters>
                            <v-row class="ma-0">
                                <v-col :cols="12">
                                    <h4 class="title text-truncate">
                                        {{ prettyUrl(item.url) }}
                                    </h4>
                                </v-col>
                                <v-col :cols="12">
                                    <h4 class="subtitle-1">
                                        Посећено: {{ prettyDate(item.visited) }}
                                    </h4>
                                </v-col>
                                <v-col :cols="12">
                                    <p v-html="item.description" />
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-title>
                    <v-card-actions />
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
export default {
    name: 'LinkItem',
    props: {
        item: { type: Object, default: null},
        itemIndex: { type: Number, default: 0 },
    },
    data()
    {
        return {};
    },
    methods: {
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
                'light-blue lighten-' +
                (itemIndex % 6 > 3 ? 7 - (itemIndex % 6) : (itemIndex % 6) + 1)
            );
        },
        prettyUrl(url)
        {
            if (url)
            {
                return url.replace(/https?:\/\//gi, '').replace(/\/$/g, '');
            }
            else
            {
                return '';
            }
        },
        prettyDate(dateStr)
        {
            if (dateStr)
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

<style scoped></style>
