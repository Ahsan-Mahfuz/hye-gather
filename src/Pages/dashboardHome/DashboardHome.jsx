import Carousel from './dashboardHomeComponents/Carousel'
import DashboardCharts from './dashboardHomeComponents/dashboardChart/DashboardCharts'
import Users from '../users/Users'

const DashboardHome = () => {
  return (
    <div>
      <Carousel />
      <div className="mt-10 bg-white  rounded-lg card-shadow">
        <DashboardCharts />
      </div>
      <Users dashboardHome={true} />
    </div>
  )
}

export default DashboardHome
