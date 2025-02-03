import { Form, Input, Button, Checkbox } from 'antd'
import login from '../../assets/procure-hero-page.jpg' // Importing the login image
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Login = () => {
  const navigate = useNavigate()
  const onFinish = (values) => {
    console.log(values)
    toast.success('Login successfully!')
    navigate('/')
  }

  return (
    <div className="h-screen flex">
      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-12">
        <h1 className="text-3xl font-bold text-[#0D9276] mb-2">Procure</h1>
        <p className="text-lg text-gray-700 mb-8">Welcome to Procure!</p>

        <Form layout="vertical" onFinish={onFinish} className="w-full max-w-sm">
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please enter your username or email!',
              },
              {
                type: 'email',
                message: 'Please enter a valid email!',
              },
            ]}
          >
            <Input
              placeholder="Enter  Email"
              className="h-[42px] px-4 border-gray-300 rounded-md"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password
              placeholder="Enter password"
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
              className="w-full bg-[#0D9276]  text-white h-[42px] rounded-md"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center">
          <span className="">Forgot password?</span>{' '}
          <span className="text-gray-500 text-sm"></span>{' '}
          <Link
            to={`/forget-password`}
            className="text-teal-600 hover:underline text-sm"
          >
            Reset password
          </Link>
        </div>
      </div>

      <div className="w-1/2">
        <img src={login} alt="Login" className="w-full h-full object-cover" />
      </div>
    </div>
  )
}

export default Login
