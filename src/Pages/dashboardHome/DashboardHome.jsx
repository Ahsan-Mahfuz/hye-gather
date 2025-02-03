import Carousel from './dashboardHomeComponents/Carousel'
import DashboardCharts from './dashboardHomeComponents/dashboardChart/DashboardCharts'
import ProUserRequests from '../proUserRequests/ProUserRequests'

const DashboardHome = () => {
  return (
    <div>
      <Carousel />
      <div className="mt-10 bg-white  rounded-lg card-shadow">
        <DashboardCharts />
      </div>
      {/* <div className="mt-10">
        <div className=" bg-white p-6 rounded-lg card-shadow">
          <ProUserRequests  />
        </div>
      </div> */}
    </div>
  )
}

export default DashboardHome
