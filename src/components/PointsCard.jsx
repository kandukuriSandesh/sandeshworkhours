// src/components/PointsCard.jsx
import { XMarkIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { filenames } from '../constants/constants';
import { paidMonthlyHours } from '../constants/hoursData';

export default function PointsCard({
  title,
  points = [],
  toggleModel,
  payslip = false,
  getPaySlipFileURL,
  naviagateWithFilename,
  isPasscode = false,
  passcode,
  setPasscode,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`relative bg-white rounded-2xl shadow-lg ${payslip || isPasscode ? 'p-16' : 'p-8'}   mx-4`}
      >
        <button
          onClick={toggleModel}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          aria-label="Close"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>

        {!payslip ? (
          isPasscode ? (
            <div className="flex flex-col justify-center items-center mt-8">
              <input
                className=" p-2 rounded-lg border border-gray-600  "
                type="number"
                value={passcode}
                onChange={(e) => {
                  const newValue = e.target.value;

                  if (newValue.length <= 6) {
                    setPasscode(newValue);
                  }
                }}
              />
              <button
                onClick={getPaySlipFileURL}
                className="mt-4 p-2  px-6 rounded-md bg-gray-500 text-white hover:bg-indigo-500 hover:scale-90 transition-all duration-700 "
              >
                Send
              </button>
            </div>
          ) : (
            <div className=" text-xl text-left float-left space-y-2 text-gray-700">
              {points.map((point, idx) => {
                return idx == 0 ? (
                  <h5 key={idx}>
                    1.
                    {
                      <a
                        href="/2025 payroll.pdf"
                        target="_blank"
                        className="underline text-blue-500"
                      >
                        {' '}
                        Click here{' '}
                      </a>
                    }
                    {point}
                  </h5>
                ) : (
                  <h5 key={idx}>{point}</h5>
                );
              })}
            </div>
          )
        ) : (
          <ol className=" list-none ">
            {filenames.map((filename) => {
              return (
                <li
                  className="p-2 underline text-blue-400 cursor-pointer "
                  onClick={() => naviagateWithFilename(filename, toggleModel)}
                >
                  {filename +'-'+ paidMonthlyHours[filename]}
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </div>
  );
}
