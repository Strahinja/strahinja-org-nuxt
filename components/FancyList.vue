<template lang="pug">
    .fancy-list
        v-list(elevation="1")
            div(v-for="(group, groupIndex) in items")
                //-v-subheader {{ group.title }}
                v-list-item(v-for="(item, itemIndex) in group.list",
                :key="itemIndex",
                link,
                @click="openItem(item)")
                    v-list-item-avatar
                        v-avatar(:color="avatarColor")
                            v-icon(v-if="!item.iconSvg") {{ item.icon }}
                            component(v-else,
                            :is="item.iconSvg")
                    v-list-item-content
                        v-list-item-title {{ item.name }}
                        v-list-item-subtitle {{ item.description }}
                v-divider(v-if="notLast(groupIndex, items)")
</template>

<script>
import Gnu from '~/assets/svg/gnu.svg?inline';
import Strahinjaorg from '~/assets/svg/strahinjaorg.svg?inline';
export default {
    name: 'FancyList',
    components: { Gnu, Strahinjaorg },
    props: {
        items: { type: Array, default: () => ([]), required: false },
        rowSizes: { type: Array, default: () => ([3,4]), required: false },
    },
    data()
    {
        return {
            activeRow: -1,
            activeCol: -1,
        };
    },
    computed:
    {
        avatarColor()
        {
            return 'accent black--text';
        },
    },
    methods: {
        notLast(index, list)
        {
            return index < list.length-1;
        },
        openLink(url)
        {
            window.open(url, '_blank');
        },
        openItem(item)
        {
            if (item.is_file)
            {
                this.openLink(item.path);
            }
            else
            {
                this.$router.push({ path: item.path });
            }
        },
        rowSize(row)
        {
            return this.rowSizes[row%this.rowSizes.length];
        },
        index(row, col)
        {
            let result = 0;
            let done = false;
            let currentRow = 0;
            while (!done && result < this.items.length)
            {
                if (currentRow != row)
                {
                    result += this.rowSize(currentRow);
                    currentRow++;
                }
                else
                {
                    done = true;

                    if (result + col < this.items.length)
                    {
                        result += col;
                    }
                    else
                    {
                        result = -1;
                    }
                }
            }

            return result;
        },
        rows()
        {
            let row = 0;
            let cells = 0;
            while (cells < this.items.length)
            {
                cells += this.rowSizes[row % this.rowSizes.length];
                row++;
            }
            let result = Array(row).fill().map((x, i) => i);
            return result;
        },
        cols(row)
        {
            if (row == this.rows().length-1)
            {
                let cellsSoFar = 0;
                for (let currentRow = 0; currentRow < row; currentRow++)
                {
                    cellsSoFar += this.rowSize(currentRow);
                }
                return Array(this.items.length - cellsSoFar)
                    .fill().map((x, i) => i);
            }
            else
            {
                return Array(this.rowSize(row))
                    .fill().map((x, i) => i);
            }
        },
        colClass(row)
        {
            return 12/this.rowSize(row);
        },
        rowClass(row)
        {
            return 'row-' + this.rowSize(row);
        },
        cellActive(row, col)
        {
            return this.activeRow==row && this.activeCol==col;
        },
        cell(row, col)
        {
            let index = this.index(row, col);
            if (index != -1)
            {
                return this.items[index];
            }
            else
            {
                return {};
            }
        },
        cardColor(row, col)
        {
            let result = (row%2==0) ? 'primary' : 'secondary';

            result += ' ' + ((col%2==0) ? 'darken-1' : 'darken-2');

            return result;
        },
        rowHover(row)
        {
            let cols = this.cols(row);
            this.activeRow = row;
            if (this.activeCol==-1 || this.activeCol>cols.length-1)
            {
                this.activeCol = cols[cols.length-1];
            }
        },
        cardHover(row, col)
        {
            this.activeRow = row;
            this.activeCol = col;
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
        }
    }
};
</script>

<style lang="sass" scoped>
$animation-speed: .125s

.fancy-grid
    margin: 0

.v-card,
.row,
.col
    transition: all $animation-speed ease-in-out

.col:last-child
    overflow: hidden

.row
    background: var(--v-secondary-lighten1)
    min-width: 100%
    max-width: 100%
    width: 100%
    overflow: hidden
    flex-wrap: nowrap

.v-card
    min-height: 6rem
    cursor: zoom-in

.card-inner
    height: 25rem

.v-card__title
    white-space: nowrap

.row-active .col-active .v-card__title
    font-size: 2rem

.v-card__text
    padding: 1rem 1rem 5rem 1rem
    height: 21rem

.v-card__actions
    justify-content: flex-end
    position: absolute
    bottom: 0
    height: 4rem
    width: 100%
    overflow: hidden
    white-space: nowrap

.v-card__text,
.v-card__actions,
.v-card__actions .v-btn
    color: #fff !important

.row-active.row-3 .col
    min-width: 20%
    max-width: 20%
    width: 20%

.row-active.row-4 .col
    min-width: 13.33%
    max-width: 13.33%
    width: 13.33%

.row-active .col-active
    min-width: 60% !important
    max-width: 60% !important
    width: 60% !important

//.description
    position: absolute
    min-width: 60% !important
    max-width: 60% !important
    width: 60% !important

.card-underlay
    position: absolute
    opacity: 0.0
    transition: all $animation-speed ease-in-out
    width: 100%
    height: 100%
    overflow: hidden

.row-active .col-active .card-underlay
    opacity: 0.2

.card-underlay img
    height: 100%
    transform: translate(-50%, -50%)
    filter: grayscale(1) contrast(.3)
    top: 50%
    left: 50%
    position: absolute

.v-card__text .date
    margin-top: 1rem

.fancy-grid .v-icon
    color: #fff
    margin-right: .5rem

// Responsive

.mobile .row
    flex-wrap: wrap

.mobile .col,
.mobile .col-active
    min-width: 100% !important
    max-width: 100% !important
    width: 100% !important
    border-top: 2px solid #fff

.mobile .card-underlay
    opacity: 0.2

.mobile .row-active .col-active .v-card__title
    font-size: 1.3rem

.mobile .card-inner
    height: auto

.mobile .v-card__text
    height: auto
    padding: 1rem

.mobile .v-card__actions
    display: block
    height: auto
    position: static

.mobile .v-card__actions .v-btn
    display: block
    margin-left: 0 !important

</style>

