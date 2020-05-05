<template lang="pug">
    ul.users
        li(v-for="user in users",
        :key="user.email")
            a(:href="`mailto:${user.email}`").
                {{ user.name }} {{ user.surname }}
</template>

<script>

export default {
    name: 'Users',
    head()
    {
        return {
            meta: [
                { name: 'robots', content: 'noindex' },
            ],
        };
    },
    computed: {
        users()
        {
            if (this && this.$store)
            {
                return this.$store.getters['users/list'];
            }
            return [];
        }
    },
    middleware: ['local-auth', 'load-users'],
    fetch({ store })
    {
        store.dispatch('users/loadUsers');
    },
    created()
    {
        this.$store.dispatch('users/loadUsers');
    }
};
</script>

