import React, { useState } from 'react'
import logo from '../../assets/hye_logo.svg'
import MonthlySubscription from './MonthlySubscription'
import YearlySubscription from './YearlySubscription'
import QuarterlySubscription from './QuarterlySubscription'
import { useNavigate } from 'react-router-dom'

const Subscription = () => {
  const [activeTab, setActiveTab] = useState('monthly')
  const Navigate = useNavigate()
  return (
    <>
      <div className="mb-6 flex justify-between items-center">
        <h1
          className="text-xl font-semibold cursor-pointer mt-5"
          onClick={() => Navigate(-1)}
        >
          ← Subscription
        </h1>
      </div>
      <div className="max-w-[600px] mx-auto bg-white shadow-lg rounded-lg p-10 mt-20">
        <div className="flex items-center justify-center gap-5 mb-5">
          <img src={logo} alt="logo" className="w-[100px]" />
          <div className="text-4xl text-blue-900 font-bold">HYE GATHER</div>
        </div>
        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2  font-semibold text-2xl ${
              activeTab === 'monthly'
                ? 'text-blue-900 border-b-2 border-blue-900'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('monthly')}
          >
            Monthly
          </button>
          {/* <button
          className={`ml-4 px-4 py-2  text-2xl font-semibold ${
            activeTab === 'quarterly'
              ? 'text-blue-900 border-b-2 border-blue-900'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('quarterly')}
        >
          Quarterly
        </button> */}
          <button
            className={`ml-4 px-4 py-2  text-2xl font-semibold ${
              activeTab === 'yearly'
                ? 'text-blue-900 border-b-2 border-blue-900'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('yearly')}
          >
            Yearly
          </button>
        </div>

        {activeTab === 'monthly' && <MonthlySubscription />}
        {/* {activeTab === 'quarterly' && <QuarterlySubscription />} */}
        {activeTab === 'yearly' && <YearlySubscription />}
      </div>
    </>
  )
}

export default Subscription
