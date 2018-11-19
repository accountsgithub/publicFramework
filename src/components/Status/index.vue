<template>
    <div>
        <span v-if="statusType == '已停止' || statusType == 'Stopped'" class="el_state_dot">{{statusType}}</span>
        <span v-else-if="statusType == '运行中' || statusType == 'Operating'" class="el_state_dot status-agree">{{statusType}}</span>
        <span v-else-if="statusType == '故障' || statusType == 'Faulty/Deployment Failed'" class="el_state_dot status-back">{{statusType}}</span>
        <span v-else-if="statusType == '初始' || statusType == 'Deploying'" class="el_state_dot status-default">{{statusType}}</span>
        <span v-else-if="statusType == '启动中' || statusType == 'Starting'" class="el_state_dot status-begin">{{statusType}}</span>
        <span v-else-if="statusType == '系统崩溃' || statusType == 'System Crash'" class="el_state_dot status-error">{{statusType}}</span>
    </div>
</template>

<script>
export default {
    name: 'index',
    props: ['statusType']
}
</script>
