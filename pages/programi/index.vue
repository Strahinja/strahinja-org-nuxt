<template lang="pug">
    subpage(splash,
    source-url,
    source-url-light)
        template(#header)
            h1.display-1 Програми
        v-progress-linear.my-5(v-if="programLoading",
        indeterminate,
        :active="programLoading")
        template(#outside-content)
            v-card
                v-card-text
                    v-container(fluid)
                        v-row
                            v-col.pa-0(:cols="12",
                            :sm="3",
                            :style="listColStyle()")
                                v-list.full-height(tile)
                                    v-list-item-group(v-for="(category, catIndex) in categories",
                                    :key="catIndex")
                                        v-subheader {{ category.title }}
                                        v-list-item(v-for="(item, itemIndex) in category.items",
                                        :key="itemIndex",
                                        @click="runProgram(item)")
                                            v-list-item-avatar
                                                v-avatar(:color="category.avatarColor")
                                                    v-icon {{ item.icon }}
                                            v-list-item-content
                                                v-list-item-title {{ item.title }}
                                                v-list-item-subtitle(v-if="item.short_desc")
                                                    | {{ item.short_desc }}
                                v-divider
                            v-col.pa-0(:cols="12",
                            :sm="9")
                                canvas#dos-canvas(ref="dosCanvas")
                        v-divider.my-5
                        v-row(v-if="selectedItem")
                            v-col.pa-0(:cols="12")
                                h1.display-1 {{ selectedItem.title }}
                                | {{ selectedItem.description }}
                v-divider
                v-card-actions.pa-4(v-if="selectedItem")
                    v-btn(color="accent",
                    light,
                    :to="selectedItem.zip")
                        v-icon mdi-package-down
                        | Преузми ZIP
</template>

<script>
import Subpage from '~/components/Subpage';
const getProp = require('dotprop');
export default {
    name: 'Programi',
    components: { Subpage },
    data()
    {
        return {
            Dos: null,
            commandInterface: null,
            selectedItem: null,
            resizeCallback: null,
            canvasHeight: 0,
            categories: [
                {
                    title: 'Паскал',
                    avatarColor: 'blue lighten-3 contrast-light',
                    items: [
                        {
                            zip: '/programi/paskal/Bibliote.zip',
                            conf: {
                                name: 'dosbox.conf',
                                content: `
                                [autoexec]
                                config -set "cpu cycles=5000"
                                keyb yu
                                `,
                            },
                            args: [
                                '-conf', 'dosbox.conf',
                                '-c', 'cd FINAL',
                                '-c', 'BIBLIOTE.EXE',
                            ],
                            icon: 'mdi-console',
                            title: 'Библиотека',
                            short_desc: 'Евиденција књига',
                            description: 'Програм за евиденцију књига у'
                                + ' библиотеци (матурски рад)',
                        },
                        {
                            zip: '/programi/paskal/lavirint.zip',
                            conf: {
                                name: 'dosbox.conf',
                                content: `
                                [autoexec]
                                config -set "cpu cycles=5000"
                                `
                            },
                            args: [
                                '-conf', 'dosbox.conf',
                                '-c', 'LAVIRIN3.EXE',
                            ],
                            icon: 'mdi-console',
                            title: 'Лавиринт',
                            short_desc: 'Излазак из лавиринта',
                            description: 'Програм за налажење изласка из'
                                + ' лавиринта',
                        },
                        {
                            zip: '/programi/paskal/rot3d.zip',
                            conf: {
                                name: 'dosbox.conf',
                                content: `
                                [autoexec]
                                config -set "cpu cycles=5000"
                                `
                            },
                            args: [
                                '-conf', 'dosbox.conf',
                                '-c', 'ROT3D3.EXE',
                            ],
                            icon: 'mdi-console',
                            title: 'Rot3D',
                            short_desc: '3D анимација коцке',
                            description: '3D анимација коцке у Паскалу и'
                                + ' Асемблеру',
                        },
                        {
                            zip: '/programi/paskal/zvez.zip',
                            conf: {
                                name: 'dosbox.conf',
                                content: `
                                [autoexec]
                                config -set "cpu cycles=5000"
                                `
                            },
                            args: [
                                '-conf', 'dosbox.conf',
                                '-c', 'ZVEZ.EXE',
                            ],
                            icon: 'mdi-console',
                            title: 'Звезде',
                            short_desc: 'Паралаксна анимација',
                            description: 'Паралаксна анимација звезданог неба',
                        },
                    ],
                },
                {
                    title: 'C/C++',
                    avatarColor: 'red lighten-4 contrast-light',
                    items: [
                        {
                            zip: '/programi/c/pahulje.zip',
                            conf: {
                                name: 'dosbox.conf',
                                content: `
                                [autoexec]
                                config -set "cpu cycles=15000"
                                `
                            },
                            args: [
                                '-conf', 'dosbox.conf',
                                '-c', 'GAMETEST.EXE',
                            ],
                            icon: 'mdi-language-cpp',
                            title: 'Пахуље',
                            short_desc: 'Игра „Пахуље“',
                            description: 'Игра настављања низа симбола'
                                + ' (семинарски рад из Основа рачунарских система)',
                        },
                        {
                            zip: '/programi/c/turing.zip',
                            conf: {
                                name: 'dosbox.conf',
                                content: `
                                [autoexec]
                                config -set "cpu cycles=5000"
                                `
                            },
                            args: [
                                '-conf', 'dosbox.conf',
                                '-c', 'cd turing',
                                '-c', 'TURING1.EXE',
                            ],
                            icon: 'mdi-language-cpp',
                            title: 'Turing',
                            short_desc: 'Симулација Тјурингове машине',
                            description: 'Симулатор Тјурингове машине, програм'
                                + ' инспирисан теоријом из Основа програмирања',
                        },
                    ],
                },
            ],
        };
    },
    computed:
    {
        programLoading()
        {
            return this && this.$store && this.$store.getters
                ? this.$store.getters['loading/isLoading']('program')
                : true;
        },
    },
    mounted()
    {
        if (process.client)
        {
            require('js-dos');
            this.Dos = window.Dos;
            this.canvasHeight = this.$refs.dosCanvas.clientHeight;
            if (!this.resizeCallback)
            {
                this.resizeCallback = () =>
                {
                    this.canvasHeight = this.$refs.dosCanvas.clientHeight;
                };
                window.addEventListener('resize', this.resizeCallback);
            }
        }
    },
    methods:
    {
        listColStyle()
        {
            return {
                'max-height': this && this.canvasHeight
                    ? `${this.canvasHeight}px`
                    : 'initial',
                'overflow-y': 'auto',
            };
        },
        runProgram(item)
        {
            if (this.Dos)
            {
                if (this.commandInterface)
                {
                    this.commandInterface.exit();
                    this.commandInterface = null;
                }

                this.selectedItem = item;

                this.$store.dispatch('loading/startLoading', {
                    id: 'program' }, { root: true });

                this.Dos(document.getElementById('dos-canvas'),
                         { wdosboxUrl: '/js/wdosbox.js' }
                ).ready((fs, main) =>
                {
                    if (item.conf)
                    {
                        fs.createFile(item.conf.name,
                                      item.conf.content);
                    }

                    fs.extract(item.zip).then(() =>
                    {
                        this.$store.dispatch('loading/stopLoading', {
                            id: 'program' }, { root: true });
                        this.canvasHeight = this.$refs.dosCanvas.clientHeight;
                        main(item.args).then((ci) =>
                        {
                            this.commandInterface = ci;
                        });
                    });
                });
            }
        }
    },
};
</script>

<style lang="sass" scoped>
@import '~vuetify/src/styles/styles.sass'
#dos-canvas
    width: 100%
    background: #000
    //border: 1px solid #999
    padding: 3px
    //box-shadow: 0 0 10px 0 rgba(0,0,0,.5)

.v-card__text
    color: map-get($material-dark, 'text-color') !important

.theme--light .v-card__text
    color: map-get($material-light, 'text-color') !important
</style>
