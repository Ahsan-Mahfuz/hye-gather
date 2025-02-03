import CreditGrowthData from './CreditGrowthData'
import BookingGrowth from './BookingGrowth'

const DashboardCharts = () => {
  return (
    <div className="flex gap-4 p-4">
      <BookingGrowth />
      <CreditGrowthData />
    </div>
  )
}

export default DashboardCharts
