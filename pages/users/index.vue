<template>
    <ul class="users">
        <li
            v-for="user in users"
            :key="user.email">
            <a :href="`mailto:${user.email}`">
                {{ user.name }} {{ user.surname }}
            </a>
        </li>
    </ul>
</template>

<script>

export default {
    name: 'Users',
    middleware: ['auth', 'load-users'],
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

