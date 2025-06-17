import { useState } from 'react'
import ReactLogo from '@public/react.svg'//这里如果直接使用/无法访问，svgr不会处理public目录的静态svg，所以只能通过@public别名来访问
import ViteLogo from '@public/vite.svg'//注意组件名要大驼峰，否则ts报错
import './App.css'
import Test from './Test'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <ViteLogo />
      <ReactLogo />
      <Test />
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
