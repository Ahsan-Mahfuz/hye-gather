import React, { useState } from 'react'
import { Modal, Input, Button, Space } from 'antd'
import { PlusOutlined, CloseCircleOutlined } from '@ant-design/icons'

const MonthlySubscription = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [newPrice, setNewPrice] = useState('0') 
  const [features, setFeatures] = useState([])

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const handleNext = () => {
    console.log('New Price:', newPrice)
    console.log('Features:', features)
    setIsModalVisible(false)
  }

  const handleFeatureChange = (index, event) => {
    const newFeatures = [...features]
    newFeatures[index] = event.target.value
    setFeatures(newFeatures)
  }

  const handleAddFeature = () => {
    setFeatures([...features, ''])
  }

  const handleRemoveFeature = (index) => {
    const newFeatures = features.filter((_, i) => i !== index)
    setFeatures(newFeatures)
  }

  return (
    <div>
      <h3 className="text-3xl font-semibold mt-10">Monthly Plan</h3>
      <p className="text-2xl font-bold text-blue-900">
        ${newPrice} <span className="text-gray-500 text-sm">/month</span>
      </p>

      <ul className=" space-y-2 text-gray-900 mt-5">
        {features.map((feature, index) => (
          <li key={index}>✅ {feature}</li>
        ))}
      </ul>
      <button
        onClick={showModal}
        className="w-full mt-7 bg-blue-900 text-white py-2 rounded-lg text-lg font-semibold hover:bg-blue-800 transition"
      >
        Edit
      </button>

      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
        width={650}
      >
        <div className="p-5">
          <div className="text-4xl font-bold text-center mb-3">
            Update Subscription Price
          </div>
          <p className="text-xl text-center mb-3">
            Please fill out the details below to update the subscription
            pricing.
          </p>
          <div className="mb-4">
            <label className="block font-semibold mb-2">
              Subscription Type:
            </label>
            <Input
              value="Monthly"
              disabled
              placeholder="Subscription type is fixed"
              className="w-full h-[48px]"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2">New Price ($):</label>
            <Input
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              className="w-full h-[48px]"
              placeholder="Enter new price"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              Add Features:
            </label>
            {features.map((feature, index) => (
              <div key={index} className="flex items-center mb-2">
                <Input
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e)}
                  placeholder={`Feature ${index + 1}`}
                  className="w-full mr-2 h-[48px]"
                />
                <CloseCircleOutlined
                  onClick={() => handleRemoveFeature(index)}
                  className="text-red-500 cursor-pointer"
                />
              </div>
            ))}
            <Button
              type="dashed"
              onClick={handleAddFeature}
              icon={<PlusOutlined />}
              className="w-full h-[48px] mt-2"
            >
              Add Feature
            </Button>
          </div>
          <div className="flex justify-end space-x-4">
            <Button
              onClick={handleCancel}
              style={{ backgroundColor: '#f44336', color: 'white' }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={handleNext}
              style={{ backgroundColor: '#1976D2', color: 'white' }}
            >
              Update
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default MonthlySubscription
