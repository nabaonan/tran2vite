
import './Test.less'

import vars from './vars.module.less'

const Test = () => {
  return <>
    <h3 className='test'>在js中写jsx111</h3>
    <div>js从less中读取变量 { JSON.stringify(vars)}</div>
  </>
}

export default Test;