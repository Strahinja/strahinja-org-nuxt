<template lang="pug">
    v-container(fluid)
        v-row.mt-3.mb-7(no-gutters)
            v-col.text-center.hidden-xs-only(v-if="showBackButton",
            :sm="1",
            align="center",
            style="min-width: 60px;")
                v-tooltip.hidden-xs-only(v-if="showBackButton",
                bottom)
                    template(v-slot:activator="{ on }")
                        v-btn.hidden-xs-only.text-center.align-center.mr-3.mt-1(
                        v-if="showBackButton",
                        fab,
                        depressed,
                        dark,
                        small,
                        :to="parentUrl",
                        color="secondary",
                        v-on="on")
                            v-icon.align-center(dark) mdi-arrow-left
                    span Назад на {{ parentName }}
            v-col.source-url-container-wrapper(:cols="12",
            :sm="10")
                slot(name="header")/
                v-container.py-0.source-url-container(v-if="sourceUrl")
                    v-row
                        v-col.py-0.text-right(:cols="12")
                            source-url(:contrastDark="sourceUrlDark"
                            :contrastLight="sourceUrlLight")/
                slot/
</template>

<script>
import SourceUrl from '~/components/SourceUrl';
export default {
    components: { SourceUrl },
    props: {
        overrideHead: { type: Boolean, default: false, required: false },
        sourceUrl: { type: Boolean, default: false, required: false },
        sourceUrlDark: { type: Boolean, default: false, required: false },
        sourceUrlLight: { type: Boolean, default: false, required: false },
    },
    computed: {
        page()
        {
            if (this && this.$store)
            {
                return this.$store.getters['pages/pageById'](
                    this.$store.state.pages.pageId);
            }
            else
            {
                return null;
            }
        },
        parentUrl()
        {
            if (this && this.page)
            {
                return this.page.parentUrl;
            }
            return '/';
        },
        parentName()
        {
            if (this && this.page)
            {
                return this.page.parentName;
            }
            return 'почетну страницу';
        },
        showBackButton()
        {
            return this.$breakpoint.is.smAndUp;
        },
    },
    head()
    {
        if (this.overrideHead)
        {
            return false;
        }
        let globals = {
            title: this.page.title,
            description: this.page.text,
            url: 'https://strahinja.org' + this.page.url.path,
            image: this.page.image,
            imageAlt: this.page.imageAlt,
        };
        return {
            meta: [
                { hid: 'og:url', name: 'og:url', property: 'og:url', content: globals.url },
                { hid: 'og:title', name: 'og:title', property: 'og:title', content: globals.title },
                { hid: 'og:description', name: 'og:description', property: 'og:description', content: globals.description },
                { hid: 'og:image', name: 'og:image', property: 'og:image', content: globals.image},
                { hid: 'og:image:alt', name: 'og:image:alt', property: 'og:image:alt', content: globals.imageAlt },
                { hid: 'twitter:url', name: 'twitter:url', content: globals.url },
                { hid: 'twitter:title', name: 'twitter:title', content: globals.title },
                { hid: 'twitter:description', name: 'twitter:description', content: globals.description },
                { hid: 'twitter:image', name: 'twitter:image', content:
                    globals.image},
                { hid: 'name', name: 'name', itemprop: 'name', content: globals.title },
                { hid: 'description', name: 'description', itemprop: 'description', content: globals.description },
                { hid: 'image', name: 'image', itemprop: 'image', content: globals.image},
            ],
            link: [
                { hid: 'canonical', rel: 'canonical', href: globals.url }
            ],
            title: globals.title,
            description: globals.description,
        };
    },
};
</script>

<style lang="sass" scoped>
.source-url-container-wrapper
    position: relative

.sm-and-down .source-url-container-wrapper
    position: static

.source-url-container
    position: absolute
    top: 0

.sm-and-down .source-url-container
    position: static
    top: initial
</style>

