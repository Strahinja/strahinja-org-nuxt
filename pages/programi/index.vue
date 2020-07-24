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
                                        v-list-item(v-for=`(item, itemIndex)
                                            in category.items`,
                                        :key="itemIndex",
                                        @click="selectItem(item)")
                                            v-list-item-avatar
                                                v-avatar(:color="category.avatarColor")
                                                    v-icon {{ item.icon }}
                                            v-list-item-content
                                                v-list-item-title {{ item.title }}
                                                v-list-item-subtitle(v-if="item.short_desc")
                                                    | {{ item.short_desc }}
                                        v-divider(v-if=`notLast(catIndex,
                                        categories)`)
                            v-col.pa-0.text-center.align-self-center.canvas-wrapper(:cols="12",
                            :class="{ active: !showOverlay }",
                            :sm="9")
                                //-.canvas-controls
                                    //-v-btn(fab,
                                    //-small,
                                    //-text,
                                    //-@click="onKeyboardShow()")
                                        //-v-icon mdi-keyboard
                                    //-v-btn(fab,
                                    //-small,
                                    //-text,
                                    //-@click="onFullscreenClick()")
                                        //-v-icon
                                            //-| {{ fullscreen
                                            //-| ? 'mdi-fullscreen-exit'
                                            //-| : 'mdi-fullscreen' }}
                                canvas#dos-canvas(ref="dosCanvas",
                                :class="{ active: !showOverlay }",
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
//import Subpage from '~/components/Subpage';

