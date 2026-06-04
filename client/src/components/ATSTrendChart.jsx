import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

function ATSTrendChart({
    analyses,
    }) {

    const chartData =
        analyses
        .slice()
        .reverse()
        .map((item, index) => ({
            analysis: index + 1,
            score: item.atsScore,
        }));

    return (
        <div className="card chart-card">

        <h2>
            ATS Trend
        </h2>

        <ResponsiveContainer
            width="100%"
            height={300}
        >

            <LineChart
            data={chartData}
            >

            <XAxis
                dataKey="analysis"
            />

            <YAxis />

            <Tooltip />

            <Line
                type="linear"
                dataKey="score"
                stroke="#00e5ff"
                strokeWidth={3}
            />

            </LineChart>

        </ResponsiveContainer>

        </div>
    );
}

export default ATSTrendChart;