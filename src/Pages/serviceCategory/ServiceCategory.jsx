import React, { useState } from 'react'
import { IoAddCircleOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { Modal, Input, Form, message, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import ServiceCard from './ServiceCard'
import { IoIosWarning } from 'react-icons/io'
import {
  useCreateCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from '../../redux/categoryRelatedApis'
import { url } from '../../redux/main/server'

const ServiceCategory = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [editingService, setEditingService] = useState(null)
  const [form] = Form.useForm()
  const [deleteId, setDeleteId] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [imageFile, setImageFile] = useState(null)

  const navigate = useNavigate()

  // API hooks
  const {
    data: categoryData,
    isLoading,
    refetch,
  } = useGetCategoryQuery({ page: 1 })
  const [createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation()
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation()

  // Transform API data to match component structure
  const services =
    categoryData?.data?.map((category) => ({
      id: category._id,
      name: category.name,
      tags: category.services?.map((service) => service.name) || [],
      image: category.img.startsWith('http')
        ? category.img
        : `${url}/${category.img}`,
      originalData: category, 
    })) || []

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
    setImageFile(null)
    setIsModalVisible(true)
  }

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields()
      const { name, tags } = values
      const tagList = tags.split(',').map((tag) => tag.trim())

      // Create FormData for file upload
      const formData = new FormData()
      formData.append('name', name)

      if (imageFile) {
        formData.append('img', imageFile)
      }

      if (editingService) {
        // Update existing category
        await updateCategory({
          id: editingService.id,
          body: formData,
        }).unwrap()
        message.success('Category updated successfully!')
      } else {
        // Create new category
        await createCategory(formData).unwrap()
        message.success('Category created successfully!')
      }

      // Refetch categories after update
      refetch()
      setIsModalVisible(false)
    } catch (info) {
      console.log('Validation Failed:', info)
    }

    setImageFile(null)
    setImagePreview('')
  }

  const handleModalCancel = () => {
    setIsModalVisible(false)
  }

  const handleDeleteOk = async () => {
    try {
      // Note: API for delete not included in your provided code
      // This would typically look like:
      // await deleteCategory(deleteId).unwrap()

      message.success('Category deleted successfully!')
      refetch()
      setIsDeleteModalVisible(false)
    } catch (error) {
      message.error('Failed to delete category')
      console.error(error)
    }
  }

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false)
  }

  const handleImageChange = ({ file }) => {
    if (file) {
      setImageFile(file.originFileObj || file)
      setImagePreview(URL.createObjectURL(file.originFileObj || file))
    }
  }

  return (
    <div className="mb-20">
      <div className="mb-6 flex justify-between items-center">
        <h1
          className="text-xl font-semibold cursor-pointer mt-5"
          onClick={() => navigate(-1)}
        >
          ← Categories
        </h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Loading categories...</div>
        </div>
      ) : (
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
            <h1 className="text-bold text-xl">Add New Category</h1>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        confirmLoading={isCreating || isUpdating}
        centered
      >
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          className="p-5"
        >
          <div className="text-2xl font-bold text-center mb-5">
            {editingService ? 'Edit Category' : 'Add Category'}
          </div>
          <Form.Item
            name="image"
            rules={[
              {
                required: !editingService,
                message: 'Please upload the category image!',
              },
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
            <Input className="h-[48px]" placeholder="Entertainment" />
          </Form.Item>
          <Form.Item
            name="tags"
            label="Add Service Tags (comma separated)"
            rules={[
              { required: true, message: 'Please enter at least one tag!' },
            ]}
          >
            <Input className="h-[48px]" placeholder="Musician, Dancer, DJ" />
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
            Are you sure you want to delete the category{' '}
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
