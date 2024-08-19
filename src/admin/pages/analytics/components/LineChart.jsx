import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  {
    name: "M",
    max: 1000,
    customers: 400,
    amt: 2400,
  },
  {
    name: "T",
    max: 1000,
    customers: 398,
    amt: 2210,
  },
  {
    name: "W",
    max: 1000,
    customers: 80,
    amt: 2290,
  },
  {
    name: "T",
    max: 1000,
    customers: 908,
    amt: 2000,
  },
  {
    name: "F",
    max: 1000,
    customers: 340,
    amt: 2181,
  },
  {
    name: "S",
    max: 1000,
    customers: 940,
    amt: 2500,
  },
  {
    name: "S",
    max: 1000,
    customers: 800,
    amt: 2100,
  },
];

const RenderLineChart = () => (
  <LineChart width={550} height={230} data={data}>
    <CartesianGrid strokeDasharray="2" />
    <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
    <YAxis domain={[0, 1000]} />
    <Tooltip />
    <Line
      type="monotone"
      dataKey="customers"
      stroke="#1F2937"
      activeDot={{ r: 3 }}
    />
  </LineChart>
);

export default RenderLineChart;
