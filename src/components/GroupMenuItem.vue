<template>
    <div class="vconst-menu-group">
        <div class="vconst-group-title">{{groupTitle}}</div>
        <SignleMenuItem v-bind:sigle-menu-title="menuItem" v-bind:group-title="groupTitle" v-for="(menuItem, key) in menuItems.options" :key="key"></SignleMenuItem>
    </div>
</template>
<script>
    import SignleMenuItem from './SingleMenuItem.vue';
    export default {
        props:["group-title", "menu-items"],
        data: function() {
            return {
            }
        },
        mounted: function(){
        },
        created() {
        },
        methods: {
        },
        watch: {
        },
        components: {
            SignleMenuItem,
        }
    }
</script>