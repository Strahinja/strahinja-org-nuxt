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
                                    div(v-for="(category, catIndex) in categories",
                                    :key="catIndex")
                                        v-subheader {{ category.title }}
                                        v-list-item(v-for="(item, itemIndex) in category.items",
                                        :key="itemIndex",
                                        @click="selectItem(item)")
                                            v-list-item-avatar
                                                v-avatar(:color="category.avatarColor")
                                                    v-icon {{ item.icon }}
                                            v-list-item-content
                                                v-list-item-title {{ item.title }}
                                                v-list-item-subtitle(v-if="item.short_desc")
                                                    | {{ item.short_desc }}
                                        v-divider
                            v-col.pa-0.pl-4.canvas-wrapper(:cols="12",
                            :sm="9")
                                canvas#dos-canvas(ref="dosCanvas",
                                :style="canvasStyle()")
                                v-fade-transition
                                    .canvas-overlay(v-show="showOverlay")
                                        v-fade-transition
                                            img(v-if="selectedItem",
                                            :src="selectedItem.image")
                                        v-fade-transition
                                            v-btn(v-show="selectedItem",
                                            color="accent",
                                            rounded,
                                            depressed,
                                            x-large,
                                            light,
                                            @click="runProgram()")
                                                v-icon mdi-play
                                                | Покрени
                        v-divider.my-5
                        v-row(v-if="selectedItem")
                            v-col.pa-0(:cols="12")
                                h1.display-1 {{ selectedItem.title }}
                                .description.markdown-body(v-html="markdown(selectedItem.description)")
                v-divider
                v-card-actions.pa-4(v-if="selectedItem")
                    v-btn(color="accent",
                    x-large,
                    light,
                    :to="selectedItem.zip")
                        v-icon mdi-package-down
                        | Преузми ZIP
</template>

<script>
import Subpage from '~/components/Subpage';
//const getProp = require('dotprop');

//const CANVAS_DEFAULT_HEIGHT = 480;

