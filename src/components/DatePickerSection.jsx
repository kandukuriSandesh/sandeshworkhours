import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { workShifts } from '../constants/hoursData';
import { toast } from 'react-toastify';
import { downloadCsv } from '../utils.js';
function DatePickerSection() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [hoursWorked, sethoursWorked] = useState();
  const [tableHoursData, setTableHoursData] = useState();
  const [checked, setChecked] = useState(false);

  console.log({ startDate, endDate });

  const getHoursInformation = () => {
    if (!startDate || !endDate) toast('Please select appropriate date range');
    let startDateObject = new Date(startDate).getTime();
    let endDateObject = new Date(endDate).getTime();
    console.log({ startDateObject, endDateObject });
    if (startDateObject == endDateObject) {
      toast('Start date and End date cannot be same');
      return;
    } else if (startDateObject > endDateObject) {
      toast('start date cannot be greater than end date');
      return;
    }
    let hoursRange = workShifts.filter((infoObject) => {
      let adjustedEndDate = new Date(endDate);
      adjustedEndDate.setHours(23, 59, 59, 999);
      return !checked
        ? new Date(infoObject.date) > startDate && new Date(infoObject.date) <= adjustedEndDate
        : (new Date(infoObject.date) > startDate &&
            new Date(infoObject.date) <= adjustedEndDate &&
            infoObject.holiday) ||
            infoObject.special_day;
    });

    if (!hoursRange) {
      toast('No hours worked during specificed period');
      return;
    }
    let totalHoursWorked = hoursRange.reduce((acc, obj) => obj.total_hours + acc, 0);
    sethoursWorked(totalHoursWorked);
    setTableHoursData(hoursRange);
  };

  const toggle = (e) => {
    setChecked(e.target.checked);
  };

  return (
    <div>
      <div className="bg-white rounded-2xl shadow-lg   p-8 ">
        <h1 className="">Enter Date Range to get hours information</h1>
        <div>
          <div className="flex flex-col md:flex-row items-center justify-around p-6 gap-10">
            <div className="relative">
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  setTableHoursData(null)
                  setStartDate(date)
                }}
                isClearable
                maxDate={new Date()}
                dateFormat={'dd/MM/yyyy'}
                className="border border-gray-800 rounded-md p-2"
                placeholderText="Start Date"
              >
                <div style={{ color: 'red' }}>
                  Don't forget to select dates as per payroll cutoff!
                </div>
              </DatePicker>
            </div>

            <div className="relative">
              <DatePicker
                selected={endDate}
                onChange={(date) => {
                  setTableHoursData(null)
                  setEndDate(date)
                }}
                isClearable
                dateFormat={'dd/MM/yyyy'}
                maxDate={new Date()}
                className="border border-gray-800 rounded-md p-2"
                placeholderText="End Date"
              >
                <div style={{ color: 'red' }}>
                  Don't forget to select dates as per payroll cutoff!
                </div>
              </DatePicker>
            </div>

            <div>
              <button
                className=" border border-indigo-500 p-2 bg-gray-500 text-white rounded-md"
                onClick={getHoursInformation}
              >
                {' '}
                Click to get Hours Information{' '}
              </button>
            </div>
          </div>
          <div className="flex flex-row justify-center items-center">
            <input
              type="checkbox"
              onChange={toggle}
              className=" h-4 w-4 text-blue-400"
              value={checked}
              name=""
              id=""
            />
            <span className="ml-2">Only holidays and special days</span>
          </div>
        </div>
        {tableHoursData && (
          <div className="overflow-x-auto mt-4">
            <div className=" border border-dashed border-gray-600 p-4 rounded-full">
              <h1>
                A total of {Number(hoursWorked).toFixed(2)} hours worked during specified period excluding start
                date.{' '}
              </h1>
            </div>

            <div className="mt-4">
              <button
                className="p-4 bg-gray-100 border hover:border-gray-500 hover:bg-slate-400 hover:scale-110 transition-all duration-500 rounded-xl "
                onClick={() =>
                  downloadCsv(
                    tableHoursData,
                    startDate.toLocaleDateString('en-GB'),
                    endDate.toLocaleDateString('en-GB')
                  )
                }
              >
                {' '}
                Download Excel Sheet{' '}
              </button>
            </div>
            <table className="min-w-full divide-y divide-gray-200 shadow-sm mt-5 rounded-lg overflow-hidden">
              <thead className="bg-gray-50  ">
                <tr>
                  <th className="px-6 py-3 text-center  text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Start Time
                  </th>
                  <th className="px-6 py-3 text-center  text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    End Time
                  </th>
                  <th className="px-6 py-3 text-center  text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Total Hours
                  </th>
                  <th className="px-6 py-3 text-center  text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Break
                  </th>
                  <th className="px-6 py-3 text-center  text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Holiday
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tableHoursData.map((dataObject, idx) => (
                  <tr
                    key={`${dataObject.date}-${idx}`}
                    className={`${dataObject.red ? " bg-red-300 hover:bg-red-500  ":dataObject.special_day ? 'bg-blue-300 hover:bg-blue-400 ' : dataObject.holiday ? 'bg-green-300 hover:bg-green-500 ' : 'even:bg-gray-50 hover:bg-gray-100'}  transition-colors`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">{dataObject.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                      {dataObject.start}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">{dataObject.end}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                      {dataObject.total_hours}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                      {dataObject.break ?? 'No break'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                      {dataObject.holiday
                        ? 'Applied Holiday'
                        : dataObject.special_day
                          ? dataObject.special_day
                          : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default DatePickerSection;
