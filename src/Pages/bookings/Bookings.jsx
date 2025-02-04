import React from 'react'
import { Table, Tag } from 'antd'
import { useNavigate } from 'react-router-dom'

const data = [
  {
    key: '1',
    userName: 'Marvin McKinney',
    userImage: 'https://avatars.githubusercontent.com/u/101314?v=4',
    vendorName: 'Marvin McKinney',
    vendorImage: 'https://avatars.githubusercontent.com/u/101224?v=5',
    bookingDate: '2025-01-10',
    service: ['Musician', 'DJ','Musician', 'DJ','Musician', 'DJ','Musician', 'DJ'],
    location: '456 Party Ln, NY',
    eventDate: '2025-01-10',
    amount: '$500',
    status: 'Completed',
  },
  {
    key: '2',
    userName: 'Jane Cooper',
    userImage: 'https://avatars.githubusercontent.com/u/101314?v=4',
    vendorName: 'Marvin McKinney',
    vendorImage: 'https://avatars.githubusercontent.com/u/101214?v=6',
    bookingDate: '2025-01-10',
    service: ['Musician'],
    location: '456 Party Ln, NY',
    eventDate: '2025-01-10',
    amount: '$500',
    status: 'Canceled',
  },
  {
    key: '3',
    userName: 'Corbin Carroll',
    userImage: 'https://avatars.githubusercontent.com/u/104414?v=4',
    vendorName: 'Marvin McKinney',
    vendorImage: 'https://avatars.githubusercontent.com/u/101314?v=7',
    bookingDate: '2025-01-10',
    service: ['Musician'],
    location: '456 Party Ln, NY',
    eventDate: '2025-01-10',
    amount: '$500',
    status: 'Completed',
  },
  {
    key: '4',
    userName: 'Eleanor Pena',
    userImage: 'https://avatars.githubusercontent.com/u/104414?v=4',
    vendorName: 'Eleanor Pena',
    vendorImage: 'https://avatars.githubusercontent.com/u/101314?v=8',
    bookingDate: '2025-01-10',
    service: ['Musician'],
    location: '123 Wedding Blvd, CA',
    eventDate: '2025-01-10',
    amount: '$500',
    status: 'Pending',
  },
  {
    key: '5',
    userName: 'Robert Fox',
    userImage: 'https://avatars.githubusercontent.com/u/101114?v=4',
    vendorName: 'Kathryn Murphy',
    vendorImage: 'https://avatars.githubusercontent.com/u/101314?v=9',
    bookingDate: '2025-01-10',
    service: ['Musician'],
    location: '123 Wedding Blvd, CA',
    eventDate: '2025-01-10',
    amount: '$500',
    status: 'Pending',
  },
  {
    key: '6',
    userName: 'Jacob Jones',
    userImage: 'https://avatars.githubusercontent.com/u/102214?v=4',
    vendorName: 'Robert Fox',
    vendorImage: 'https://avatars.githubusercontent.com/u/101314?v=10',
    bookingDate: '2025-01-10',
    service: ['Musician'],
    location: '123 Wedding Blvd, CA',
    eventDate: '2025-01-10',
    amount: '$500',
    status: 'Pending',
  },
]

const columns = [
  {
    title: 'User Name',
    dataIndex: 'userName',
    key: 'userName',
    render: (text, record) => (
      <div className="flex items-center space-x-3">
        <img src={record.userImage} alt="" className="w-12 h-12 rounded-full" />
        <span className="text-gray-900 font-medium">{text}</span>
      </div>
    ),
  },
  {
    title: 'Vendor Name',
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
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
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
    render: (status) => {
      let color = ''
      if (status === 'Completed') {
        color = 'green'
      } else if (status === 'Pending') {
        color = 'blue'
      } else if (status === 'Canceled') {
        color = 'red'
      }
      return (
        <Tag
          color={color}
          className="font-bold  p-2 w-full max-w-[100px] flex items-center justify-center"
        >
          {status}
        </Tag>
      )
    },
  },
]
const Bookings = () => {
  const Navigate = useNavigate()

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
        dataSource={data}
        columns={columns}
        pagination={{ position: ['bottomCenter'], pageSize: 10 }}
      />
    </>
  )
}

export default Bookings
