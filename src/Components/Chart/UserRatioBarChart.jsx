import { ConfigProvider, Select } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "Jan", user: 80 },
  { name: "Feb", user: 70 },
  { name: "Mar", user: 50 },
  { name: "Apr", user: 60 },
  { name: "May", user: 30 },
  { name: "Jun", user: 20 },
  { name: "Jul", user: 45 },
  { name: "Aug", user: 36 },
  { name: "Sep", user: 53 },
  { name: "Oct", user: 69 },
  { name: "Nov", user: 78 },
  { name: "Dec", user: 36 },
];

const UserRatioBarChart = () => {
  // Formatter function to add 'K' suffix to Y-axis values
  const yAxisTickFormatter = (value) => `${value}K`;

  // Custom tick style
  const tickStyle = { fill: "#222222" };
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "#BDB169",
            padding: "10px",
            borderRadius: "4px",
            color: "white",
            textAlign: "center",
          }}
        >
          <p>Users</p>
          <p>{` ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white border border-secondary-color px-5 mt-5 rounded-md">
      <div className="flex justify-between  mt-4">
        <div className="text-xl font-medium whitespace-nowrap  ms-8">
          User Ratio
          <p className="text-base font-normal text-secondary-color"> <span className="   rounded-full aspect-square text-secondary-color text-[128px] ">.</span>Users</p>
        </div>

        <div>
          <ConfigProvider
            theme={{
              components: {
                Select: {
                  fontSize: 16,
                  colorBorder: "#222222",
                },
              },
            }}
          >
            <Select
              defaultValue="2024"
              style={{ width: 80 }}
              options={[
                { value: "2024", label: "2024" },
                { value: "2023", label: "2023" },
                { value: "2022", label: "2022" },
                { value: "2021", label: "2021" },
              ]}
            />
          </ConfigProvider>
        </div>
      </div>

      <div className="w-full h-64 mt-2">
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 0,
            }}
            barCategoryGap={30} // Adjust the gap between bars if necessary
          >
            <XAxis dataKey="name" tick={[]} axisLine={false} tickMargin={6} />
            <YAxis tickMargin={16} tick={[]} axisLine={false} />
            {/* Add several horizontal black lines using ReferenceLine */}
            <ReferenceLine y={20} stroke="#22222255" strokeWidth={0.5} />
            <ReferenceLine y={40} stroke="#22222255" strokeWidth={0.5} />
            <ReferenceLine y={60} stroke="#22222255" strokeWidth={0.5} />
            <ReferenceLine y={80} stroke="#22222255" strokeWidth={0.5} />
            <ReferenceLine y={100} stroke="#22222255" strokeWidth={0.5} />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "transparent" }}
            />
            <Bar
              dataKey="user"
              fill="#839F9F"
              barSize={22}
              radius={[6, 6, 0, 0]} // Rounded top corners
              activeBar={{ fill: "#BDB169" }} // Hover effect
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserRatioBarChart;
