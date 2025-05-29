import { useState } from 'react'

import './App.css'
import InfoCard from './components/Infocard'
import useModelController from './hooks/useModelController'
import PointsCard from './components/PointsCard'
import useModel2Controller from './hooks/useModel2Controller'
import useModel3Controller from './hooks/useModel3Controller'
import axios from 'axios'
import { points } from './constants/constants'
import { ToastContainer, toast } from 'react-toastify';

function App() {
 const {modelStatus,toggleModel} = useModelController()
 const {model2Status,toggleModel2} = useModel2Controller()
 const {model3Status,toggleModel3} = useModel3Controller()

 const [passcode,setPasscode] = useState();
 const [filename,setFilename] = useState('');

 const naviagateWithFilename = (filename,toggleModel) => {
   if(!filename){
    toast("Invalid Filename")
  }
  setFilename(filename)
   toggleModel()
   toggleModel3()
 }

 const getPaySlipFileURL = async () => {

  console.log({passcode,filename})
  let url;
  try{
   url = await axios.post(
  "https://sandeshworkhours.netlify.app/.netlify/functions/getPayslip",
  {
    passcode: passcode,
    filename: filename
  },
  {
    headers: {
      "Content-Type": "application/json"
    }
  }
);
  }catch(err){
    console.log(err)
  }

  
  console.log(url)
   
 }

  return (
  <div className="">
     <div className="flex flex-row justify-center items-center">
        <InfoCard toggleModel={toggleModel} content={'Important Information'} />
        <InfoCard toggleModel={toggleModel2} content={'Pay Slips'} payslip={true} />
      </div>

      {modelStatus && (
          <PointsCard title="Important Information!" points={points} toggleModel={toggleModel} />
      )}

      {model2Status && (
          <PointsCard title="Pay Slip Download" points={points} toggleModel={toggleModel2} payslip={true} getPaySlipFileURL={getPaySlipFileURL} naviagateWithFilename={naviagateWithFilename} />
      )}

      {
        model3Status && (
          <PointsCard title={"Enter 6 digit Numeric Passcode to download"} isPasscode={true} getPaySlipFileURL={getPaySlipFileURL} toggleModel={toggleModel3} passcode={passcode} setPasscode={setPasscode} />
        )
      }
      
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
  )
}

export default App
