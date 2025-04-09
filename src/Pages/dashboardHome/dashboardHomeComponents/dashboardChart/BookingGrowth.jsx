// import { Bar } from 'react-chartjs-2'
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js'

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// )

// const BookingGrowth = () => {
//   const currentYear = new Date().getFullYear()

//   const years = Array.from(
//     { length: currentYear - 2024 + 1 },
//     (_, i) => 2024 + i
//   )
//   const months = [
//     'Jan',
//     'Feb',
//     'Mar',
//     'Apr',
//     'May',
//     'Jun',
//     'July',
//     'Aug',
//     'Sep',
//     'Oct',
//     'Nov',
//     'Dec',
//   ]

//   const BookingGrowth = {
//     labels: months,
//     datasets: [
//       {
//         label: 'Booking Growth',
//         data: [100, 80, 75, 78, 77, 90, 85, 80, 75, 78, 76, 79],
//         backgroundColor: '#0033A0',
//       },
//     ],
//   }

//   return (
//     <div className="w-5/6 bg-white p-4 rounded-lg shadow">
//       <div className="flex justify-between items-center mb-2">
//         <h2 className="text-lg font-semibold">Earnings Growth</h2>
//         <select className="p-2 bg-blue-100  rounded-md cursor-pointer outline-none">
//           {years.map((year) => (
//             <option key={year} value={year} className="p-2 cursor-pointer">
//               {year}
//             </option>
//           ))}
//         </select>
//       </div>
//       <Bar
//         data={BookingGrowth}
//         options={{
//           elements: {
//             bar: {
//               borderRadius: 10,
//             },
//           },
//         }}
//         width={700}
//         height={250}
//       />
//     </div>
//   )
// }

// export default BookingGrowth

import { useState } from 'react'
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
import { useGetEarningsChartQuery } from '../../../../redux/earningsApis'

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

const BookingGrowth = () => {
  const currentYear = new Date().getFullYear()
  const [selectedYear, setSelectedYear] = useState(currentYear.toString())
  const { data: earningsData, isLoading } = useGetEarningsChartQuery({
    year_user: selectedYear,
    year_payment: selectedYear,
  })

  const years = Array.from(
    { length: currentYear - 2024 + 1 },
    (_, i) => 2024 + i
  ).reverse()

  const chartData = {
    labels: earningsData?.earningGrowth?.monthNames || [],
    datasets: [
      {
        label: 'Earnings Growth',
        data: earningsData?.earningGrowth?.data || [],
        backgroundColor: '#0033A0',
      },
    ],
  }

  const handleYearChange = (e) => {
    setSelectedYear(Number(e.target.value))
  }

  if (isLoading) {
    return (
      <div className="w-full bg-white p-4 rounded-lg shadow flex justify-center items-center h-64">
        Loading...
      </div>
    )
  }

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Earnings Growth</h2>
        <select
          className="p-2 bg-blue-100 rounded-md cursor-pointer outline-none text-xs"
          value={selectedYear}
          onChange={handleYearChange}
        >
          {years.map((year) => (
            <option key={year} value={year} className="p-2 cursor-pointer">
              {year}
            </option>
          ))}
        </select>
      </div>
      <Bar
        data={chartData}
        width={400}
        options={{
          elements: {
            bar: {
              borderRadius: 10,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function (value) {
                  return '$' + value.toLocaleString()
                },
              },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context) {
                  let label = context.dataset.label || ''
                  if (label) {
                    label += ': '
                  }
                  if (context.parsed.y !== null) {
                    label += '$' + context.parsed.y.toLocaleString()
                  }
                  return label
                },
              },
            },
          },
        }}
      />
    </div>
  )
}

export default BookingGrowth
