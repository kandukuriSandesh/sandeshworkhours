import { useState } from 'react'

import './App.css'
import InfoCard from './components/Infocard'
import useModelController from './hooks/useModelController'
import { points } from './constants/points'
import PointsCard from './components/PointsCard'
import useModel2Controller from './hooks/useModel2Controller'

function App() {
 const {modelStatus,toggleModel} = useModelController()
 const {model2Status,toggleModel2} = useModel2Controller()

 console.log(modelStatus)
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
          <PointsCard title="Pay Slip Download" points={points} toggleModel={toggleModel2} />
        )}
    </div>
  )
}

export default App
