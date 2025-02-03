import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend)

const CreditGrowthData = () => {
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

  const creditGrowthData = {
    labels: months,
    datasets: [
      {
        label: 'Credit Growth',
        data: [20, 90, 40, 100, 60, 85, 70, 60, 50, 70, 80, 90],
        borderColor: '#0d9276',
        backgroundColor: '#0d9276',
        fill: true,
        tension: 0.4,
      },
    ],
  }

  return (
    <div className="w-1/2 bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Credit Growth</h2>
        <select className="p-2 bg-gray-100 cursor-pointer outline-none">
          {years.map((year) => (
            <option key={year} value={year} className="p-2 cursor-pointer">
              {year}
            </option>
          ))}
        </select>
      </div>
      <Line data={creditGrowthData} />
    </div>
  )
}

export default CreditGrowthData
