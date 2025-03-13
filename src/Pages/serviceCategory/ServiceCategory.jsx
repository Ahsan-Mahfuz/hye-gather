import React, { useState } from 'react'
import { IoAddCircleOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { Modal, Input, Form, message, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import ServiceCard from './ServiceCard'
import { IoIosWarning } from 'react-icons/io'

const servicesData = [
  {
    id: 1,
    name: 'Musician',
    tags: ['Mediterranean', 'Mexican', 'Asian'],
    image:
      'https://images.unsplash.com/photo-1613323593608-abc90fec84ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    name: 'Dancer',
    tags: ['Mediterranean', 'Mexican', 'Asian'],
    image:
      'https://images.unsplash.com/photo-1613323593608-abc90fec84ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
]

const ServiceCategory = () => {
  const [services, setServices] = useState(servicesData)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [editingService, setEditingService] = useState(null)
  const [form] = Form.useForm()
  const [deleteId, setDeleteId] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [imageFile, setImageFile] = useState(null)

  const Navigate = useNavigate()

  const handleEdit = (service) => {
    setEditingService(service)
    form.setFieldsValue({
      name: service.name,
      tags: service.tags.join(', '),
    })
    setImagePreview(service.image)
    setIsModalVisible(true)
  }

  const handleDelete = (id) => {
    setDeleteId(id)
    setIsDeleteModalVisible(true)
  }

  const handleAddNew = () => {
    setEditingService(null)
    form.resetFields()
    setImagePreview('')
    setIsModalVisible(true)
  }

  const handleModalOk = () => {
    form
      .validateFields()
      .then((values) => {
        const { name, tags } = values
        const tagList = tags.split(',').map((tag) => tag.trim())

        if (editingService) {
          setServices(
            services.map((service) =>
              service.id === editingService.id
                ? {
                    ...service,
                    name,
                    tags: tagList,
                    image: imageFile
                      ? URL.createObjectURL(imageFile)
                      : editingService.image,
                  }
                : service
            )
          )
          message.success('Service updated successfully!')
        } else {
          const newService = {
            id: services.length + 1,
            name,
            tags: tagList,
            image: imageFile ? URL.createObjectURL(imageFile) : '',
          }
          setServices([...services, newService])
          message.success('Service added successfully!')
        }
        setIsModalVisible(false)
      })
      .catch((info) => {
        console.log('Validate Failed:', info)
      })
    setImageFile(null)
    setImagePreview('')
  }

  const handleModalCancel = () => {
    setIsModalVisible(false)
  }

  const handleDeleteOk = () => {
    setServices(services.filter((service) => service.id !== deleteId))
    message.success('Service deleted successfully!')
    setIsDeleteModalVisible(false)
  }

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false)
  }

  const handleImageChange = (info) => {
    if (info.file) {
      setImageFile(info.file)
      setImagePreview(URL.createObjectURL(info.file))
    }
  }

  return (
    <div className="mb-20">
      <div className="mb-6 flex justify-between items-center">
        <h1
          className="text-xl font-semibold cursor-pointer mt-5"
          onClick={() => Navigate(-1)}
        >
          ← Services
        </h1>
      </div>

      <div className="flex items-center flex-wrap gap-x-20 gap-y-5">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}

        <div className="card bg-gray-200 w-[320px] h-[350px] p-6 rounded-lg flex flex-col justify-center items-center">
          <button
            onClick={handleAddNew}
            className="text-blue-900 text-xl px-4 py-2 rounded-md flex items-center gap-2"
          >
            <IoAddCircleOutline className="text-[100px]" />
          </button>
          <h1 className="text-bold text-xl">Add New Service Category</h1>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        centered
      >
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          className="p-5"
        >
          <div className="text-2xl font-bold text-center mb-5">
            {editingService ? 'Edit Service Category' : 'Add Service Category'}
          </div>
          <Form.Item
            name="image"
            rules={[
              { required: true, message: 'Please upload the service image!' },
            ]}
          >
            <Upload
              name="image"
              listType="picture-card"
              showUploadList={false}
              onChange={handleImageChange}
              beforeUpload={() => false}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="preview"
                  style={{ width: '100%' }}
                />
              ) : (
                <div>
                  <UploadOutlined />
                  <div>Upload</div>
                </div>  
              )}
            </Upload>
          </Form.Item>


          <Form.Item
            name="name"
            label="Category Name"
            rules={[
              { required: true, message: 'Please enter the category name!' },
            ]}
          >
            <Input className="h-[48px]" placeholder="Beverages" />
          </Form.Item>
          <Form.Item
            name="tags"
            label="Add Service Tags (comma separated)"
            rules={[
              { required: true, message: 'Please enter at least one tag!' },
            ]}
          >
            <Input
              className="h-[48px]"
              placeholder="Mediterranean, Mexican, Asian"
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        visible={isDeleteModalVisible}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
        okText="Yes"
        cancelText="No"
        centered
      >
        <div className="text-lg bg-no-repeat bg-left-top bg-contain h-[200px] object-contain">
          <div className="flex justify-center items-end">
            <IoIosWarning className="text-7xl text-red-700" />
          </div>
          <div className="font-bold text-5xl text-center">Warning</div>
          <div className="p-5 text-center text-red-700">
            Are you sure you want to delete the service {' '}
            <strong>
              {services.find((service) => service.id === deleteId)?.name}
            </strong>
            ?
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ServiceCategory
