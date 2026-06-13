import { RiMailFill, RiPhoneFill } from "@remixicon/react";
import {
  RiToolsFill,
  RiQuestionLine,
  RiFileTextLine,
} from "@remixicon/react";

const Footer = () => {
  return (
    <div className="bg-[#5a4123] text-white pt-10 pb-6 px-4">
      
      {/* Main Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        
        {/* About */}
        <div>
          <h1 className="font-semibold text-lg mb-3">About Us</h1>
          <p className="text-sm text-gray-300 leading-relaxed">
            FarmKart helps farmers rent and list agricultural equipment easily,
            making farming more efficient and affordable.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h1 className="font-semibold text-lg mb-3">Contact Us</h1>

          <div className="flex items-center gap-2 text-sm text-gray-300 mb-2">
            <RiMailFill />
            <span>info@farmkart.com</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-300">
            <RiPhoneFill />
            <span>+123 456 7890</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h1 className="font-semibold text-lg mb-3">Quick Links</h1>

          <div className="flex items-center gap-2 text-sm text-gray-300 hover:text-green-300 transition cursor-pointer mb-2">
            <RiToolsFill />
            <span>Equipment</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-300 hover:text-green-300 transition cursor-pointer mb-2">
            <RiQuestionLine />
            <span>FAQ</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-300 hover:text-green-300 transition cursor-pointer">
            <RiFileTextLine />
            <span>Terms & Conditions</span>
          </div>
        </div>

      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-500 mt-8 pt-4 text-center text-sm text-gray-300">
        © 2026 FarmKart. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;