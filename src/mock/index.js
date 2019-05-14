import Mock from 'mockjs'
import demoList from './json/demoList.json'
import formByAPI from './json/formSource.json'
import formDataByAPI from './json/tempSource.json'
Mock.setup({
  timeout: '350-600'
})

Mock.mock(new RegExp('/demo/list', 'i'), 'get', demoList)
Mock.mock(new RegExp('/demo/formByAPI', 'i'), 'get', formByAPI)
Mock.mock(new RegExp('/demo/formDataByAPI', 'i'), 'get', formDataByAPI)

export default Mock
