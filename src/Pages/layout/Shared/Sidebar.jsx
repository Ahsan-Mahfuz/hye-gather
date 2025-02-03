import {
  FaHome,
  FaStore,
  FaUsers,
  FaUserTie,
  FaTags,
  FaShieldAlt,
} from 'react-icons/fa'
import { HiArrowTrendingUp } from 'react-icons/hi2'
import { RiSettingsFill } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'
import { LuGitPullRequestArrow } from 'react-icons/lu'
import { BiCategory } from 'react-icons/bi'
import { FaUserGroup } from 'react-icons/fa6'
import { MdOutlineStarRate } from 'react-icons/md'
import { MdPermContactCalendar } from 'react-icons/md'
import { TbArrowRoundaboutRight } from 'react-icons/tb'
import { CgProfile } from 'react-icons/cg'
import { CiLogout } from 'react-icons/ci'

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', link: '/', icon: <FaHome /> },
    {
      name: 'Job request',
      link: '/job-request',
      icon: <LuGitPullRequestArrow />,
    },
    { name: 'Category Manage', link: '/category-manage', icon: <BiCategory /> },
    { name: 'Pro user Manage', link: '/pro-user-manage', icon: <FaUserTie /> },
    {
      name: 'User Management',
      link: '/user-management',
      icon: <FaUserGroup />,
    },
    {
      name: 'Rating approve',
      link: '/rating-approve',
      icon: <MdOutlineStarRate />,
    },
    { name: 'About Us', link: '/about-us', icon: <TbArrowRoundaboutRight /> },
    {
      name: 'Contact Us',
      link: '/contact-us',
      icon: <MdPermContactCalendar />,
    },
    { name: 'Privacy Policy', link: '/privacy-policy', icon: <FaShieldAlt /> },
    {
      name: 'Terms & condition',
      link: '/terms-and-condition',
      icon: <FaShieldAlt />,
    },
    { name: 'Profile', link: '/profile', icon: <CgProfile /> },
    { name: 'Log out', link: '/login', icon: <CiLogout /> },
  ]

  return (
    <div className="bg-[#0d9276] w-[250px] h-[96vh] overflow-y-scroll px-3">
      <h2 className="text-white text-center py-6 text-3xl font-semibold">
        Procure
      </h2>
      <ul className="text-white">
        {menuItems.map((item, index) => (
          <NavLink
            to={item?.link}
            key={index}
            className="flex items-center py-3 rounded-3xl my-1 pl-6 hover:bg-[#014F56] cursor-pointer hover:text-white"
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
