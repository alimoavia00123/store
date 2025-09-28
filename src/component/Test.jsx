import React from "react";

const Test = () => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-lg w-64 ml-30">
      <img
        src="https://www.kfcpakistan.com/images/97a8fe70-7688-11f0-9442-f17609a5500f-FamilyFestival3copy-2025-08-11075548.png"
        alt="Family Festival 3 meal"
        className="w-full h-48 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
      />
      <h3 className="text-lg font-bold mt-4">Family Festival 3</h3>
      <p className="text-gray-600 text-sm">
        4 Zinger burgers, 4 crispy chicken, 2 dinner rolls & a 1.5L drink.
      </p>
      <p className="text-green-600 font-semibold mt-2">PKR 2490</p>
      <button className="mt-3 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600">
        Add to Cart
      </button>
    </div>
  );
};

export default Test;

