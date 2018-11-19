<template>
    <div class="step">
        <StepLine
            :width="step.lineWidth"
            :is-active="lineStatus"/>
        <StepIcon
            v-on:click.native="linkTo"
            :status="status"
            :title="step.title"
        >
            <template slot="icon">
                <i :class="[step.iconName]" class="iconfont"/>
            </template>
        </StepIcon>
        <StepLine v-if="step.hasTailLine" :is-active="lineStatus"/>
    </div>
</template>

<script>
import StepIcon from './StepIcon'
import StepLine from './StepLine'
export default {
    name: 'Step',
    components: {
        StepLine,
        StepIcon
    },
    props: {
        step: {
            type: Object,
            required: true
        },
        activeStep: {
            type: Number,
            required: true
        },
        stepIndexKey: {
            type: Number,
            required: true
        },
        setStepFn: {
            type: Function
        }
    },

    methods: {
        linkTo() {
            if (this.activeStep > this.stepIndexKey) {
                this.setStepFn(this.stepIndexKey, false)
            }
        }
    },

    computed: {
        isActive: function() {
            return this.activeStep === this.stepIndexKey
        },

        lineStatus: function() {
            if (this.activeStep >= this.stepIndexKey) {
                return true
            }
        },

        status: function() {
            if (this.activeStep > this.stepIndexKey) {
                return 'completed'
            }

            if (this.activeStep === this.stepIndexKey) {
                return 'active'
            }
        }
    }
}
</script>

<style scoped lang="scss">
    .step {
        display: flex;
        align-items: center;
    }
</style>
