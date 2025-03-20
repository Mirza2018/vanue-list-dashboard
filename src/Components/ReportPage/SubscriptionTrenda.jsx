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
  { name: "Jan", customers: 80, venues: 140 },
  { name: "Feb", customers: 70, venues: 140 },
  { name: "Mar", customers: 50, venues: 140 },
  { name: "Apr", customers: 60, venues: 140 },
  { name: "May", customers: 30, venues: 140 },
  { name: "Jun", customers: 20, venues: 140 },
  { name: "Jul", customers: 45, venues: 140 },
  { name: "Aug", customers: 36, venues: 140 },
  { name: "Sep", customers: 53, venues: 140 },
  { name: "Oct", customers: 69, venues: 140 },
  { name: "Nov", customers: 78, venues: 140 },
  { name: "Dec", customers: 36, venues: 140 },
];

const SubscriptionTrenda = () => {
  // Formatter function to add 'K' suffix to Y-axis values
  const yAxisTickFormatter = (value) => `${value}K`;

  // Custom tick style
  const tickStyle = { fill: "#222222" };
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="flex gap-2"
          style={{
            backgroundColor: "#BDB169",
            padding: "10px",
            borderRadius: "4px",
            color: "white",
            textAlign: "center",
          }}
        >
          <div>
            <p>Customers</p>
            <p>{` ${payload[0].payload.customers}`}</p>
          </div>
          <div>
            {" "}
            <p>Venues</p>
            <p>{` ${payload[0].payload.venues}`}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white border border-secondary-color px-5 mt-5 rounded-md">
      <div className="flex justify-between  mt-4">
        <div className="text-xl  whitespace-nowrap text-secondary-color ms-8 font-bold">
          Subscription and User Trends
          <div className="flex gap-4">
            <p className="text-base font-normal text-secondary-color">
              {" "}
              <span className="   rounded-full aspect-square text-secondary-color text-[128px] ">
                .
              </span>
              Users
            </p>
            <p className="text-base font-normal text-[#989898]">
              {" "}
              <span className="   rounded-full aspect-square text-[#989898] text-[128px] ">
                .
              </span>
              Active Subscriptions
            </p>
          </div>
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
              dataKey="venues"
              fill="#989898"
              barSize={12}
              radius={[6, 6, 0, 0]} // Rounded top corners
              activeBar={{ fill: "#BDB169" }} // Hover effect
            />
            <Bar
              dataKey="customers"
              fill="#075B5D"
              barSize={12}
              radius={[6, 6, 0, 0]} // Rounded top corners
              activeBar={{ fill: "#BDB169" }} // Hover effect
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SubscriptionTrenda;
