import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './components/login'
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import Dashboard from './components/dashboard'
import Addvendor from './components/vendor_regis'
import Stylesetup from './components/style_setup'
import Stylelist from './components/stylelist'
import Detailstyle from './components/detail_style'
import EditProduct from './components/editstyle'
import Colorlist from './components/colorlist'
import Prodgenerate from './components/prod_color'
import POlist from './components/polist'
import Destination from './components/destination'
import POadd from './components/AddPo'
import POSearch from './components/view_vendPo'
import Prodlist from './components/prodlist'
import Ordplan from './components/psr'
import Dailysew from './components/output'

function App() {
 
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/adminlogin" element={<Login/>}></Route>
    <Route path="/dashboard" element={<Dashboard/>}>
    <Route path="/dashboard/addvendor" element={<Addvendor/>}> </Route>
    <Route path="/dashboard/stylesetup" element={<Stylesetup/>}> </Route>
    <Route path="/dashboard/Stylelist" element={<Stylelist/>}> </Route>
    <Route path="/dashboard/Detailstyle" element={<Detailstyle/>}> </Route>
    <Route path="/dashboard/EditProduct/:id" element={<EditProduct/>}> </Route>
    <Route path="/dashboard/Colorlist" element={<Colorlist/>}> </Route>
    <Route path="/dashboard/prodgen" element={<Prodgenerate/>}> </Route>
    <Route path="/dashboard/polist" element={<POlist/>}> </Route>
    <Route path="/dashboard/dest" element={<Destination/>}> </Route>
    <Route path="/dashboard/addpo" element={<POadd/>}> </Route>
    <Route path="/dashboard/viewpo" element={<POSearch/>}> </Route>
    <Route path="/dashboard/prodlist" element={<Prodlist/>}> 
    <Route path="/dashboard/prodlist/psr" element={<Ordplan/>}> </Route>
    <Route path="/dashboard/prodlist/output" element={<Dailysew/>}> </Route>
    </Route>
    </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App