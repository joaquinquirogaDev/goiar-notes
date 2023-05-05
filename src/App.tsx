import {
  lazy,
  Suspense
} from 'react'

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import './App.css'

//Pages Lazy Loading
const Home = lazy(() => import('./Pages/Home/Home'))
const Details = lazy(() => import('./Pages/Details/Details'))


function App() {
  return <>
    <Router>
      <Suspense fallback={<p>Cargando...</p>}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/details/:id' element={<Details/>}/>
        </Routes>
      </Suspense>
    </Router>

  </>

}

export default App
