import { Form, Input, Checkbox } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import hye_logo from '../../assets/hye_logo.svg'

const Login = () => {
  const navigate = useNavigate()
  const onFinish = (values) => {
    console.log(values)
    toast.success('Login successfully!')
    navigate('/')
  }

  return (
    <div className="h-screen  flex flex-col justify-center items-center p-12 ">
      <div className="bg-white flex flex-col justify-center items-center p-12">
        <img src={hye_logo} alt="logo" />
        <h1 className="text-4xl font-bold  m-2 viga-text app-default-color ">
          HYE GATHER
        </h1>
        <p className="text-3xl  font-semibold ">Login to account!</p>
        <p className="m-5">Please enter your email and password to continue</p>

        <Form
          layout="vertical"
          onFinish={onFinish}
          className="w-full max-w-md"
          requiredMark={false}
        >
          <Form.Item
            name="email"
            label="Email Address"
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
              className="poppins-text h-[42px]  px-4 border-gray-300 rounded-md"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password
              placeholder="Enter password"
              className=" poppins-text h-[42px] px-4 border-gray-300 rounded-md"
            />
          </Form.Item>

          <Form.Item>
            <Checkbox className="text-gray-700 poppins-text">
              Remember Password
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <button
              type="submit"
              className="w-full cursor-pointer poppins-text bg-blue-900 hover:bg-blue-800 text-white h-[42px] rounded-md flex items-center justify-center"
            >
              Log in
            </button>
          </Form.Item>
        </Form>

        <div className="text-center">
          <span className="">Forgot password?</span>{' '}
          <span className="text-gray-500 text-sm"></span>{' '}
          <Link
            to={`/forget-password`}
            className="text-[#0033A0] hover:underline  "
          >
            Forget password
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
