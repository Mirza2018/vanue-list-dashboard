import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  Line,
} from "recharts";

const data = [
  {
    name: "Jan",
    serviceUser: 500,
    carer: 300,
    employee: 100,
  },
  {
    name: "Feb",
    serviceUser: 1100,
    carer: 900,
    employee: 700,
  },
  {
    name: "Mar",
    serviceUser: 700,
    carer: 500,
    employee: 300,
  },
  {
    name: "Apr",
    serviceUser: 1000,
    carer: 800,
    employee: 600,
  },
  {
    name: "May",
    serviceUser: 1400,
    carer: 1200,
    employee: 1000,
  },
  {
    name: "Jun",
    serviceUser: 1200,
    carer: 1000,
    employee: 800,
  },
  {
    name: "Jul",
    serviceUser: 800,
    carer: 600,
    employee: 400,
  },
  {
    name: "Aug",
    serviceUser: 600,
    carer: 400,
    employee: 200,
  },
  {
    name: "Sep",
    serviceUser: 1300,
    carer: 1100,
    employee: 900,
  },
  {
    name: "Oct",
    serviceUser: 1000,
    carer: 800,
    employee: 600,
  },
  {
    name: "Nov",
    serviceUser: 800,
    carer: 600,
    employee: 400,
  },
  {
    name: "Dec",
    serviceUser: 1400,
    carer: 1200,
    employee: 1000,
  },
];
const Company_Line_Chart = () => {
  return (
    <div className="w-full h-96 p-5 ">
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#00000040" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 1500]} />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="serviceUser"
            stroke="#19363D" // Blue for serviceUser
            strokeWidth={4}
            dot={{
              r: 0,
              stroke: "#19363D",
              strokeWidth: 0,
              fill: "#00000040",
            }} // Blue dots with white fill
            activeDot={{ r: 10 }} // Active dot style
          />
          <Line
            type="monotone"
            dataKey="carer"
            stroke="#326471" // Teal for service users
            strokeWidth={4}
            dot={{ r: 0, stroke: "#326471", strokeWidth: 0, fill: "#00000040" }} // Teal dots with white fill
            activeDot={{ r: 10 }}
          />
          <Line
            type="monotone"
            dataKey="employee"
            stroke="#559BAC" // Yellow for employees
            strokeWidth={4}
            dot={{ r: 0, stroke: "#559BAC", strokeWidth: 0, fill: "#00000040" }} // Yellow dots with white fill
            activeDot={{ r: 10 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Company_Line_Chart;
