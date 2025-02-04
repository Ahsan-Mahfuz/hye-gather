import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const EarningsGrowthChart = () => {
  const currentYear = new Date().getFullYear()

  const years = Array.from(
    { length: currentYear - 2024 + 1 },
    (_, i) => 2024 + i
  )
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const BookingGrowth = {
    labels: months,
    datasets: [
      {
        label: 'User Growth',
        data: [100, 80, 75, 78, 77, 90, 85, 80, 75, 78, 76, 79],
        backgroundColor: '#0033A0',
      },
    ],
  }

  return (
    <div className=" w-full bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Booking Growth </h2>
        <select className="p-2 bg-blue-100  rounded-md cursor-pointer outline-none text-xs">
          {years.map((year) => (
            <option key={year} value={year} className=" p-2 cursor-pointer">
              {year}
            </option>
          ))}
        </select>
      </div>
      <Bar
        data={BookingGrowth}
        options={{
          elements: {
            bar: {
              borderRadius: 10,
            },
          },
        }}
        width={800}
      />
    </div>
  )
}

export default EarningsGrowthChart
