<template>
    <el-dialog :title="$t('projectMgt.addEmail_button')" :visible.sync="dialogVisible" width="600px">
        <el-form :model="EmailForm" label-width="100px">
            <el-form-item :label="$t('part.email')">
                <el-input v-model="EmailForm.emails" auto-complete="off" :placeholder="$t('part.emailPlaceholder')"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelWhiteIp">{{$t('part.cancelLabel')}}</el-button>
            <el-button type="primary" @click="saveWhiteIp">{{$t('part.okLabel')}}</el-button>
        </div>
    </el-dialog>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    name: 'EmailList',
    props: {
        EmailDialog: {
            type: Boolean
        },
        EmailForm: {
            type: Object
        }
    },
    computed: {
        dialogVisible: {
            get() {
                return this.EmailDialog
            },
            set() {
                this.$emit('update:close')
            }
        }
    },
    methods: {
        ...mapActions(['setEamil']),
        cancelWhiteIp() {
            this.$emit('update:close')
        },
        saveWhiteIp() {
            const params = {
                projectId: this.EmailForm.projectId,
                emails: this.EmailForm.emails
            }
            this.setEamil(params)
                .then(() => {
                    this.$message({
                        type: 'success',
                        message: this.$t('part.saveSuccessMes')
                    })
                    this.$emit('update:close')
                    location.reload()
                    // location.href = location.href
                })
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
