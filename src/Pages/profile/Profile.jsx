import { useState } from 'react'
import Password from './Password'
import { Button, Form, Input, message, Upload } from 'antd'
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import profileImage from '../../assets/hye_logo.svg'
const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [form] = Form.useForm()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: 'Thuto Makohaone',
    email: 'thutomakohaone@gmail.com',
    phone: '+27 55745 2567 125',
    area: '',
    building: '',
    postalCode: '2191',
    streetAddress: 'Alice Street',
    pdf: null,
    image: null,
  })

  const handleUpdate = () => {
    if (isEditing) {
      form
        .validateFields()
        .then((values) => {
          setFormData({ ...formData, ...values })
          message.success('Profile updated successfully!')
          setIsEditing(false)
        })
        .catch(() => {
          message.error('Please complete the form properly.')
        })
    } else {
      setIsEditing(true)
    }
  }

  const handleImageUpload = async (info) => {
    setImageLoading(true)

    const uploadedImage = info.file.originFileObj || info.file

    if (!(uploadedImage instanceof File)) {
      message.error('Invalid file type. Please upload a valid image.')
      setImageLoading(false)
      return
    }

    setTimeout(() => {
      setImageLoading(false)

      try {
        const imageURL = URL.createObjectURL(uploadedImage)

        setFormData({
          ...formData,
          image: imageURL,
        })

        message.success('Profile image updated successfully!')
      } catch (error) {
        console.error('Error creating image URL:', error)
        message.error('Error displaying image.')
      }
    }, 2000)
  }
  const navigate = useNavigate()
  return (
    <>
      <div
        className="flex items-center space-x-2 cursor-pointer mt-5"
        onClick={() => navigate(-1)}
      >
        <h1 className="text-xl font-semibold">← Pro User Manage</h1>
      </div>
      <div className=" flex flex-col items-center py-10">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
          <div className="flex flex-col items-center">
            <img
              src={formData.image ? formData.image : profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full border object-cover"
            />

            {isEditing && (
              <Upload
                accept="image/*"
                showUploadList={false}
                beforeUpload={() => false}
                onChange={handleImageUpload}
                className="mt-2"
              >
                <Button
                  icon={
                    imageLoading ? <LoadingOutlined spin /> : <UploadOutlined />
                  }
                >
                  {imageLoading ? 'Uploading...' : 'Update Image'}
                </Button>
              </Upload>
            )}

            <h2 className="mt-3 text-xl font-semibold">Jerome Smith</h2>
          </div>

          <div className="flex justify-center mt-6  ">
            <button
              className={`px-4 py-2 cursor-pointer ${
                activeTab === 'profile'
                  ? 'border-b-2 border-[#0D9276] text-[#0D9276]'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('profile')}
            >
              Edit Profile
            </button>
            <button
              className={`px-4 py-2 cursor-pointer ${
                activeTab === 'password'
                  ? 'border-b-2 border-[#0D9276] text-[#0D9276]'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('password')}
            >
              Edit Password
            </button>
          </div>

          {activeTab === 'profile' && (
            <div className="flex flex-col items-center ">
              <div className="rounded-lg  w-full max-w-3xl">
                <Form form={form} layout="vertical" initialValues={formData}>
                  <div className="flex flex-col gap-1">
                    <Form.Item label="First Name" name="first name">
                      <Input disabled={!isEditing} className="h-[40px]" />
                    </Form.Item>
                    <Form.Item label="Last Name" name="last name">
                      <Input disabled={!isEditing} className="h-[40px]" />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                      <Input disabled={!isEditing} className="h-[40px]" />
                    </Form.Item>
                  </div>

                  <div className="flex justify-center mt-6">
                    <Button
                      type="primary"
                      onClick={handleUpdate}
                      disabled={loading}
                      className="bg-blue-900 text-white rounded-md "
                    >
                      {isEditing ? 'Save' : 'Update Now'}
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          )}

          {activeTab === 'password' && <Password />}
        </div>
      </div>
    </>
  )
}

export default Profile
