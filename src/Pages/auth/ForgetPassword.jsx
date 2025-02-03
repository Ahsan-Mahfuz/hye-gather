import { Form, Input, Button } from 'antd'
import login from '../../assets/procure-hero-page.jpg' // Importing the login image
import { Link, useNavigate } from 'react-router-dom'
const ForgetPassword = () => {
  const navigate = useNavigate()
  const onFinish = (values) => {
    console.log(values)
  }
  const onFinishOtp = (values) => {
    console.log(values)
    navigate('/reset-password')
  }

  return (
    <div className="h-screen flex">
      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-12">
        <h1 className="text-3xl font-bold text-teal-600 mb-2">Procure</h1>
        <p className="text-lg text-gray-700 mb-8">Reset password</p>

        <Form layout="vertical" onFinish={onFinish} className="w-full max-w-sm">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input
              placeholder="Enter email"
              className="h-[42px] px-4 border-gray-300 rounded-md"
            />
          </Form.Item>

          <Form.Item>
            <Button
              disabled={localStorage.getItem('email')}
              type="primary"
              htmlType="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white h-[42px] rounded-md"
            >
              Send OTP
            </Button>
          </Form.Item>
        </Form>

        <Form
          layout="vertical"
          onFinish={onFinishOtp}
          className="w-full max-w-sm"
        >
          <Form.Item
            name="otp"
            rules={[{ required: true, message: 'Please enter the OTP!' }]}
          >
            <div className="flex gap-2">
              <Input.OTP
                length={4}
                className="w-12 h-[42px] text-center border-gray-300 rounded-md"
              />
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white h-[42px] rounded-md"
            >
              Next
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

export default ForgetPassword
