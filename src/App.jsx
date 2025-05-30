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
          title={'Enter 6 digit Numeric Passcode to download'}
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
