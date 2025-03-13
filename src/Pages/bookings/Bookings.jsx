import React from 'react'
import { Table, Tag } from 'antd'
import { useNavigate } from 'react-router-dom'
import Loader from '../loading/ReactLoader'
import { useGetAllBookingsQuery } from '../../redux/bookingsApis'
import { url } from '../../redux/main/server'

const Bookings = () => {
  const Navigate = useNavigate()
  const { data: bookingsData, isLoading, isError } = useGetAllBookingsQuery()

  if (isError) {
    return (
      <div className="h-screen flex items-center justify-center w-[500px] mx-auto">
        <div className="shadow bg-white flex flex-col justify-center items-center w-full p-12 rounded-md">
          <h1 className="text-4xl font-bold m-2 viga-text app-default-color">
            Something went wrong
          </h1>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return <Loader />
  }

  const transformedData =
    bookingsData?.data?.map((booking) => {
      const serviceNames = booking.services.map((service) => service.name)

      const user = booking.user[0]
      const category = booking.category[0]

      const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toISOString().split('T')[0]
      }

      const getStatusColor = (status) => {
        switch (status) {
          case 'accepted':
            return 'green'
          case 'pending':
            return 'blue'
          case 'canceled':
            return 'red'
          default:
            return 'blue'
        }
      }

      const formatPrice = (price) => {
        return `$${price.toFixed(2)}`
      }

      return {
        key: booking._id,
        userName: user.name,
        userImage: user.img
          ? `${url}/${user.img}`
          : 'https://placehold.co/400x400',
        vendorName: category.name,
        vendorImage: category.img
          ? `${url}/${category.img}`
          : 'https://placehold.co/400x400',
        bookingDate: formatDate(booking.date),
        service: serviceNames,
        location: 'N/A',
        eventDate: formatDate(booking.date),
        time: new Date(booking.time).toLocaleTimeString(),
        amount: formatPrice(booking.price),
        status: booking.status,
        statusColor: getStatusColor(booking.status),
        isPaid: booking.is_paid,
        paidToVendor: booking.paid_to_vendor,
        guests: booking.number_of_guests,
        duration: booking.duration,
        additionalServices: booking.additional_services,
      }
    }) || []

  const columns = [
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
      render: (text, record) => (
        <div className="flex items-center space-x-3">
          <img
            src={record.userImage}
            alt=""
            className="w-12 h-12 rounded-full"
          />
          <span className="text-gray-900 font-medium">{text}</span>
        </div>
      ),
    },
    {
      title: 'Category Name',
      dataIndex: 'vendorName',
      key: 'vendorName',
      render: (text, record) => (
        <div className="flex items-center space-x-3">
          <img
            src={record.vendorImage}
            alt=""
            className="w-12 h-12 rounded-full"
          />
          <span className="text-gray-900 font-medium">{text}</span>
        </div>
      ),
    },
    {
      title: 'Booking Date',
      dataIndex: 'bookingDate',
      key: 'bookingDate',
    },
    {
      title: 'Service',
      dataIndex: 'service',
      key: 'service',
      render: (service) => (
        <div className="flex flex-wrap gap-2 w-[300px]">
          {service.slice(0, 2).map((category, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-green-100 rounded-md text-green-800"
            >
              {category}
            </span>
          ))}
          {service.length > 2 && (
            <span className="px-2 py-2 flex items-center justify-center bg-green-100 rounded-md text-green-800">
              +{service.length - 2}
            </span>
          )}
        </div>
      ),
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Event Date',
      dataIndex: 'eventDate',
      key: 'eventDate',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => {
        // Capitalize first letter of status
        const displayStatus = status.charAt(0).toUpperCase() + status.slice(1)

        return (
          <Tag
            color={record.statusColor}
            className="font-bold p-2 w-full max-w-[100px] flex items-center justify-center"
          >
            {displayStatus}
          </Tag>
        )
      },
    },
    {
      title: 'Payment',
      dataIndex: 'isPaid',
      key: 'isPaid',
      render: (isPaid) => {
        const status = isPaid ? 'Paid' : 'Unpaid'
        const color = isPaid ? 'green' : 'red'

        return (
          <Tag
            color={color}
            className="font-bold p-2 w-full max-w-[100px] flex items-center justify-center"
          >
            {status}
          </Tag>
        )
      },
    },
  ]

  return (
    <>
      <h1
        className="text-xl font-semibold cursor-pointer mt-5 mb-5"
        onClick={() => Navigate(-1)}
      >
        ← Booking
      </h1>

      <Table
        className="mb-20"
        dataSource={transformedData}
        columns={columns}
        loading={isLoading}
        pagination={{ position: ['bottomCenter'], pageSize: 10 }}
      />
    </>
  )
}

export default Bookings
