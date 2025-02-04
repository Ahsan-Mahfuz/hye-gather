import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { RiEdit2Line } from 'react-icons/ri'

const ServiceCard = ({ service, onEdit, onDelete }) => {
  return (
    <div className="card glass w-80 shadow-md py-4 px-3 rounded-xl ">
      <figure>
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-48 object-cover rounded-md"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-3xl font-bold my-3 ">{service.name}</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {service.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-900 text-white text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="card-actions justify-between border-t pt-3 flex border-gray-300">
          <button
            onClick={() => onEdit(service)}
            className="btn btn-primary text-xl border-r w-full border-red-600 "
          >
            <RiEdit2Line className="text-blue-800" />
          </button>
          <button
            onClick={() => onDelete(service.id)}
            className="btn btn-secondary text-md  w-full flex justify-end "
          >
            <FaTrashAlt className="text-red-500" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard
