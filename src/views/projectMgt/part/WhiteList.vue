<template>
    <el-dialog :title="$t('part.addWhiteList')" :visible.sync="dialogVisible" width="600px">
        <el-form :model="whiteIpFrom" label-width="100px">
            <el-form-item :label="$t('part.whiteIp')">
                <el-input v-model="whiteIpFrom.whiteList" auto-complete="off" :placeholder="$t('part.whiteIpPlaceholder')"></el-input>
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
    name: 'WhiteList',
    props: {
        whiteIpDialog: {
            type: Boolean
        },
        whiteIpFrom: {
            type: Object
        }
    },
    computed: {
        dialogVisible: {
            get() {
                return this.whiteIpDialog
            },
            set() {
                this.$emit('update:close')
            }
        }
    },
    methods: {
        ...mapActions(['setWhiteIp']),
        cancelWhiteIp() {
            this.$emit('update:close')
        },
        saveWhiteIp() {
            const params = {
                projectId: this.whiteIpFrom.projectId,
                whiteList: this.whiteIpFrom.whiteList
            }
            this.setWhiteIp(params)
                .then(() => {
                    this.$message({
                        type: 'success',
                        message: this.$t('part.whiteIpSuccessMes')
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
