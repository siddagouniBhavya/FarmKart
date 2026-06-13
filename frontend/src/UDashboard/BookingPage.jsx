import Swal from "sweetalert2";
import { useState,useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { createBooking, getSingleEquipment } from "../api/equipment";
import Loader  from "../components/Loader";
import { getBookedDates } from "../api/equipment";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


const BookingPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedEquipment,setSelectedEquipment]=useState(null);
  const [bookedDates,setBookedDates]=useState([]);


  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const res=await getSingleEquipment(id);
        setSelectedEquipment(res.equipment)
        const bookedRes=await getBookedDates(id);
        setBookedDates(bookedRes.bookedDates);

        
      }
      catch(err){
        console.log(err.message)
      }

    };
    fetchData()
  },[id]);
  
const toLocalDate=(dateStr)=>{
  return new Date(dateStr + "T00.00.00");
}

const isDateRangeBooked = (start, end) => {
  if (!start || !end) return false;

  for (const booking of bookedDates) {
    const bookedStart = new Date(booking.startDate);
    const bookedEnd = new Date(booking.endDate);

    if (start <= bookedEnd && end >= bookedStart) {
      return true;
    }
  }

  return false;
};

// converting booking ranges to individual values

const bookedDateArray = [];

bookedDates.forEach((booking) => {
  let current = new Date(booking.startDate);
  let end = new Date(booking.endDate);

  while (current <= end) {
    bookedDateArray.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
});




  
  if(!selectedEquipment){
    return <Loader />
  }
  

  // Calculate days
  const days =
    startDate && endDate
      ? (new Date(endDate) - new Date(startDate)) /
          (1000 * 60 * 60 * 24) +
        1
      : 0;

  const total = days > 0 ? days * selectedEquipment.price : 0;

  //Button enabled only if valid dates selected
const isBooked =
  startDate &&
  endDate &&
  isDateRangeBooked(startDate, endDate);

const today=new Date();
today.setHours(0,0,0,0)

const isValid =
  startDate &&
  endDate &&
  new Date(startDate) >= today &&
  new Date(endDate) >= new Date(startDate) &&
  !isBooked;


  const handleSubmit = async() => {
      try{
        const bookingData={
          equipmentId:selectedEquipment._id,
          startDate,endDate,totalPrice:total
        };
       
        const res=await createBooking(selectedEquipment._id,bookingData);
        Swal.fire({
        title: "Booked succesfully,wait for approval;",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
    }).then(() => navigate("/vieworders"));
      }
      catch(err){
        Swal.fire({
          title:err.response?.data?.message || "Booking Failed",
          icon:"error"
        });
      }
  };


  return (
    <div className="min-h-screen w-screen bg-gray-100">
      {/* Header */}
      <div className="bg-green-700 text-white flex gap-3 p-4">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft />
        </button>
        Booking
      </div>

      <div className="max-w-4xl mx-auto p-4 bg-white mt-4 rounded-xl">
        <img
          src={selectedEquipment.image}
          className="w-full h-80 object-cover rounded"
        />

        <h2 className="text-xl font-bold mt-4">
          {selectedEquipment.name}
        </h2>

        <p className="text-green-700 font-semibold">
          ₹{selectedEquipment.price}/day
        </p>
          {/* date pickers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">

                  <div className="relative w-full flex">
                    <DatePicker
                      selected={startDate}
                      onChange={(date) =>
                        setStartDate(date.toLocaleDateString("en-CA"))
                      }
                      highlightDates={[
                        {
                          "react-datepicker__day--highlighted-custom-1":
                            bookedDateArray,
                        },
                      ]}
                      wrapperClassName="w-full"
                      minDate={new Date()}
                      excludeDates={bookedDateArray}
                      placeholderText="Select Start Date"
                      className="border p-2 rounded w-full"
                    />
                  </div>

                  <div className="relative w-full flex">
                    <DatePicker
                      selected={endDate}
                      onChange={(date) =>
                        setEndDate(date.toLocaleDateString("en-CA"))
                      }
                      highlightDates={[
                        {
                          "react-datepicker__day--highlighted-custom-1":
                            bookedDateArray,
                        },
                      ]}
                      wrapperClassName="w-full"
                      minDate={
                        startDate || new Date()}
                      excludeDates={bookedDateArray}
                      placeholderText="Select End Date"
                      className="border p-2 rounded w-full"
                    />
                  </div>



                </div>


            <div className="mt-2 text-sm text-gray-600">
              🔴 Red dates are already booked and cannot be selected
            </div>


              {isBooked && (
                <p className="text-red-500 mt-2 font-medium">
                  Equipment is already booked for the selected dates
                </p>
              )}

        <div className="flex justify-between mt-4">
          <span>Total ({days || 0} days)</span>
          <span className="font-bold text-green-700">
            ₹{total}
          </span>
        </div>

        <button
          disabled={!isValid}
          onClick={handleSubmit}
          className={`w-full py-3 mt-4 rounded text-white font-semibold transition
            ${
              isValid
                ? "bg-green-700 hover:bg-green-800"
                : "bg-gray-400 cursor-not-allowed"
            }`}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default BookingPage;