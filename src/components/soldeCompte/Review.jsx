import React from 'react'
import Chart from "react-apexcharts"

const Review = () => {

    const data = {
        series:[
            {
                name:"Review",
                data: [5, 8, 9, 11, 5, 4, 2]
            }
        ],
        options: {
            chart: {
                type: "area",
                height: "auto"
            },
            dropShadow: {
                enabled: false,
                enabledOnSeries: undefined,
                top: 0,
                left: 3,
                blur: 3,
                color: "red",
                opacity: 0.35
            },
            fill: {
                color: ['#fff'],
                type: "gradient"
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: "smooth",
                colors: ["silver"]
            },
            tooltip: {
                x: {
                    format: "dd/MM/yy HH:mm"
                }
            },
            grid: {
                show: true
            },
            xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
            }
        }
    }

  return (
    <div className='CustomReview'>
        <Chart series={data.series} options={data.options} />
    </div>
  )
}

export default Review