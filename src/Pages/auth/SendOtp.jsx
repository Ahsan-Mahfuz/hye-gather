import { Form, Input } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import hye_logo from '../../assets/hye_logo.svg'
const SendOtp = () => {
  const navigate = useNavigate()

  const onFinishOtp = (values) => {
    console.log(values)
    navigate('/login')
  }

  return (
    <div className="h-screen flex items-center justify-center w-[500px] mx-auto">
      <div className=" shadow bg-white flex flex-col justify-center items-center w-full  p-12 rounded-md">
        <img src={hye_logo} alt="logo" />
        <h1 className="text-4xl font-bold  m-2 viga-text app-default-color ">
          HYE GATHER
        </h1>
        <h1 className="text-3xl font-bold  mb-2 ">Forget Password</h1>
        <p className="text-lg  m-5">Please enter your OTP</p>

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
                length={6}
                className="w-12 h-[42px] text-center border-gray-300 rounded-md"
              />
            </div>
          </Form.Item>

          <Form.Item>
            <button
              type="submit"
              className="w-full bg-blue-900 hover:bg-blue-800 text-white h-[42px] rounded-md"
            >
              Next
            </button>
          </Form.Item>
        </Form>

        <div className="text-center text-blue-800  poppins-text">
          <Link
            to="/login"
            className=" poppins-text text-blue-800  hover:underline "
          >
            Sign in instead
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SendOtp
