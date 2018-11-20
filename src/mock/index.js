import Mock from 'mockjs'
import demoList from './json/demoList.json'
Mock.setup({
    timeout: '350-600'
})

Mock.mock(new RegExp('/demo/list', 'i'), 'get', demoList)

export default Mock
