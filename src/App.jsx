import { useState } from 'react';

import './App.css';
import InfoCard from './components/Infocard';
import useModelController from './hooks/useModelController';
import PointsCard from './components/PointsCard';
import useModel2Controller from './hooks/useModel2Controller';
import useModel3Controller from './hooks/useModel3Controller';
import axios from 'axios';
import { points } from './constants/constants';
import { ToastContainer, toast } from 'react-toastify';
import DatePickerSection from './components/DatePickerSection';

function App() {
  const { modelStatus, toggleModel } = useModelController();
  const { model2Status, toggleModel2 } = useModel2Controller();
  const { model3Status, toggleModel3 } = useModel3Controller();

  const [passcode, setPasscode] = useState();
  const [filename, setFilename] = useState('');

  const naviagateWithFilename = (filename, toggleModel) => {
    setPasscode();
    if (!filename) {
      toast('Invalid Filename');
    }
    setFilename(filename);
    toggleModel();
    toggleModel3();
  };

  const getPaySlipFileURL = async () => {
    let url;
    try {
      url = await axios.post(
        'https://sandeshworkhours.netlify.app/.netlify/functions/getPayslip',
        {
          passcode: passcode,
          filename: filename,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (err) {
      console.log(err);
      toast('Error Occured');
      if (err.response.status == 401) {
        toast('Invalid Code');
      } else if (err.response.status == 500) {
        toast('Issue with AWS,please try later');
      }
    }

    if (url.status == '200') {
      toast('Downloaded Successfully');
      window.open(url.data.url, '_blank');
    }
    setPasscode();
    toggleModel3();
  };

  return (
    <div className="">
      <div className="flex flex-col md:flex-row  justify-center items-center">
        <InfoCard toggleModel={toggleModel} content={'Important Information'} />
        <InfoCard toggleModel={toggleModel2} content={'Pay Slips'} payslip={true} />
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 space-y-4 text-left">
        <h5 className="text-lg font-medium text-gray-700">
          1. On the Pay Day of 31st January 2025, for the payroll period of 12 December 2024 - 23
          January 2025, I got paid 113.5 instead of 156.28 hours.
        </h5>

        <h5 className="text-lg font-medium text-gray-700">
          1. On the Pay Day of 28th Febraury 2025, for the payroll period of 23 January 2025 - 20
          Febraury 2025, I got paid 179.61 <span className=" text-green-700">Correctly Paid</span>
        </h5>

        <h5 className="text-lg font-medium text-gray-700">
          2. On the Pay Day of 1st April 2025, for the payroll period of 20 February 2025 - 20 March
          2025, I got paid 192.22 instead of 210.92 hours.
        </h5>

        <h5 className="text-lg font-medium text-gray-700">
          3. On the Pay Day of 1st May 2025, for the payroll period of 20 March 2025 - 16 April
          2025, I got paid 168.73 instead of 192.1 hours.
        </h5>

        <h5 className="text-lg font-medium text-gray-700">
          4. On the Pay Day of 30th May 2025, for the payroll period of 16 April 2025 - 15 May 2025,
          I got paid 202.5 instead of 217.1 hours.
        </h5>

        <h5 className="text-lg font-medium text-gray-700">
          5. On the Pay Day of 1st July 2025, for the payroll period of 15 May 2025 - 19 June 2025,
          I got paid 254.93 <span className=" text-green-700">Correctly Paid</span>
        </h5>

        <h5 className="text-lg font-medium text-gray-700">
          6. On the Pay Day of 1st August 2025, for the payroll period of 19 June 2025 - 24 July
          2025, I got paid 199.83 instead of 219 hours
        </h5>

        <h5 className="text-lg font-medium text-gray-700">
          7. On the Pay Day of 1st October 2025, for the payroll period of 21 August 2025 - 18
          September 2025, I got paid 149.93 instead of 162.5 hours
        </h5>

        <h5 className="text-lg font-medium text-gray-700">
          8. On the Pay Day of 31st October 2025, for the payroll period of 18 September 2025 - 23
          October 2025, I got paid 45.73 instead of 119.5 hours
        </h5>
        <h5 className="text-lg font-medium text-gray-700">
          9. On the Pay Day of 1st December 2025, for the payroll period of 18 September 2025 - 23
          October 2025, I got paid 213.1 hours{' '}
          <span className=" text-green-700">Correctly Paid</span>
        </h5>

        <h5 className="text-lg font-bold text-red-600">
          {' '}
          A total of 42.78 + 0 + 18.7 + 23.37 + 14.6 + 0 + 19.17 = 118.62 hours is short paid .Out
          of 118.62, 23 hours are left over to be paid and 12.5 hours are short in 1st October
          payslip,and 73.77 hours short in 1st november payslip, so 23+12.5+73.77 = 109.27 hours
          left to be cleared
          <br />
          From above calculation, 100 hours got cleared on 1st of December, so 9.27 hours are left
          to be cleared
        </h5>
      </div>

      <DatePickerSection />

      {modelStatus && (
        <PointsCard title="Important Information!" points={points} toggleModel={toggleModel} />
      )}

      {model2Status && (
        <PointsCard
          title="Pay Slip Download"
          points={points}
          toggleModel={toggleModel2}
          payslip={true}
          getPaySlipFileURL={getPaySlipFileURL}
          naviagateWithFilename={naviagateWithFilename}
        />
      )}

      {model3Status && (
        <PointsCard
          title={'Enter a 6 digit Numeric Passcode to download'}
          isPasscode={true}
          getPaySlipFileURL={getPaySlipFileURL}
          toggleModel={toggleModel3}
          passcode={passcode}
          setPasscode={setPasscode}
        />
      )}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
