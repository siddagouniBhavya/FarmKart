import Sidebar from "../UDashboard/Sidebar";
import Uhero from "../UDashboard/Uhero";


const UserDashboard=()=>{
    return(
        <>
            <div className="h-full overflow-hidden">
                {/* Left content */}
                <div className="block lg:flex">
                    <Sidebar />
                </div>
                <div className="flex-1">
                    <Uhero />
                </div>

                
               
            </div>
        
        
        </>
    )
}

export default UserDashboard;