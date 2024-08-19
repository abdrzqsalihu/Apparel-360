import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const data = [
  { name: "M", uv: 400, pv: 2400, amt: 2400 },
  { name: "T", uv: 300, pv: 2210, amt: 2290 },
  { name: "W", uv: 200, pv: 2290, amt: 2000 },
  { name: "T", uv: 278, pv: 2000, amt: 2181 },
  { name: "F", uv: 189, pv: 2181, amt: 2500 },
  { name: "S", uv: 239, pv: 2500, amt: 2100 },
  { name: "S", uv: 349, pv: 2100, amt: 2300 },
];

const RenderBarChart = () => (
  <BarChart width={500} height={240} data={data}>
    <XAxis dataKey="name" stroke="#8884d8" />
    <YAxis />
    <Tooltip wrapperStyle={{ width: 100, backgroundColor: "#ccc" }} />

    <CartesianGrid stroke="#ccc" strokeDasharray="1" />
    <Bar dataKey="uv" fill="#1F2937" barSize={20} />
  </BarChart>
);

export default RenderBarChart;
