<template>
    <div 
        :style="{width}" 
        :class="{active: isActive}" 
        class="step-line"/>
</template>

<script>
export default {
    name: 'StringLine',
    props: {
        isActive: {
            type: Boolean
        },
        width: {
            type: String,
            default: '96px'
        }
    }
}
</script>

<style scoped lang="scss">
    .step-line {
        height: 6px;
        background-color: #dfe6ed;
        &.active {
            background-color: #0ad682 !important;
        }
    }
</style>
