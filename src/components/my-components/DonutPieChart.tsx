import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

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

const CustomCenterText = ({
  cx,
  cy,
  //   innerRadius,
  //   outerRadius,
  value,
  label,
}: {
  cx: string | number;
  cy: string | number;
  value: number;
  label: string;
}) => {
  return (
    <g>
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-foreground font-bold"
        style={{ fontSize: "2.5rem" }} // Larger font size for the total number
      >
        {value}
      </text>
      <text
        x={cx}
        y={typeof cy === "number" ? cy + 30 : parseInt(cy as string) + 30}
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-muted-foreground"
        style={{ fontSize: "0.875rem" }} // Smaller font size for the label
      >
        {label}
      </text>
    </g>
  );
};

const DonutPieChart = () => {
  const TEAM_DATA = [
    { name: "Manageable", value: 60, color: "#10b981" }, // Tailwind emerald-500 (Good/Manageable)
    { name: "Heavy", value: 20, color: "#facc15" }, // Tailwind yellow-400 (Manageable/Warning)
    // { name: "At Risk", value: 15, color: "#f97316" }, // Tailwind orange-500 (Heavy/At Risk)
    { name: "Overloaded", value: 5, color: "#ef4444" }, // Tailwind red-500 (Overloaded)
  ];
  const renderColorfulLegendText = (value: string, entry: any) => {
    const dataEntry = TEAM_DATA.find((d) => d.name === value);
    return (
      <span className="text-sm font-medium  text-gray-200 mr-4">
        {`${value} (${dataEntry?.value}%)`}
      </span>
    );
  };

  const TOTAL_MEMBERS = 40;
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <Pie
            data={TEAM_DATA}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={90} // Inner radius for the donut hole
            outerRadius={140} // Outer radius for the chart ring
            paddingAngle={3} // Small gap between slices
            fill="#8884d8"
            labelLine={false}
            // Apply border/stroke for better contrast in both themes
            stroke="var(--card)"
            strokeWidth={4}
          >
            {TEAM_DATA.map((entry: any, index: any) => (
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
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            height={36}
            formatter={renderColorfulLegendText}
            wrapperStyle={{ paddingTop: 20 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default DonutPieChart;
