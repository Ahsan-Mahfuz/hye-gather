import React from 'react'
import { CiDollar } from 'react-icons/ci'
const EarningsCard = () => {
  return (
    <div className="flex items-center justify-between bg-gradient-to-r h-[300px] w-[500px] from-blue-300 to-green-200 p-6 rounded-lg shadow-lg ">
      <div className="flex items-center space-x-4">
        <div className="bg-white p-3 rounded-full">
          <div className="w-6 h-6 text-blue-500 flex items-center justify-center">
            <CiDollar className="text-5xl" />
          </div>
        </div>
        <div>
          <h3 className="text-black font-semibold text-4xl">Total Earnings</h3>
          <p className="text-3xl text-blue-800 font-bold ">$23,090</p>
        </div>
      </div>
    </div>
  )
}

export default EarningsCard
