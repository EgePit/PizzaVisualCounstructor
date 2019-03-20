<template>
    <div class="vconst-wrapper">
        <MenuList></MenuList>
        <ConstructorPreview></ConstructorPreview>
        <Actions></Actions>
    </div>
</template>
<script>
import MenuList from './components/MenuList.vue';
import ConstructorPreview from './components/ConstructorPreview.vue';
import Actions from './components/Actions.vue';
export default {
    data: function() {
        return {
        }
    },
    watch: {
    },
    components: {
        MenuList,
        ConstructorPreview,
        Actions
    }
}
</script>