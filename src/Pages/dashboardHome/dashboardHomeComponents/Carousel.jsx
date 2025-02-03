import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'

const Carousel = () => {
  const metaData = {
    totalUsers: 600,
    totalProUsers: 300,
    totalEarnings: 500,
    totalProfitChangeType: 'decrease',
    totalProfitChangePercentage: -5,
  }

  const data = [
    {
      icon: (
        <img
          src="https://cdn-icons-png.flaticon.com/512/11497/11497765.png"
          alt="icon"
          className="w-10 h-10 mx-auto"
        />
      ),
      title: 'Total Users',
      value: `${metaData.totalUsers}`,
      change: `${metaData.totalProfitChangeType === 'decrease' ? '↓' : '↑'} ${
        metaData.totalProfitChangePercentage
      }%`,
    },
    {
      icon: (
        <img
          src="https://cdn-icons-png.flaticon.com/512/11497/11497765.png"
          alt="icon"
          className="w-10 h-10 mx-auto"
        />
      ),
      title: 'Total Pro Users',
      value: `${metaData.totalProUsers}`,
      change: `${metaData.totalProfitChangeType === 'decrease' ? '↓' : '↑'} ${
        metaData.totalProfitChangePercentage
      }%`,
    },
    {
      icon: (
        <img
          src="https://cdn-icons-png.flaticon.com/512/1999/1999625.png"
          alt="icon"
          className="w-10 h-10 mx-auto"
        />
      ),
      title: 'Total Earnings',
      value: `$${metaData.totalEarnings}`,
      change: `${metaData.totalProfitChangeType === 'decrease' ? '↓' : '↑'} ${
        metaData.totalProfitChangePercentage
      }%`,
    },
  ]

  return (
    <div className="w-full  mt-10 relative">
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={3}
        spaceBetween={30}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        className="mySwiper"
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-4xl mb-4 text-blue-500">{item.icon}</div>
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-2xl font-bold mt-2">{item.value}</p>
              <small
                className={
                  item.change.includes('↓') ? 'text-red-500' : 'text-green-500'
                }
              >
                {item.change}
              </small>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Carousel
