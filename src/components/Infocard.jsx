import { InformationCircleIcon } from '@heroicons/react/24/solid';

export default function InfoCard({ toggleModel, content, payslip }) {
  return (
    <div className="flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg   p-8 ">
        <button
          onClick={toggleModel}
          className={`flex justify-center items-center gap-2 w-[300px] text-center  text-white text-lg font-semibold px-5 py-3 rounded-lg transition-shadow shadow-md hover:shadow-xl focus:outline-none focus:ring-2 ${
            payslip
              ? ' bg-indigo-600 hover:bg-gray-700'
              : 'focus:ring-indigo-500 bg-gray-600 hover:bg-indigo-700'
          }`}
        >
          {!payslip && <InformationCircleIcon className="h-6 w-6" />}
          {content}
        </button>
      </div>
    </div>
  );
}
