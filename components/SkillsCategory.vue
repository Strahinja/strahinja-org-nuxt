<template lang="pug">
    div
        h3.subtitle-1.mb-7(:class=`{
            'px-10': $breakpoint.is.smAndUp,
            'px-4': $breakpoint.is.xsOnly
        }`) {{ title }}
        v-container(fluid=true,
        no-gutters=true)
            v-row(v-if="twoCol === true",
            :class=`{
                'px-10': $breakpoint.is.smAndUp,
                'px-4': $breakpoint.is.xsOnly
            }`)
                v-col.pa-0(:cols="12",
                :md="6",
                :class=`{
                    'pr-10': $breakpoint.is.mdAndUp
                }`)
                    v-container.pa-0(fluid=true,
                    no-gutters=true)
                        v-row.mb-5.mx-0(v-for="(skill, skillIndex) in itemsLeft",
                        :key="skillIndex",
                        align="center")
                            v-col.text-truncate.pa-0(:cols="6",
                            :sm="3") {{ skill.name }}
                            v-col.pa-0(:cols="6",
                            :sm="9")
                                v-progress-linear(:color="skill.color",
                                :value="skill.percent")
                v-col.pa-0(:cols="12",
                :md="6",
                :class=`{
                    'pl-10': $breakpoint.is.mdAndUp
                }`)
                    v-container.pa-0(fluid=true,
                    no-gutters=true)
                        v-row.mb-5.mx-0(v-for="(skill, skillIndex) in itemsRight",
                        :key="skillIndex",
                        align="center")
                            v-col.text-truncate.pa-0(:cols="6",
                            :sm="3") {{ skill.name }}
                            v-col.pa-0(:cols="6",
                            :sm="9")
                                v-progress-linear(:color="skill.color",
                                :value="skill.percent")
            v-row(v-else=true,
            no-gutters=true,
            :class=`{
                'px-10': $breakpoint.is.smAndUp,
                'px-4': $breakpoint.is.xsOnly
            }`)
                v-col.pa-0(:xs="12",
                :class=`{
                    'pr-10': $breakpoint.is.mdAndUp
                }`)
                    v-container.pa-0(fluid=true,
                    no-gutters=true)
                        v-row.mb-5.mx-0(v-for="(skill, skillIndex) in itemsLeft",
                        :key="skillIndex",
                        align="center")
                            v-col.text-truncate.pa-0(:cols="6",
                            :sm="3") {{ skill.name }}
                            v-col.pa-0(:cols="6",
                            :sm="9")
                                v-progress-linear(:color="skill.color",
                                :value="skill.percent")
</template>

<script>
export default {
    name: 'SkillsCategory',
    props: {
        title: { type: String, default: '' },
        itemsLeft: { type: Array, default: () => ([]) },
        itemsRight: { type: Array, default: () => ([]) },
        twoCol: { type: Boolean, default: true }
    }
};
</script>

<style scoped></style>
