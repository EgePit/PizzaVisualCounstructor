<template>
    <div id="vconst-actions">
        <button @click="orde_product">Order</button>
    </div>
</template>
<script>
    export default {
        data: function() {
            return {
            }
        },
        mounted: function(){
        },
        created() {
        },
        methods: {
            orde_product:function() {
                var vm = this;
                this.$http.post(this.$root.api_url, {action: 'create_order', product:vm.$root.product})
                    .then(function (response) {
                        console.log(response)
                    })
                    .catch(function (error) {
                        console.log(error.message);
                    });
            }
        },
        watch: {
        },
        components: {
        }
    }
</script>