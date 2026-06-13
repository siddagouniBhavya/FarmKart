import {
  RiShieldCheckFill,
  RiCustomerService2Fill,
  RiToolsFill
} from '@remixicon/react'

const LeftContent = () => {
  return (
    <div className="hidden md:flex md:w-3/5 h-screen relative overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <img
        src="/images/bg_tractor1.png"
        alt="bg"
        className="absolute inset-0 w-full h-full object-cover object-right"
      />

      {/* SOFT WHITE GRADIENT (DOESN'T HIDE IMAGE) */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent"></div>
      
      {/* CONTENT */}
      <div className="relative z-10 flex flex-col justify-center px-20 py-12 w-full">

        {/* LOGO */}
        <div className="flex items-center gap-2 mb-8">
          <img
            src="/images/Logo_farmkart.png"
            alt="logo"
            className="w-10"
          />
          <h1 className="text-2xl font-bold text-green-800">
            FarmKart
          </h1>
        </div>

        {/* MAIN TEXT */}
        <h1 className="text-4xl lg:text-5xl font-bold text-green-600 leading-tight mb-2">
          Right Equipment.
        </h1>

        <h2 className="text-xl text-gray-700 mb-3">
          Right Time. Right Price.
        </h2>

        <p className="text-gray-600 mb-10 max-w-sm leading-relaxed">
          FarmKart helps you rent the right equipment for every task, every season.
        </p>

        {/* FEATURES */}
        <ul className="space-y-6 text-gray-700">

          <li className="flex items-start gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <RiToolsFill className="text-green-600 text-base" />
            </div>
            <span>Wide range of rental equipment</span>
          </li>

          <li className="flex items-start gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <RiShieldCheckFill className="text-green-600 text-base" />
            </div>
            <span>Verified owners & secure payments</span>
          </li>

          <li className="flex items-start gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <RiCustomerService2Fill className="text-green-600 text-base" />
            </div>
            <span>24/7 support whenever you need</span>
          </li>

        </ul>

      </div>
    </div>
  )
}

export default LeftContent