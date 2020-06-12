// 把reducers下counter的所有函数引入 并且通过combineReducers函数导出
import { combineReducers } from 'redux'
import counter from './counter'

export default combineReducers({
  counter
})