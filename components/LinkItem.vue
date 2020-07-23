<template lang="pug">
    v-scale-transition(appear hide-on-leave)
        v-skeleton-loader(v-if="thumbnailLoading"
        type="article")
        v-card.link-item.full-height(v-else
        :color="getItemColor(itemIndex)"
        raised="10")
            v-img(width=355
            :src="thumbnail")
                v-card-title
                    a(:href="item.url"
                    target="_blank")
                        v-icon mdi-bookmark
                        | {{ prettyUrl(item.url) }}
                v-card-text
                    v-icon mdi-cursor-default-click
                    | Посећено: {{ prettyDate(item.visited) }}
                    br
                    | {{ item.description }}
</template>

<script>
//import Foldable from '~/components/Foldable.vue';
export default {
    name: 'LinkItem',
    //components: { Foldable },
    props: {
        expanded: { type: Boolean, default: false },
        item: { type: Object, default: null},
        itemIndex: { type: Number, default: 0 },
    },
    data()
    {
        return {
            thumbnailLoading: true,
            thumbnail: '',
        };
    },
    mounted()
    {
        if (this.item)
        {
            this.loadThumbnail(this.item.id, this.item.url);
        }
    },
    methods: {
        cardNavigate(url)
        {
            window.open(url, '_blank');
        },
        async loadThumbnail(/*id, url*/)
        {
            if (this && this.$store)
            {
                //setTimeout(() =>
                //{
                this.thumbnailLoading = false;
                //}, 2000);
                //try
                //{
                //let thumbnail = await this.$store.dispatch('links/loadThumbnail',
                //{ id, url }, { root: true });
                //this.thumbnailLoading = false;
                //this.thumbnail = thumbnail;
                //}
                //catch(err)
                //{
                //this.thumbnailLoading = false;
                //this.thumbnail = '';
                //console.error('loadThumbnail: ', err);
                //}
            }
        },
        getItemColor(itemIndex)
        {
            if (this && this.$vuetify.theme.dark)
            {
                return (
                    'light-blue darken-' +
                    (
                        5 - (itemIndex % 5 > 3 ? 6 - (itemIndex % 5) : (itemIndex % 5) + 1)
                    )
                );
            }
            else
            {
                return (
                    'light-blue lighten-' +
                (itemIndex % 6 > 3 ? 7 - (itemIndex % 6) : (itemIndex % 6) + 1)
                );
            }
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

<style lang="sass">
@import '~vuetify/src/styles/styles.sass'

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
    overflow: hidden

.theme--dark.v-application .link-item .v-card__title a,
.theme--dark.v-application .link-item .v-card__subtitle a
    color: map-get($material-dark, 'text-color')

.link-item .v-card__subtitle:hover a,
.link-item .v-card__title:hover a
    word-break: break-word
    text-overflow: ellipsis
    overflow-wrap: break-word
    overflow-x: auto

.link-item .v-card__title a i
    position: absolute
    margin-left: -1.3928rem

//-.link-item .v-card__text
    position: relative

//-.link-item .loading-overlay
    display: flex
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    transition: all .5s ease

//-.link-item .v-card__title:hover a,
   .link-item .v-card__title:hover a i
   color: #fff
   transition: all .5s ease

//-.theme--dark.v-application .v-card__title,
    .theme--dark.v-application .v-card__text
    color: map-get($material-light, 'text-color')
</style>
