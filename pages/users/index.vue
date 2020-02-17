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
    middleware: ['auth', 'auth-admin', 'load-users'],
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

<style lang="sass">
</style>

