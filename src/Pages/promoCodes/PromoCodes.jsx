import React, { useState } from 'react'
import { Table, Button, Modal } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import 'tailwindcss/tailwind.css'
import { useNavigate } from 'react-router-dom'

const PromoCodes = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedPromo, setSelectedPromo] = useState(null)
  const [promoData, setPromoData] = useState([
    {
      key: '1',
      promoCode: 'NEYEAR25',
      discountType: 'Percentage (%)',
      discountValue: '25% Off',
      usageLimit: '500 Uses',
      startDate: '2025-02-13',
      expirationDate: '2025-02-26',
    },
    {
      key: '2',
      promoCode: 'WELCOME10',
      discountType: 'Fixed Amount ($)',
      discountValue: '$10 Off',
      usageLimit: '200 Uses',
      startDate: '2025-02-13',
      expirationDate: '2025-02-26',
    },
    {
      key: '3',
      promoCode: 'NEYEAR25',
      discountType: 'Percentage (%)',
      discountValue: '25% Off',
      usageLimit: '500 Uses',
      startDate: '2025-02-13',
      expirationDate: '2025-02-26',
    },
  ])
  const Navigate = useNavigate()

  const columns = [
    {
      title: 'Promo Code',
      dataIndex: 'promoCode',
      key: 'promoCode',
    },
    {
      title: 'Discount Type',
      dataIndex: 'discountType',
      key: 'discountType',
    },
    {
      title: 'Discount Value',
      dataIndex: 'discountValue',
      key: 'discountValue',
    },
    {
      title: 'Usage Limit',
      dataIndex: 'usageLimit',
      key: 'usageLimit',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'Expiration Date',
      dataIndex: 'expirationDate',
      key: 'expirationDate',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <div className="flex space-x-3">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditPromo(record)}
            className="bg-blue-900 text-white"
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDeletePromo(record.key)}
            className="bg-red-500 text-white"
          />
        </div>
      ),
    },
  ]

  const handleEditPromo = (promo) => {
    setSelectedPromo(promo)
    setIsModalVisible(true)
  }

  const handleDeletePromo = (key) => {
    setPromoData(promoData.filter((promo) => promo.key !== key))
  }

  const handleCloseModal = () => {
    setIsModalVisible(false)
    setSelectedPromo(null)
  }

  const handleSavePromo = () => {
    if (selectedPromo?.key) {
      const updatedPromoData = promoData.map((promo) =>
        promo.key === selectedPromo.key ? selectedPromo : promo
      )
      setPromoData(updatedPromoData)
    } else {
      const newPromo = {
        key: Date.now().toString(),
        promoCode: selectedPromo.promoCode,
        discountType: selectedPromo.discountType,
        discountValue: selectedPromo.discountValue,
        usageLimit: selectedPromo.usageLimit,
        startDate: selectedPromo.startDate,
        expirationDate: selectedPromo.expirationDate,
      }
      setPromoData([newPromo, ...promoData])
    }
    setIsModalVisible(false)
    setSelectedPromo(null)
  }

  const handleInputChange = (e, field) => {
    setSelectedPromo({ ...selectedPromo, [field]: e.target.value })
  }

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h1
          className="text-xl font-semibold cursor-pointer mt-5"
          onClick={() => Navigate(-1)}
        >
          ← Promo Codes Management
        </h1>
        <button
          type="primary"
          className="text-white mt-5 p-2 rounded-md outline-none h-[48px] bg-blue-900"
          onClick={() => setIsModalVisible(true)}
        >
          + Add New
        </button>
      </div>
      <Table
        columns={columns}
        dataSource={promoData}
        pagination={{
          pageSize: 5,
          position: ['bottomCenter'],
        }}
      />
      <Modal
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        centered
        width={700}
      >
        <div className="space-y-4 p-5 text-black">
          <div className="text-center text-4xl font-bold ">
            {selectedPromo ? 'Edit Promo Code' : 'Add New Promo Code'}
          </div>
          <p className="m-5 text-center text-xl">
            Please fill out the details below to{' '}
            {selectedPromo ? 'edit' : 'add'} a new promo code.
          </p>
          <div>
            <label className="block text-gray-700">Promo Code</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md outline-none h-[48px]"
              value={selectedPromo?.promoCode || ''}
              onChange={(e) => handleInputChange(e, 'promoCode')}
              placeholder="Promo Code"
              required
            />
          </div>
          <section className="flex justify-between w-full gap-5">
            <div className="w-full">
              <label className="block text-gray-700">Discount Type</label>
              <select
                className="w-full p-2 border rounded-md outline-none h-[48px]"
                value={selectedPromo?.discountType || ''}
                onChange={(e) => handleInputChange(e, 'discountType')}
                required
              >
                <option value="" disabled hidden>
                  Select Discount Type
                </option>
                <option value="Percentage">Percentage (%)</option>
                <option value="Fixed Amount">Fixed Amount ($)</option>
              </select>
            </div>
            <div className="w-full">
              <label className="block text-gray-700">Discount Value</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md outline-none h-[48px]"
                value={selectedPromo?.discountValue || ''}
                onChange={(e) => handleInputChange(e, 'discountValue')}
                placeholder="Discount Value"
                required
              />
            </div>
          </section>

          <section className="flex justify-between w-full gap-5">
            <div className="w-full">
              <label className="block text-gray-700">Start Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded-md outline-none h-[48px]"
                value={selectedPromo?.startDate || ''}
                onChange={(e) => handleInputChange(e, 'startDate')}
                required
              />
            </div>
            <div className="w-full">
              <label className="block text-gray-700">Expire Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded-md outline-none h-[48px]"
                value={selectedPromo?.expirationDate || ''}
                onChange={(e) => handleInputChange(e, 'expirationDate')}
                required
              />
            </div>
          </section>

          <section>
            <div className="w-full">
              <label className="block text-gray-700">Usage Limit</label>
              <input
                className="w-full p-2 border rounded-md outline-none h-[48px]"
                value={selectedPromo?.usageLimit || ''}
                onChange={(e) => handleInputChange(e, 'usageLimit')}
                placeholder="Usage Limit"
                inputMode="numeric"
                pattern="[0-9]*"
                required
              />
            </div>
          </section>
          <div className="flex justify-center">
            <Button
              type="primary"
              onClick={() => {
                if (
                  !selectedPromo?.promoCode ||
                  !selectedPromo?.discountType ||
                  !selectedPromo?.discountValue ||
                  !selectedPromo?.startDate ||
                  !selectedPromo?.expirationDate ||
                  !selectedPromo?.usageLimit
                ) {
                  alert('Please fill up all the fields')
                  return
                }
                handleSavePromo()
              }}
              className="bg-blue-500 text-white"
            >
              {selectedPromo ? 'Save' : 'Add'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default PromoCodes
