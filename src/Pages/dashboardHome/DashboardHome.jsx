import Carousel from './dashboardHomeComponents/Carousel'
import DashboardCharts from './dashboardHomeComponents/dashboardChart/DashboardCharts'

const DashboardHome = () => {
  return (
    <div>
      <Carousel />
      <div className="mt-10 bg-white  rounded-lg card-shadow">
        <DashboardCharts />
      </div>
    </div>
  )
}

export default DashboardHome
