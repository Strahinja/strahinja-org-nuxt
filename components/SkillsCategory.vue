<template>
    <div>
        <h4
            :class="{
                'subtitle-1 mb-7': true,
                'px-10': $breakpoint.is.smAndUp,
                'px-4': $breakpoint.is.xsOnly
            }">
            {{ title }}
        </h4>
        <v-container fluid no-gutters>
            <v-row
                v-if="twoCol === true"
                :class="{
                    'px-10': $breakpoint.is.smAndUp,
                    'px-4': $breakpoint.is.xsOnly
                }">
                <v-col
                    :cols="12"
                    :md="6"
                    class="pa-0"
                    :class="{
                        'pr-10': $breakpoint.is.mdAndUp
                    }">
                    <v-container fluid no-gutters class="pa-0">
                        <v-row
                            v-for="(skill, skillIndex) in itemsLeft"
                            :key="skillIndex"
                            class="mb-5 mx-0"
                            align="center">
                            <v-col :cols="6" :sm="3" class="text-truncate pa-0">
                                {{ skill.name }}
                            </v-col>
                            <v-col :cols="6" :sm="9" class="pa-0">
                                <v-progress-linear
                                    :color="skill.color"
                                    :value="skill.percent" />
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
                <v-col
                    :cols="12"
                    :md="6"
                    class="pa-0"
                    :class="{
                        'pl-10': $breakpoint.is.mdAndUp
                    }">
                    <v-container fluid no-gutters pa-0>
                        <v-row
                            v-for="(skill, skillIndex) in itemsRight"
                            :key="skillIndex"
                            class="mb-5 mx-0"
                            align="center">
                            <v-col :cols="6" :sm="3" class="text-truncate pa-0">
                                {{ skill.name }}
                            </v-col>
                            <v-col :cols="6" :sm="9" class="pa-0">
                                <v-progress-linear
                                    :color="skill.color"
                                    :value="skill.percent" />
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
            </v-row>
            <v-row
                v-else
                no-gutters
                :class="{
                    'px-10': $breakpoint.is.smAndUp,
                    'px-4': $breakpoint.is.xsOnly
                }">
                <v-col
                    xs="12"
                    class="pa-0"
                    :class="{
                        'pr-10': $breakpoint.is.mdAndUp
                    }">
                    <v-container fluid no-gutters pa-0>
                        <v-row
                            v-for="(skill, skillIndex) in itemsLeft"
                            :key="skillIndex"
                            class="mb-5 mx-0"
                            align="center">
                            <v-col :cols="6" :sm="3" class="text-truncate pa-0">
                                {{ skill.name }}
                            </v-col>
                            <v-col :cols="6" :sm="9" class="pa-0">
                                <v-progress-linear
                                    :color="skill.color"
                                    :value="skill.percent" />
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
            </v-row>
        </v-container>
    </div>
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
