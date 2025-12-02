import useMediaQuery from "@/hooks/useMediaQuery";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
// import { type LegendProps } from "recharts"

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: any[];
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    // Calculate percentage based on the total sum of values (100)
    const percentage = ((data.value / 100) * 100).toFixed(0);

    return (
      <div className="p-3 bg-card border rounded-md shadow-lg text-sm">
        <p className="font-semibold text-foreground">{`${data.name} Capacity`}</p>
        <p className="text-muted-foreground">
          Percentage:{" "}
          <span className="font-mono text-foreground">{percentage}%</span>
        </p>
      </div>
    );
  }
  return null;
};

const DonutPieChart: React.FC<{
  teamData: any;
}> = ({ teamData }) => {
  // const teamData = [
  //   { name: "Manageable", value: 60, color: "#10b981" }, // Tailwind emerald-500 (Good/Manageable)
  //   { name: "Heavy", value: 20, color: "#facc15" }, // Tailwind yellow-400 (Manageable/Warning)
  //   // { name: "At Risk", value: 15, color: "#f97316" }, // Tailwind orange-500 (Heavy/At Risk)
  //   { name: "Overloaded", value: 5, color: "#ef4444" }, // Tailwind red-500 (Overloaded)
  // ];
  const renderColorfulLegendText = (value: string, entry: any) => {
    const dataEntry = teamData.find((d: { name: string }) => d.name === value);
    return (
      <span className="text-sm font-medium  text-gray-200 mr-4">
        {`${value} (${dataEntry?.value}%)`}
      </span>
    );
  };

  const isLaptop = useMediaQuery("(min-width: 1024px)");

  const legendProps: any = isLaptop
    ? {
        // Laptop/Desktop styles (Horizontal)
        layout: "horizontal",
        verticalAlign: "bottom",
        align: "center",
        wrapperStyle: { paddingTop: 10, width: "100%" },
      }
    : {
        // Mobile/Tablet styles (Vertical) - Tailwind Mobile-First
        layout: "vertical",
        verticalAlign: "top",
        align: "center", // or 'center' depending on your design
        wrapperStyle: { paddingLeft: 0, width: "auto", paddingTop: 20 }, // Adjust for vertical layout
      };
  const innerRadius = isLaptop ? 90 : 70;
  const outerRadius = isLaptop ? 140 : 120;
  // const TOTAL_MEMBERS = 40
  return (
    <>
      <ResponsiveContainer
        style={{
          padding: 0,
        }}
        width="150%"
        height="150%"
      >
        <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <Pie
            data={teamData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={innerRadius} // Inner radius for the donut hole
            outerRadius={outerRadius} // Outer radius for the chart ring
            paddingAngle={3} // Small gap between slices
            fill="#8884d8"
            labelLine={false}
            // Apply border/stroke for better contrast in both themes
            stroke="var(--card)"
            strokeWidth={4}
          >
            {teamData.map((entry: any, index: any) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                // Add slight shadow effect for depth
                style={{ filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.1))" }}
              />
            ))}
          </Pie>
          Render the total number in the center
          {/* <CustomCenterText
            cx="50%"
            cy="50%"
            value={TOTAL_MEMBERS}
            label="Total Members"
          /> */}
          {/* Tooltip styled with shadcn Card/Popover style */}
          <Tooltip content={<CustomTooltip />} />
          {/* Legend positioned at the bottom */}
          <Legend
            // layout="horizontal"
            // verticalAlign="bottom"
            // className="hidden"
            // horizAdvX={"left"}
            // horizontalAlign=
            // className=""
            // horizOriginX={-50}
            // align="center"
            // // margin={{ right: -400 }}
            // height={16}
            // width={1100}
            formatter={renderColorfulLegendText}
            {...legendProps}
            // wrapperStyle={{ paddingTop: 0 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default DonutPieChart;
