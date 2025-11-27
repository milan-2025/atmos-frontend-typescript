"use client"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Use your chartData and chartConfig defined in step 2

import { type ChartConfig } from "@/components/ui/chart"
import { useQuery } from "@tanstack/react-query"
import { getTokenFromLocalStorage } from "@/helpers/authentication"
import { getPulseChartData } from "@/http/apiHandlers"
import { toast } from "sonner"
import LoadingScreen from "./LoadingScreen"

const chartConfig = {
  pulseResponse: {
    label: "Pulse",
    color: "(var(--chart-1))", // Uses a variable for theme consistency
  },
  date: {
    label: "Date",
  },
} satisfies ChartConfig

let chartData = [
  // ... more data points for your trend
  {},
]

export function TrendLineChart() {
  const token = getTokenFromLocalStorage()

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["your-pulse-data", "chart", token],
    queryFn: getPulseChartData,
    retry: false,
  })

  if (data) {
    console.log("data after getting workloads chart", data)
    chartData = data.workloads.map((workload) => {
      let pulseResponse
      if (workload.pulseResponse == "Feeling Good") {
        pulseResponse = 1
      } else if (workload.pulseResponse == "Getting Busy") {
        pulseResponse = 0.5
      } else {
        pulseResponse = 0
      }
      return {
        date: new Date(workload.createdAt).toLocaleDateString("en-CA"),
        pulseResponse: pulseResponse,
        displayValue: workload.pulseResponse,
        _id: workload._id,
      }
    })
  }
  if (isError) {
    //@ts-ignore
    console.log("error while getting chart data--", error.info)
    toast.error("Error while getting chart data.", {
      classNames: {
        toast: "!bg-red-400 !text-gray-100 !border-0",
      },
      position: "top-right",
    })
  }
  return (
    <>
      {isLoading && <LoadingScreen />}
      <ChartContainer
        config={chartConfig}
        className="min-h-[100px] h-50 mt-4 w-full"
      >
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{ left: 4, top: 4, right: 4, bottom: 4 }}
        >
          {/* <CartesianGrid vertical={false} /> */}

          {/* Your existing X-Axis */}
          {/* <XAxis
            dataKey="date"
            tickLine={false}
            //   tickMargin={10}
            axisLine={true}
            //   tickFormatter={(value) => value.slice(0, 3)}
          /> */}

          {/* 🔑 THE CRITICAL FIX: Add the Y-Axis component */}
          {/* <YAxis
          tickLine={false}
          axisLine={false}
          //   tickMargin={10}

          // Optional: Customize how the numbers look
          tickFormatter={(value) => }
        /> */}

          <ChartTooltip content={<ChartTooltipContent />} />

          {/* The lines themselves */}
          <Line
            dataKey="pulseResponse"
            type="monotone" // Changed from 'linear' to 'monotone' for curvy line
            stroke="#00bc7d"
            //   stroke="red"
            strokeWidth={2}
            dot={true}
          />
        </LineChart>
      </ChartContainer>
    </>
  )
}
