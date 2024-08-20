import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Unisex", value: 400 },
  { name: "Men", value: 200 },
  { name: "Women", value: 300 },
];

const COLORS = ["#1F2937", "#0680FA", "#FC3CA4"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const RenderPieChart = () => (
  <PieChart width={180} height={200}>
    <Pie
      data={data}
      cx="50%"
      cy="50%"
      labelLine={false}
      label={renderCustomizedLabel}
      outerRadius={80}
      fill="#8884d8"
      dataKey="value"
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
  </PieChart>
);

export default RenderPieChart;
