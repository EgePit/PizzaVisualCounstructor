<template>
    <div class="vconst-menu">
        <h3>Menu:</h3>
        <GroupMenuItem v-bind:group-title="item.key" v-bind:menu-items="menu[item.key]" v-for="item in layers" :key="item.key"></GroupMenuItem>
    </div>
</template>
<script>
    import GroupMenuItem from './GroupMenuItem.vue';
    export default {
        data: function() {
            return {
                menu:[],
                layers:[]
            }
        },
        mounted: function(){
        },
        created() {
            this.get_menu();
        },
        methods: {
            sortLayers(obj) {
                var arr = [];
                var prop;
                for (prop in obj) {
                    if (obj.hasOwnProperty(prop)) {
                        arr.push({
                            'key': prop,
                            'value': obj[prop]
                        });
                    }
                }
                arr.sort(function(a, b) {
                    return a.value - b.value;
                });

                return arr; // returns array
            },
            get_menu:function () {
                var vm = this;
                this.$http.get(this.$root.api_url,  {params: {action: 'get_menu'}})
                    .then(function (response) {
                        vm.menu = response.data;
                        var tmpLayers = [];
                        for (var key in response.data) {
                            vm.$root.rules[key] = response.data[key]['rules'];
                            tmpLayers[key] = response.data[key]['layer'];
                        }

                        vm.$root.layers = vm.sortLayers(tmpLayers);
                        vm.layers = vm.$root.layers;
                    })
                    .catch(function (error) {
                        console.log(error.message);
                    });
            }
        },
        watch: {
        },
        components: {
            GroupMenuItem,
        }
    }
</script>
