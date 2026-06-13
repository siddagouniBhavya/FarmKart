import {Routes,Route} from 'react-router-dom'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Home from './components/Home.jsx'
import UserDashboard from './components/UserDashboard.jsx'
import AddEquipments from './UDashboard/AddEquipments.jsx'
import EquipmentDetail from './UDashboard/EquipmentDetail.jsx'
import EquipmentList from './UDashboard/EquipmentList.jsx'
import ViewOrders from './UDashboard/ViewOrders.jsx'
import AdminDashboard from './AdminPanel/AdminDashboard.jsx'
import BookingPage from './UDashboard/BookingPage.jsx'
import Profile from './UDashboard/Profile.jsx'
import MyEquipments from './UDashboard/myEquipmentSection/MyEquipments.jsx'
import BookingRequests from './UDashboard/myEquipmentSection/BookingRequest.jsx'
import ActiveOrders from './UDashboard/myEquipmentSection/ActiveOrders.jsx'
import SingleOrderDetails from "./UDashboard/SingleOrderDetails.jsx"
import UpdateEquipmentPage from './UDashboard/myEquipmentSection/UpdateEquipmentPage.jsx'
import UsersPage from './AdminPanel/UsersPage.jsx'
import EquipmentsPage from './AdminPanel/EquipmentsPage.jsx'
import OrdersPage from './AdminPanel/OrdersPage.jsx'
import Notify from './UDashboard/Notify.jsx'

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectionRoute from './state/ProtectionRoute.jsx'

import { useEffect } from 'react'
import { getProfile } from './api/auth.js'
import { useAuth } from './state/AuthState.jsx'

const App =()=>
{
  const {setUser,setLoading}=useAuth();
  useEffect(()=>{
    const loadUser=async()=>{
      try{
        const res=await getProfile();
        setUser(res.user)
      }
      catch(err){
        setUser(null)
      }
      finally{
        setLoading(false)
      }
    };
    loadUser();
  },[]);
  return (
    <>
   
    <Routes>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/' element={<Home />}/>
      <Route path='/login/userdashboard' element={<ProtectionRoute>
        <UserDashboard />
      </ProtectionRoute>}/>
      <Route path='/addequipments' element={<ProtectionRoute role="user">
        <AddEquipments /></ProtectionRoute>}/>
      <Route path='/Adashboard' element={<ProtectionRoute role="admin">
        <AdminDashboard />
      </ProtectionRoute>}/>
      <Route path='/equipmentlist' element={<EquipmentList />}/>
      <Route path='/equipmentdetail/:id' element={<ProtectionRoute>
        <EquipmentDetail />
      </ProtectionRoute>}/>
      <Route path='/vieworders' element={<ProtectionRoute>
        <ViewOrders />
      </ProtectionRoute>}/>
      <Route path='/bookingpage/:id' element={<ProtectionRoute>
        <BookingPage />
      </ProtectionRoute>}/>
      <Route path='/profile' element={<ProtectionRoute>
        <Profile />
      </ProtectionRoute>}/>
      <Route path='/myEquipments' element={<ProtectionRoute>
        <MyEquipments />
      </ProtectionRoute>}/>
      <Route path='/bookingrequest' element={<ProtectionRoute>
        <BookingRequests />
      </ProtectionRoute>}/>
      <Route path='/activeorders' element={<ProtectionRoute>
        <ActiveOrders />
      </ProtectionRoute>}/>
      <Route path='/singleOrderDetails/:id' element={<ProtectionRoute>
        <SingleOrderDetails />
      </ProtectionRoute>}/>
      <Route path='/updateEquipment/:id' element={<ProtectionRoute>
        <UpdateEquipmentPage />
      </ProtectionRoute>} />
      <Route path='/admin/users' element={<ProtectionRoute>
        <UsersPage />
      </ProtectionRoute>} />
      <Route path='/admin/equipments' element={<ProtectionRoute>
        <EquipmentsPage />
      </ProtectionRoute>} />
      <Route path='/admin/orders' element={<ProtectionRoute>
        <OrdersPage />
      </ProtectionRoute>}/>
      <Route path='/notify' element={<ProtectionRoute>
        <Notify />
      </ProtectionRoute>} />
    </Routes>
    

     <ToastContainer />

    
    </>
  )

}

export default App;