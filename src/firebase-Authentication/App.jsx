import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './firebase-Authentication/Login'
import Signup from './firebase-Authentication/Signup'
import Home from './firebase-Authentication/Home'
import  "./App.css"

const App = () => {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App