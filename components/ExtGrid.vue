<template lang="pug">
    v-container.ext-grid
        foldable(v-for="(row, rowIndex) in rows()",
        :key="rowIndex",
        :folded="!isRowHovered(row)",
        :folded-height="rowHeight",
        :unfolded-height="rowHoveredHeight",
        @after-fold-end="afterFoldEnd(row)",
        @after-unfold-end="afterUnfoldEnd(row)")
            v-row(:class="{'hovered': isRowHovered(row)}",
            @mouseover="setHoveredRow(row)",
            @mouseout="setHoveredRow(-1)")
                v-col.col.pa-0.ma-0(v-for="(col, colIndex) in columns(row)",
                :cols="12",
                :sm="true",
                :key="colIndex",
                :class="{'hovered': isColHovered(row, col)}")
                    //-v-img(:src="itemAt(row, col).image_thumb")
                    v-card(v-if="itemAt(row, col).name",
                    :color="colorAt(row, col)",
                    tile,
                    flat,
                    @mouseover="setColHovered(row, col, true)",
                    @mouseout="setColHovered(row, col, false)")
                        v-card-title {{ itemAt(row, col).name }}
                        v-card-text {{ getDescription(row, col) }}
</template>

<script>
import Foldable from '~/components/Foldable';
export default {
    name: 'ExtGrid',
    components: { Foldable },
    props: {
        items: { type: Array, default: () => ([]), required: false },
        maxDescriptionLength: { type: Number, default: 25, required: false },
    },
    data()
    {
        return {
            hoveredRow: -1,
            colHovered: [],
            colHoverChanging: false,
            rowHeight: '8rem',
            rowHoveredHeight: '15rem',
        };
    },
    watch: {
        items(newValue)
        {
            this.colHovered = Array(newValue.length).fill().map(() => false);
        }
    },
    methods: {
        rows(items)
        {
            let row = 0;
            let cellCount = 0;
            let len = this.items.length;
            if (items)
            {
                len = items.length;
            }
            while (cellCount < len)
            {
                cellCount += (row%2==0)
                    ? 3 : 4;
                row++;
            }
            return Array(row).fill().map((x,i) => i);
        },
        columns(row)
        {
            return Array((row%2==0) ? 3 : 4)
                .fill()
                .map((x,i) => i);
        },
        itemAt(row, col)
        {
            let index = 0;
            for (let crow = 0; crow < row; crow++)
            {
                index += (crow%2==0) ? 3 : 4;
            }
            index += col;
            return index < this.items.length ? this.items[index] : {};
        },
        colorAt(row, col)
        {
            let result = '';
            switch(row % 4)
            {
            case 0:
                result += 'blue ';
                break;
            case 1:
                result += 'red ';
                break;
            case 2:
                result += 'orange ';
                break;
            default:
                result += 'green ';
            }

            switch (col % 3)
            {
            case 0:
                result += 'lighten-2 white--text';
                break;
            case 1:
                result += 'lighten-3 white--text';
                break;
            default:
                result += 'lighten-4 white--text';
            }

            return result;
        },
        setHoveredRow(row)
        {
            console.log('setHoveredRow(', this.$event, ', ', row, ')');
            if (this.$event && this.$event.toElement && this.$event.toElement.classList
                && !this.$event.toElement.classList.contains('row') && row==-1)
            {
                return;
            }
            this.hoveredRow = row;
        },
        isRowHovered(row)
        {
            return this.hoveredRow == row;
        },
        setColHovered(row, col, setTo)
        {
            let index = 0;
            console.log('setColHovered(', row, ', ', col, ', ', setTo, ')');
            for (let crow = 0; crow < row; crow++)
            {
                index += (crow%2==0) ? 3 : 4;
            }
            index += col;
            if (index < this.items.length)
            {
                if (this.colHovered[index] != setTo)
                {
                    let newHovered = [].concat(this.colHovered);
                    newHovered[index] = setTo;
                    this.colHovered = newHovered;
                }
            }
        },
        isColHovered(row, col)
        {
            if (this.colHoverChanging)
            {
                return false;
            }

            let index = 0;
            for (let crow = 0; crow < row; crow++)
            {
                index += (crow%2==0) ? 3 : 4;
            }
            index += col;
            return (index < this.items.length) && this.colHovered[index];
        },
        getDescription(row, col)
        {
            let item = this.itemAt(row, col);
            if (item)
            {
                if (this.isColHovered(row, col))
                {
                    return item.description;
                }
                else
                {
                    return item.short_desc;
                }
            }
        },
    }
};
</script>

<style lang="sass" scoped>
.row.hovered,
.row.hovered .v-card
    min-height: 300px
    height: 300px

.col.hovered
    min-width: 60% !important
    width: 60% !important

.row,
.col
    transition: all .25s ease-in-out

.col
    overflow: hidden
    background: var(--v-primary-lighten1)

.col:first-child > .v-card
    padding-left: 15px !important

.col:last-child > .v-card
    padding-right: 15px !important

.ext-grid
    overflow: hidden
    border-radius: 25px
    padding: 0

.ext-grid .v-card
    height: 100%

.ext-grid .v-image
    max-height: 100%

.ext-grid .foldable-wrapper
    margin: 0 -12px

.ext-grid .foldable .row
    margin: 0
</style>
