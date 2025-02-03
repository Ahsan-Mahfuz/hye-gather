import { Form, Input, Button, Checkbox } from 'antd'
import login from '../../assets/procure-hero-page.jpg' // Importing the login image
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
const ResetPassword = () => {
  const navigate = useNavigate()
  const onFinish = (values) => {
    console.log(values)
    toast.success('Password reset successfully!')
    navigate('/login')
  }

  return (
    <div className="h-screen flex">
      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-12">
        <h1 className="text-3xl font-bold text-teal-600 mb-2">Procure</h1>
        <p className="text-lg text-gray-700 mb-8">Enter new password</p>

        <Form layout="vertical" onFinish={onFinish} className="w-full max-w-sm">
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please enter your new password!' },
              {
                min: 6,
                message: 'Password must be at least 6 characters long!',
              },
            ]}
          >
            <Input.Password
              placeholder="New password"
              className="h-[42px] px-4 border-gray-300 rounded-md"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your new password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Passwords do not match!'))
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="confirm password"
              className="h-[42px] px-4 border-gray-300 rounded-md"
            />
          </Form.Item>

          <Form.Item>
            <Checkbox className="text-gray-700">Keep me logged in</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white h-[42px] rounded-md"
            >
              Reset Password
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center">
          <Link to="/login" className="text-teal-600 hover:underline text-sm">
            Sign in instead
          </Link>
        </div>
      </div>

      <div className="w-1/2">
        <img src={login} alt="Login" className="w-full h-full object-cover" />
      </div>
    </div>
  )
}

export default ResetPassword