export default {
    name: 'Programi',
    //components: { Subpage },
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
            DosController: null,
            commandInterface: null,
            selectedItem: null,
            resizeCallback: null,
            canvasHeight: 'auto',
            showOverlay: true,
            fullscreen: false,
            categories: [
                {
                    title: 'Паскал',
                    avatarColor: 'blue lighten-3 black--text',
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
                            options: {
                                cycles: 5000,
                            },
                            image: '/img/programi/paskal/frakt-01.png',
                            args: [
                                '-c', 'FRK.EXE',
                            ],
                            icon: 'mdi-console',
                            title: 'Frakt',
                            short_desc: 'Цртање фрактала',
                            description: 'Програм за цртање фрактала:\n\n'
                                + '- `FRAKT.EXE` = Паскал + _BGI_ графика,\n'
                                + '- `FRK.EXE` = Паскал + Асемблер.\n\n'
                                + ' **Број итерација:** око **20** даје детаљне'
                                + ' фрактале.'
                                + ' [[+]]/[[-]] ='
                                + ' зумирање/одзумирање, [[←]]/[[↑]]/[[→]]/[[↓]]'
                                + ' (на нумеричкој), односно'
                                + ' [[4]]/[[8]]/[[6]]/[[2]] = померање',
                        },
                        {
                            zip: '/programi/paskal/Hangman.zip',
                            options: {
                                cycles: 5000,
                            },
                            image: '/img/programi/paskal/hangman-01.png',
                            args: [
                                '-c', 'HANGMAN.EXE',
                            ],
                            icon: 'mdi-console',
                            title: 'Hangman',
                            short_desc: 'Игра „Вешала“',
                            description: 'Игра погађања речи',
                        },
                        {
                            zip: '/programi/paskal/lavirint.zip',
                            options: {
                                cycles: 5000,
                            },
                            image: '/img/programi/paskal/lavirin3.png',
                            args: [
                                '-c', 'LAVIRIN3.EXE',
                            ],
                            icon: 'mdi-console',
                            title: 'Лавиринт',
                            short_desc: 'Излазак из лавиринта',
                            description: 'Програм за тражење изласка из'
                                + ' лавиринта.\n\n'
                                + '- `LAVIRINT.EXE` = _ASCII_ верзија\n'
                                + '- `LAVIRIN2.EXE` = текстуални интерфејс\n'
                                + '- `LAVIRIN3.EXE` = _BGI_ графика\n\n'
                                + 'За **име фајла** и'
                                + ' **_BGI_ драјвер**'
                                + ' може се притиснути [[Enter]].'
                                + ' Предложена **пауза у msec:** **5**.',
                        },
                        {
                            zip: '/programi/paskal/rot3d.zip',
                            options: {
                                cycles: 5000,
                            },
                            image: '/img/programi/paskal/rot3d3.png',
                            args: [
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
                            options: {
                                cycles: 5000,
                            },
                            image: '/img/programi/paskal/simhit-01.png',
                            args: [
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
                            options: {
                                cycles: 5000,
                            },
                            image: '/img/programi/paskal/zvez.png',
                            args: [
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
                    avatarColor: 'red lighten-4  black--text',
                    items: [
                        {
                            zip: '/programi/c/pahulje.zip',
                            options: {
                                cycles: 15000,
                            },
                            image: '/img/programi/c/pahulje-02.png',
                            args: [
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
                            options: {
                                cycles: 5000,
                            },
                            image: '/img/programi/c/turing1.png',
                            args: [
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
    async mounted()
    {
        await this.$store.dispatch('loading/clearLoading');
        if (process.client)
        {
            require('js-dos');
            this.Dos = window.Dos;
            this.DosController = window.DosController;
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
        notLast(index, list)
        {
            return index < list.length-1;
        },
        onKeyboardShow()
        {
            if (this.commandInterface)
            {
                //this.commandInterface.ke
            }
        },
        onFullscreenClick()
        {
            if (this.fullscreen)
            {
                this.fullscreen = false;
                if (this.commandInterface)
                {
                    this.commandInterface.exitFullscreen();
                }
            }
            else
            {
                this.fullscreen = true;
                if (this.commandInterface)
                {
                    this.commandInterface.fullscreen();
                }
            }
        },
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
            /*
             *console.log('setCanvasHeight: this.$refs.dosCanvas.clientWidth = ',
             *            this && this.$refs && this.$refs.dosCanvas
             *                ? this.$refs.dosCanvas.clientWidth
             *                : 'N/A');
             */
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
        async runProgram()
        {
            if (this.Dos)
            {
                this.cleanupExit();
                this.showOverlay = false;

                await this.$store.dispatch('loading/startLoading', {
                    id: 'program' }, { root: true });

                let options = { wdosboxUrl: '/js/wdosbox.js' };

                if (this.selectedItem.options)
                {
                    options = { ...options, ...this.selectedItem.options };
                }

                this.Dos(document.getElementById('dos-canvas'),
                         options).ready((fs, main) =>
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
                            /*
                             *this.DosController.Qwerty(ci.getParentDiv(),
                             *                          ci.getKeyEventConsumer());
                             */

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
    max-width: 800px
    background: #000
    //border: 1px solid #999
    padding: 3px
    //box-shadow: 0 0 10px 0 rgba(0,0,0,.5)
    opacity: 0

#dos-canvas.active
    opacity: 1

.v-card .v-btn:not(.v-btn--round).v-size--x-large
    padding: 0 23.1111111111px !important

.canvas-wrapper
    position: relative

.canvas-controls
    position: absolute
    z-index: 1
    top: 0
    width: 100%
    height: 40px
    justify-content: flex-end
    display: flex
    top: 60px !important
    max-width: 800px
    left: 50%
    transform: translateX(calc(-50% - 20px))

.canvas-overlay
    display: flex
    justify-content: center
    align-self: center
    position: absolute
    top: 0
    background: map-get($material-light, 'background-color')
    overflow: hidden
    min-width: 320px
    max-width: 800px
    width: 100%
    height: calc(100% - 8px)
    left: 50%
    transform: translateX(-50%)

.theme--dark .canvas-overlay
    background: map-get($material-dark, 'background-color')

.canvas-overlay > img
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
    filter: brightness(.4)

.canvas-overlay > .v-btn
    align-self: center

.v-card__text
    color: map-get($material-dark, 'text-color') !important

.theme--light .v-card__text
    color: map-get($material-light, 'text-color') !important

.dosbox-container
    min-width: 320px
    max-width: 800px
    width: 100%
    margin-left: auto
    margin-right: auto

.qwerty-key
    top: 20px
    right: 20px
    left: auto !important
    border: none !important
    background: none !important
    display: none !important

.canvas-wrapper.active .qwerty-key
    display: flex !important

.qwerty-key::before
    content: "\F030C"
    color: #fff
    font: normal normal normal 24px/1 "Material Design Icons"
</style>
