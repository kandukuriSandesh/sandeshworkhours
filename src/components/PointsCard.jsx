// src/components/PointsCard.jsx
import { XMarkIcon } from '@heroicons/react/24/solid';
import React from 'react';

export default function PointsCard({ 
  title, 
  points = [],
  toggleModel
}) {
  return (
     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="relative bg-white rounded-2xl shadow-lg p-8 w-full max-w-[50%] mx-4">
      <button
        onClick={toggleModel}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        aria-label="Close"
      >
        <XMarkIcon className="h-6 w-6" />
      </button>

      <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>

      <div className=" text-xl text-left float-left space-y-2 text-gray-700">
        {points.map((point, idx) => (
          <h5 key={idx}>{point}</h5>
        ))}
      </div>
    </div>
  </div>
  );
}
