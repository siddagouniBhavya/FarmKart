import {Navigate} from "react-router-dom"
import { useAuth } from "./AuthState";
import Loader from "../components/Loader";

const ProtectionRoute=({children,role})=>{
    const {user,loading}=useAuth();
    //wait until auth is checked
    if(loading){
        return( <div><Loader /></div>);
    }
    if(!user){
        return <Navigate to="/login"/>
    }
    if(role && user?.role!==role){
        return <Navigate to="/login"/>;
    }
    return children;
};
export default ProtectionRoute;