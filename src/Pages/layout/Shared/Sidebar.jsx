import { FaHome, FaUserTie, FaShieldAlt } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { LuGitPullRequestArrow } from 'react-icons/lu'
import { BiCategory } from 'react-icons/bi'
import { FaUserGroup } from 'react-icons/fa6'
import { MdOutlineStarRate } from 'react-icons/md'
import { TbArrowRoundaboutRight } from 'react-icons/tb'
import { CgProfile } from 'react-icons/cg'
import { CiLogout } from 'react-icons/ci'
import hye_logo from '../../../assets/hye_logo.svg'

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', link: '/', icon: <FaHome /> },
    {
      name: 'Users',
      link: '/users',
      icon: <LuGitPullRequestArrow />,
    },
    { name: 'Vendors', link: '/vendors', icon: <BiCategory /> },
    { name: 'Bookings', link: '/bookings', icon: <FaUserTie /> },
    {
      name: 'Earnings',
      link: '/earnings',
      icon: <FaUserGroup />,
    },
    {
      name: 'Service Category',
      link: '/service-category',
      icon: <MdOutlineStarRate />,
    },
    {
      name: 'Promo Codes',
      link: '/promo-codes',
      icon: <TbArrowRoundaboutRight />,
    },
    {
      name: 'Profile Settings',
      link: '/profile-settings',
      icon: <CgProfile />,
    },
    { name: 'Privacy Policy', link: '/privacy-policy', icon: <FaShieldAlt /> },
    {
      name: 'Terms & condition',
      link: '/terms-and-condition',
      icon: <FaShieldAlt />,
    },
    { name: 'Log out', link: '/login', icon: <CiLogout /> },
  ]

  return (
    <div className=" w-[250px] h-[96vh] overflow-y-scroll px-3 bg-white">
      <div className="flex flex-col justify-center items-center">
        <img src={hye_logo} alt="logo" className="mt-5 " />
        <h2 className="app-default-color font-bold text-center mb-5 text-3xl ">
          HYE GATHER
        </h2>
      </div>
      <ul>
        {menuItems.map((item, index) => (
          <NavLink
            to={item?.link}
            key={index}
            className={({ isActive }) =>
              `flex items-center  py-3 rounded-3xl my-1 pl-6  hover:bg-[#0033A0] cursor-pointer hover:text-white ${
                isActive ? 'bg-[#0033A0] text-white' : ''
              }`
            }
          >
            <span className="mr-4 text-xl">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
