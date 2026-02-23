import React from "react";

const WelcomeCard = () => {
  return (
    <div className="bg-white rounded-lg p-6 flex justify-between items-start border border-gray-200">
      {/* Left content */}
      <div className="max-w-lg">
        <p className="text-base text-gray-900 mb-1">
          Welcome back, Dr. Mehta!
        </p>
        <p className="text-sm text-gray-700 mb-4">
          Leading with vision, inspiring excellence in education.
        </p>

        <div className="bg-blue-50 rounded-md border-l-4 border-blue-600 p-4">
          <div className="flex items-center gap-3 mb-1">
            {/* Custom Quote Icon */}
            <div className="bg-blue-100 rounded-md w-6 h-6 flex justify-center items-center">
              <span className="text-blue-600 font-bold text-sm leading-none select-none">
                &#8220;&#8221; {/* Unicode Left and Right Double Quotes */}
              </span>
            </div>
            <span className=" font-semibold text-sm">
              Quote of the Day
            </span>
          </div>
          <p className="text-sm ml-9 italic leading-relaxed">
            Leadership is not about being in charge. It is about taking care of those in your charge.
          </p>
        </div>
      </div>

      {/* Right content */}
      <div className="text-right mt-12">
        <p className="text-4xl font-bold text-blue-600 leading-none">21</p>
        <p className="text-sm text-gray-600">Sunday</p>
        <p className="text-sm text-gray-600">September 2025</p>
      </div>
    </div>
  );
};

export default WelcomeCard;