export default {
    name: 'Programi',
    components: { Subpage },
    head: {
        link: [
            {
                rel: 'stylesheet',
                href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.11.1/katex.min.css'
            },
        ],
    },
    data()
    {
        return {
            Dos: null,
            commandInterface: null,
            selectedItem: null,
            resizeCallback: null,
            canvasHeight: 'auto',
            showOverlay: true,
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
                            image: '/img/programi/paskal/bibliote-02.png',
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
                            zip: '/programi/paskal/frakt.zip',
                            conf: {
                                name: 'dosbox.conf',
                                content: `
                                [autoexec]
                                config -set "cpu cycles=5000"
                                `
                            },
                            image: '/img/programi/paskal/frakt-01.png',
                            args: [
                                '-conf', 'dosbox.conf',
                                '-c', 'FRK.EXE',
                            ],
                            icon: 'mdi-console',
                            title: 'Frakt/Frk',
                            short_desc: 'Цртање фрактала',
                            description: 'Програми за цртање фрактала:'
                                + ' `FRAKT.EXE` = Паскал + _BGI_ графика,'
                                + ' `FRK.EXE` = Паскал + Асемблер.\n\n'
                                + ' **Број итерација:** око **20** даје детаљне'
                                + ' фрактале.'
                                + ' [[+]]/[[-]] ='
                                + ' зумирање/одзумирање, [[←]]/[[↑]]/[[→]]/[[↓]]'
                                + ' (на нумеричкој), односно'
                                + ' [[4]]/[[8]]/[[6]]/[[2]] = померање',
                        },
                        {
                            zip: '/programi/paskal/Hangman.zip',
                            conf: {
                                name: 'dosbox.conf',
                                content: `
                                [autoexec]
                                config -set "cpu cycles=5000"
                                `
                            },
                            image: '/img/programi/paskal/hangman-01.png',
                            args: [
                                '-conf', 'dosbox.conf',
                                '-c', 'HANGMAN.EXE',
                            ],
                            icon: 'mdi-console',
                            title: 'Hangman',
                            short_desc: 'Игра „Вешала“',
                            description: 'Игра погађања речи',
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
                            image: '/img/programi/paskal/lavirin3.png',
                            args: [
                                '-conf', 'dosbox.conf',
                                '-c', 'LAVIRIN3.EXE',
                            ],
                            icon: 'mdi-console',
                            title: 'Лавиринт',
                            short_desc: 'Излазак из лавиринта',
                            description: 'Програм за тражење изласка из'
                                + ' лавиринта.\n\nЗа **име фајла** и'
                                + ' **_BGI_ драјвер**'
                                + ' може се притиснути [[Enter]].'
                                + ' Предложена **пауза у msec:** **5**.',
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
                            image: '/img/programi/paskal/rot3d3.png',
                            args: [
                                '-conf', 'dosbox.conf',
                                '-c', 'ROT3D3.EXE',
                            ],
                            icon: 'mdi-console',
                            title: 'Rot3D',
                            short_desc: '3D анимација коцке',
                            description: '3D анимација коцке у Паскалу и'
                                + ' Асемблеру.',
                        },
                        {
                            zip: '/programi/paskal/simhit.zip',
                            conf: {
                                name: 'dosbox.conf',
                                content: `
                                [autoexec]
                                config -set "cpu cycles=5000"
                                `
                            },
                            image: '/img/programi/paskal/simhit-01.png',
                            args: [
                                '-conf', 'dosbox.conf',
                                '-c', 'SIMHIT.EXE',
                            ],
                            icon: 'mdi-console',
                            title: 'Simhit',
                            short_desc: 'Симулатор косог хица',
                            description: 'Симулатор косог хица. Програм'
                                + ' који сам написао у првом разреду гимназије.\n\n'
                                + 'Препоручени параметри – **брзина:** **250**,'
                                + ' **угао:** **45** (пример).',
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
                            image: '/img/programi/paskal/zvez.png',
                            args: [
                                '-conf', 'dosbox.conf',
                                '-c', 'ZVEZ.EXE',
                            ],
                            icon: 'mdi-console',
                            title: 'Звезде',
                            short_desc: 'Паралаксна анимација',
                            description: 'Паралаксна анимација звезданог неба'
                                + ' у Паскалу и Асемблеру.',
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
                            image: '/img/programi/c/pahulje-02.png',
                            args: [
                                '-conf', 'dosbox.conf',
                                '-c', 'GAMETEST.EXE',
                            ],
                            icon: 'mdi-language-cpp',
                            title: 'Пахуље',
                            short_desc: 'Игра „Пахуље“',
                            description: 'Игра настављања низа симбола'
                                + ' (семинарски рад из Основа рачунарских'
                                + ' система).\n\n[[←]]/[[→]] ='
                                + ' позиционирање, [[Enter]]/[[Space]] ='
                                + ' одигравање потеза. [[F10]] = мени. [[F5]] омогућава '
                                + ' померање прозора стрелицама. [[Shift]]'
                                + '+[[F5]] омогућава промену величине прозора'
                                + ' за који је то дозвољено (овде само у'
                                + ' дијалогу Подешавања) стрелицама.\n\n'
                                + 'Игра је пример употребе вишеплатформске'
                                + ' објектне библиотеке _Mob-E_ (_Multiplatform'
                                + ' OBject Environment_) коју сам изградио са'
                                + ' колегама за потребе семинарског рада.'
                                + ' Она омогућава да се исти програм'
                                + ' искомпајлира и за ГНУ са Линуксом'
                                + ' користећи библиотеку [_ncurses_]'
                                + '(https://en.wikipedia.org/wiki/Ncurses).'
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
                            image: '/img/programi/c/turing1.png',
                            args: [
                                '-conf', 'dosbox.conf',
                                '-c', 'cd turing',
                                '-c', 'TURING1.EXE',
                            ],
                            icon: 'mdi-language-cpp',
                            title: 'Turing',
                            short_desc: 'Тјурингова машина',
                            description: 'Симулатор Тјурингове машине, програм'
                                + ' инспирисан теоријом из Основа програмирања.'
                                + '\n\nПрограм рачуна $n-1$ за унето $n$.'
                                + ' Уочљивији резултати се добијају за степене'
                                + ' двојке, рецимо **256**.',
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
            this.selectedItem = null;

            this.cleanupExit();

            if (!this.resizeCallback)
            {
                this.resizeCallback = () =>
                {
                    this.setCanvasHeight();
                };
                window.addEventListener('resize', this.resizeCallback);
            }
        }
    },
    methods:
    {
        cleanupExit()
        {
            if (this.commandInterface)
            {
                this.commandInterface.exit();
                this.commandInterface = null;
            }
            this.showOverlay = true;
            this.setCanvasHeight();
        },
        listColStyle()
        {
            return {
                'max-height': this && this.canvasHeight
                    ? this.canvasHeight
                    : 'initial',
                'overflow-y': 'auto',
            };
        },
        setCanvasHeight()
        {
            console.log('setCanvasHeight: this.$refs.dosCanvas.clientWidth = ',
                        this && this.$refs && this.$refs.dosCanvas
                            ? this.$refs.dosCanvas.clientWidth
                            : 'N/A');
            this.canvasHeight = this && this.$refs && this.$refs.dosCanvas
                ? '' + (this.$refs.dosCanvas.clientWidth / 1.3333) + 'px'
                : 'auto';
        },
        canvasStyle()
        {
            return {
                height: this && this.canvasHeight
                    ? this.canvasHeight
                    : 'auto',
                'max-height': this && this.canvasHeight
                    ? this.canvasHeight
                    : 'initial',
            };
        },
        /*
         *canvasOverlayStyle()
         *{
         *    return {
         *        'max-height': this && this.canvasHeight
         *            ? `${this.canvasHeight}px`
         *            : 'initial',
         *    };
         *},
         */
        selectItem(item)
        {
            this.cleanupExit();
            this.selectedItem = item;
        },
        markdown(text)
        {
            if (text)
            {
                return this.$mdRender(text);
            }
            return '';
        },
        /*
         *forceCanvasHeight()
         *{
         *    this.canvasSetHeight = CANVAS_DEFAULT_HEIGHT;
         *    this.canvasHeight = this.canvasSetHeight;
         *},
         *unforceCanvasHeight()
         *{
         *    this.canvasSetHeight = 0;
         *    this.canvasHeight = this.$refs.dosCanvas.clientHeight;
         *},
         */
        runProgram()
        {
            if (this.Dos)
            {
                this.cleanupExit();
                this.showOverlay = false;
                //this.unforceCanvasHeight();

                this.$store.dispatch('loading/startLoading', {
                    id: 'program' }, { root: true });

                this.Dos(document.getElementById('dos-canvas'),
                         { wdosboxUrl: '/js/wdosbox.js' }
                ).ready((fs, main) =>
                {
                    if (this.selectedItem.conf)
                    {
                        fs.createFile(this.selectedItem.conf.name,
                                      this.selectedItem.conf.content);
                    }

                    fs.extract(this.selectedItem.zip).then(() =>
                    {
                        this.$store.dispatch('loading/stopLoading', {
                            id: 'program' }, { root: true });
                        this.canvasHeight = this.$refs.dosCanvas.clientHeight;
                        main(this.selectedItem.args).then((ci) =>
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

<style lang="sass">
@import '~vuetify/src/styles/styles.sass'
@import '~/assets/sass/code.sass'
@import '~/assets/sass/markdown.sass'

#dos-canvas
    width: 100%
    min-width: 320px
    max-width: 1024px
    background: #000
    //border: 1px solid #999
    padding: 3px
    //box-shadow: 0 0 10px 0 rgba(0,0,0,.5)

.v-card .v-btn:not(.v-btn--round).v-size--x-large
    padding: 0 23.1111111111px !important

.canvas-wrapper
    position: relative

.canvas-overlay
    display: flex
    justify-content: center
    position: absolute
    top: 0
    bottom: 0
    left: 16px
    right: 0
    background: #000
    overflow: hidden
    min-width: 320px
    max-width: 1024px

.canvas-overlay > img
    opacity: .5
    position: absolute
    width: 100%

.canvas-overlay > .v-btn
    align-self: center

.dosbox-container
    align-items: start !important

.v-card__text
    color: map-get($material-dark, 'text-color') !important

.theme--light .v-card__text
    color: map-get($material-light, 'text-color') !important
</style>
