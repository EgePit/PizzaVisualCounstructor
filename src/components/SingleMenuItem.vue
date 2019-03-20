<template>
    <div class="vconst-signle-menu-item" v-bind:class="{selected:isSelected}" @click="set_item()">
        <img class="vconst-thumb" :src="sigleMenuTitle.thumb"/>
        {{sigleMenuTitle.title}}
    </div>
</template>
<script>
    export default {
        props:["sigle-menu-title", "group-title"],
        data: function() {
            return {
                isSelected:false,
                thumb: ''
            }
        },
        mounted: function(){
        },
        created() {
            this.thumb = this.$root.api_url+this.sigleMenuTitle.title.toLowerCase()+'.png';
        },
        methods: {
            set_item:function() {
                this.isSelected = !this.isSelected;
                if(this.isSelected) {
                    if(this.$root.rules[this.groupTitle]['max'] <= 1) {
                        this.$set(this.$root.product, this.groupTitle, this.sigleMenuTitle.id);
                    } else {
                        if(typeof this.$root.product[this.groupTitle] === 'undefined') {
                            this.$set(this.$root.product, this.groupTitle, []);
                            this.$set(this.$root.product[this.groupTitle], 0, this.sigleMenuTitle.id);
                        } else {
                            this.$root.product[this.groupTitle].push(this.sigleMenuTitle.id);
                        }
                    }
                } else {
                    if(this.$root.rules[this.groupTitle]['max'] <= 1) {
                        this.$set(this.$root.product, this.groupTitle, 0);
                    } else {
                        var index = this.$root.product[this.groupTitle].indexOf(this.sigleMenuTitle.id);
                        this.$root.product[this.groupTitle].splice(index,1);
                    }
                }

            }
        },
        watch:{
            test : {
                handler:function() {
                    console.log(this.test)
                },
                deep: true
            },
            "$root.product":{
                handler:function() {
                    if(this.$root.rules[this.groupTitle]['max'] <= 1 && this.$root.product[this.groupTitle] !== this.sigleMenuTitle.id) {
                        this.isSelected = false;
                    }
                },
                deep:true
            }
        },
    }
</script>