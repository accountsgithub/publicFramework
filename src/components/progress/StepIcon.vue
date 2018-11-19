<template>
    <div
        :class="[status]"
        class="step-icon">
        <slot name="icon"/>
        <span
            :class="[status]"
            class="step-title">{{ title }}</span>
    </div>
</template>

<script>
export default {
    name: 'StepIcon',
    props: {
        status: {
            validator: (value) => {
                return !!~['active', 'completed', 'disabled'].indexOf(value)
            },
            default: 'disabled'
        },

        title: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped lang="scss">
    .step-icon {
        display: flex;
        position: relative;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        background:#ffffff;
        border:2px solid #dfe6ed;
        width:52px;
        height:52px;
        border-radius:100%;
        i {
            font-size: 20px;
            color: #dfe6ed;
        }

        &.active {
            border-color: #fff;
            background:#fcae19;
            i {
                color: #fff;
            }
        }

        &.completed {
            cursor: pointer;
            border-color: #0ad682;
            i {
                color: #0ad682;
            }
        }
    }
    .step-title {
        text-align: center;
        position: absolute;
        top: 60px;
        width: 100px;
        &.active {
            color: #fcae19;
        }
        &.completed {
            color: #0ad682;
        }
    }
</style>
