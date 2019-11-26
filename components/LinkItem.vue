<template>
    <v-card
        :color="getItemColor(itemIndex)"
        raised="10"
        class="link-item">
        <v-container fluid no-gutters class="pa-0">
            <v-row class="ma-0">
                <v-col :cols="12" class="pa-0">
                    <v-card-title>
                        <a
                            :href="item.url"
                            target="_blank">
                            <v-icon>
                                mdi-bookmark
                            </v-icon>
                            {{ prettyUrl(item.url) }}
                        </a>
                    </v-card-title>
                    <v-card-subtitle>
                        <v-icon>
                            mdi-cursor-default-click
                        </v-icon>
                        Посећено: {{ prettyDate(item.visited) }}
                    </v-card-subtitle>
                    <v-card-actions>
                        <v-spacer />
                        <v-btn
                            icon
                            @click="expanded = !expanded">
                            <v-icon>
                                {{
                                    expanded ?
                                        'mdi-chevron-up' :
                                        'mdi-chevron-down'
                                }}
                            </v-icon>
                        </v-btn>
                    </v-card-actions>
                    <v-expand-transition>
                        <v-card-text v-show="expanded">
                            <p v-html="item.description" />
                        </v-card-text>
                    </v-expand-transition>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
export default {
    name: 'LinkItem',
    props: {
        expanded: { type: Boolean, default: false },
        item: { type: Object, default: null},
        itemIndex: { type: Number, default: 0 },
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

<style lang="sass">
.link-item .v-icon.v-icon
    line-height: 1.3rem
    vertical-align: middle

.link-item .v-card__title
    padding-top: 1.3rem
    padding-bottom: 1.3rem

.link-item .v-card__title,
.link-item .v-card__subtitle
    align-content: start

.link-item .v-card__title a,
.link-item .v-card__subtitle a
    padding-left: 1.3928rem
    position: relative
    line-height: 1.3rem
    color: rgba(0,0,0,.87)
    text-decoration: none
    word-break: normal
    text-overflow: ellipsis
    overflow-wrap: normal
    overflow-x: hidden

.link-item .v-card__subtitle:hover a,
.link-item .v-card__title:hover a
    word-break: break-word
    text-overflow: ellipsis
    overflow-wrap: break-word
    overflow-x: auto

.link-item .v-card__title a i
    position: absolute
    margin-left: -1.3928rem

// .link-item .v-card__title:hover a,
   .link-item .v-card__title:hover a i
   color: #fff
   transition: all .5s ease

</style>
