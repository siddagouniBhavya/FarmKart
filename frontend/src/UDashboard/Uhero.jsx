import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { getAll } from '../api/equipment';
import { useAuth } from '../state/AuthState';

import ActionCard from './ActionCard';


const Uhero = () => {
  const navigate = useNavigate();
  const {user}=useAuth();

  return (
    <div className="flex bg-[#F8F9FA] font-sans">

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Welcome back, {user?.username}!
          </h1>
          <p className="text-gray-500 text-sm md:text-base">
            Manage your farm equipment efficiently.
          </p>
        </header>

        {/* Quick Actions */}
        <section className="bg-white rounded-xl border border-gray-300 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-700 border-b border-gray-200 pb-3">
            Quick Actions
          </h2>

          <p className="text-gray-500 text-sm my-4">
            What would you like to do?
          </p>

          <div className="grid md:grid-cols-3 gap-6">

            {/* GREEN */}
            <ActionCard 
            title="Browse Equipment"
            image="/images/green-bg.png"
            icon="ri-search-eye-line"
            onClick={()=>navigate("/equipmentlist")}
            overlay="from-green-900/60 to green-700/20"
            />

            {/* BLUE */}
              <ActionCard
              title="Add Equipment"
              image="/images/blue-bg1.png"
              icon="ri-add-circle-line"
              onClick={() => navigate("/addequipments")}
              overlay="from-blue-900/60 to-blue-500/20"
            />
           
            {/* ORANGE */}
         <ActionCard
            title="My Orders"
            image="/images/orange_bg.png"
            icon="ri-draft-line"
            onClick={() => navigate("/vieworders")}
            overlay="from-orange-900/60 to-orange-400/20"
          />

          </div>
        </section>
        
        {/* My Equipments and Order */}
         <section className="bg-white rounded-xl border border-gray-300 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-700 border-b border-gray-200 pb-3">
            My Equipments And Orders
          </h2>

          <p className="text-gray-500 text-sm my-4">
          Manage your equipments and orders
          </p>

          <div className="grid md:grid-cols-3 gap-6">

            {/* GREEN */}
              <ActionCard
              title="My Equipment"
              image="/images/my_equipments.png"
              icon="ri-tools-line"
              onClick={() => navigate("/myEquipments")}
              overlay="from-green-900/60 to-green-700/20"
            />

            {/* BLUE */}
             <ActionCard
              title="Booking Request"
              image="/images/booking _request.png"
              icon="ri-notification-3-line"
              onClick={() => navigate("/bookingrequest")}
              overlay="from-blue-900/60 to-blue-500/20"
            />


            {/* ORANGE */}
        
          <ActionCard
            title="My Rental Orders"
            image="/images/active_orders.png"
            icon="ri-file-list-3-line"
            onClick={() => navigate("/activeorders")}
            overlay="from-orange-900/60 to-orange-400/20"
          />

          </div>
        </section>

      </div>
    </div>
  );
};

export default Uhero;