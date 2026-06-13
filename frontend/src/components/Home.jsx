import NavBar from "../HomeComponents/NavBar";
import Hero from "../HomeComponents/Hero";
import Search from "../HomeComponents/Search";
import EquipmentHome from "../HomeComponents/EquipmentHome";
import Work from "../HomeComponents/Work";
import Benefits from "../HomeComponents/Benefits";
import Footer from "../HomeComponents/Footer";

const Home=()=>
{
    return(
        <>
            <NavBar />
            <Hero />
            {/* <Search className="bg-[#FCF5E5]"/>   */}
            {/* <EquipmentHome />  */}
            <Work />
            <Benefits  />
            <Footer />
            
        
        
        </>
    )
}

export default Home;