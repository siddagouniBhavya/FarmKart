import {
  RiMoneyDollarCircleFill,
  RiCalendarCheckFill,
  RiVerifiedBadgeFill
} from "@remixicon/react";

const Benefits = () => {
  return (
    <div className="bg-gray-50 py-12 px-4">
      
      {/* Heading */}
      <h1 className="text-2xl md:text-3xl font-bold text-center text-green-800 mb-10">
        Why Choose FarmKart?
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        
        {/* Card */}
        {[ 
          {
            icon: <RiMoneyDollarCircleFill className="text-green-600 w-6 h-6" />,
            title: "Affordable Rates",
            desc: "Best prices for your farm needs."
          },
          {
            icon: <RiCalendarCheckFill className="text-green-600 w-6 h-6" />,
            title: "Easy Booking",
            desc: "Quick & simple rental process."
          },
          {
            icon: <RiVerifiedBadgeFill className="text-green-600 w-6 h-6" />,
            title: "Trusted Service",
            desc: "Reliable & secure platform."
          }
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition text-center flex flex-col items-center"
          >
            {/* Icon */}
            <div className="bg-green-100 p-3 rounded-full mb-3">
              {item.icon}
            </div>

            {/* Content */}
            <h2 className="text-lg font-semibold text-gray-700">
              {item.title}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {item.desc}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Benefits;