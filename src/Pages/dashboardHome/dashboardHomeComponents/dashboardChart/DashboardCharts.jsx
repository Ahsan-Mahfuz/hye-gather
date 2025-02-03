import CreditGrowthData from './CreditGrowthData'
import UserGrowthData from './UserGrowthData'

const DashboardCharts = () => {
  return (
    <div className="flex gap-4 p-4">
      <CreditGrowthData />
      <UserGrowthData />
    </div>
  )
}

export default DashboardCharts
