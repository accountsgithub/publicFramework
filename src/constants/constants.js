export const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss'


/**
 * 项目类型
 */
export const CATEGORIES = [
    {
        label: '后端',
        value: 0
    }, {
        label: '前端',
        value: 1
    }, {
        label: '组件',
        value: 2
    }
]

/**
 * 发布方式
 */
export const MODE_TYPES = [
    {
        label: '基于源码',
        alias: 'code',
        value: 0
    }, {
        label: '基于镜像',
        alias: 'mirror',
        value: 1
    }
]

//内存
export const MEMORY_SIZE = [
    {
        label: 128,
        value: 0
    },
    {
        label: 256,
        value: 1
    },
    {
        label: 512,
        value: 2
    },
    {
        label: 1024,
        value: 3
    },
    {
        label: 2048,
        value: 4
    },
    {
        label: 4096,
        value: 5
    },
]

export const UPLOAD_MODE = [
    {
        label: '在线发布',
        value: 0
    },
    {
        label: '手动导入',
        value: 1
    }
]

export const UPLOAD_TYPE = [
    {
        label: 'bug修复',
        value: 0
    },
    {
        label: '版本发布',
        value: 1
    }
]
