import Vue from 'vue';

Vue.prototype.$breakpoint = new Vue({
    data()
    {
        return {
            mountedBreakpoints: {},
            default: {
                xs: true,
                xsOnly: true,
                xsAndUp: true,
                sm: false,
                smOnly: true,
                smAndDown: true,
                smAndUp: false,
                md: false,
                mdOnly: false,
                mdAndDown: true,
                mdAndUp: false,
                lg: false,
                lgOnly: false,
                lgAndDown: true,
                lgAndUp: false,
                xl: false,
                xlOnly: false,
                xlAndDown: true
            },
            width: 0,
        };
    },
    computed: {
        is()
        {
            return Object.keys(this.$vuetify.default).reduce((breakpoints, dim) =>
            {
                breakpoints[dim] = this.breakpointWithDefault(dim);
                return breakpoints;
            }, {});
        }
    },
    methods: {
        breakpointWithDefault(breakpoint)
        {
            return Object.keys(this.$data.mountedBreakpoints).length > 0 ? this.$data.mountedBreakpoints[breakpoint] : this.$data.default[breakpoint];
        }
    }
});

export default async function ({ app })
{
    if (!app.mixins)
    {
        app.mixins = [];
    }

    app.mixins.push({
        mounted()
        {

            if (process.client)
            {
                this.$nextTick(() =>
                {
                    // For some reason, this.clientWidth returns double screen
                    // width, and <html> width is correct, so using that
                    // instead. Also setting everything back to this.$vuetify.breakpoint
                    let html = document.getElementsByTagName('HTML');
                    let width = html && html.length>0
                        ? html[0].clientWidth
                        : 0;
                    this.$breakpoint.$data.mountedBreakpoints = this.$vuetify.breakpoint;
                    let thresholds = this.$breakpoint.$data.mountedBreakpoints.thresholds;
                    this.$breakpoint.$data.mountedBreakpoints.width = width;
                    let scrollBarWidth = this.$breakpoint.$data.mountedBreakpoints.scrollBarWidth;

                    const xs = width < thresholds.xs;
                    const sm = width < thresholds.sm && !xs;
                    const md = width < (thresholds.md - scrollBarWidth) && !(sm || xs);
                    const lg = width < (thresholds.lg - scrollBarWidth) && !(md || sm || xs);
                    const xl = width >= (thresholds.lg - scrollBarWidth);

                    this.$breakpoint.$data.mountedBreakpoints.xs = xs;
                    this.$breakpoint.$data.mountedBreakpoints.sm = sm;
                    this.$breakpoint.$data.mountedBreakpoints.md = md;
                    this.$breakpoint.$data.mountedBreakpoints.lg = lg;
                    this.$breakpoint.$data.mountedBreakpoints.xl = xl;

                    this.$breakpoint.$data.mountedBreakpoints.xsOnly = xs;
                    this.$breakpoint.$data.mountedBreakpoints.smOnly = sm;
                    this.$breakpoint.$data.mountedBreakpoints.smAndDown = (xs || sm) && !(md || lg || xl);
                    this.$breakpoint.$data.mountedBreakpoints.smAndUp = !xs && (sm || md || lg || xl);
                    this.$breakpoint.$data.mountedBreakpoints.mdOnly = md;
                    this.$breakpoint.$data.mountedBreakpoints.mdAndDown = (xs || sm || md) && !(lg || xl);
                    this.$breakpoint.$data.mountedBreakpoints.mdAndUp = !(xs || sm) && (md || lg || xl);
                    this.$breakpoint.$data.mountedBreakpoints.lgOnly = lg;
                    this.$breakpoint.$data.mountedBreakpoints.lgAndDown = (xs || sm || md || lg) && !xl;
                    this.$breakpoint.$data.mountedBreakpoints.lgAndUp = !(xs || sm || md) && (lg || xl);
                    this.$breakpoint.$data.mountedBreakpoints.xlOnly = xl;

                    switch (true)
                    {
                    case (xs):
                        this.$breakpoint.$data.mountedBreakpoints.name = 'xs';
                        break;
                    case (sm):
                        this.$breakpoint.$data.mountedBreakpoints.name = 'sm';
                        break;
                    case (md):
                        this.$breakpoint.$data.mountedBreakpoints.name = 'md';
                        break;
                    case (lg):
                        this.$breakpoint.$data.mountedBreakpoints.name = 'lg';
                        break;
                    default:
                        this.$breakpoint.$data.mountedBreakpoints.name = 'xl';
                        break;
                    }
                    this.$vuetify.breakpoint = this.$breakpoint.$data.mountedBreakpoints;
                });
            }
        }
    });
}

