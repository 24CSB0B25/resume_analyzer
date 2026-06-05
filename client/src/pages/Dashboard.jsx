import {useEffect,useState,} from "react";

import {getDashboardStats,} from "../services/dashboardService";

import ATSTrendChart from "../components/ATSTrendChart";

import { useAuth } from "../context/AuthContext";

function Dashboard() {

    const [
        stats,
        setStats,
    ] = useState(null);

    const { user } = useAuth();

    useEffect(() => {

        const loadData =
        async () => {

            const data =
            await getDashboardStats();

            setStats(data);
        };

        loadData();

    }, []);

    if (!stats) {
        return (
            <div
                style={{
                    height: "70vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "15px",
                }}
            >
                <h1>
                    Resume Analyzer AI
                </h1>

                <p>
                    Loading Dashboard...
                </p>
            </div>
        );
    }

    return (
    <div>

        <h1 className="dashboard-title">
            Dashboard
        </h1>

        <div className="card dashboard-hero">

            <h2>
                Welcome Back, {user?.name} 👋
            </h2>

            <p>
                Track ATS performance,
                resume improvements,
                and AI-powered insights.
            </p>

        </div>

        <div
            style={{
                marginTop: "20px",
                display: "flex",
                gap: "25px",
                flexWrap: "wrap",
            }}
        >
            <div>
                <strong>
                    {stats.total}
                </strong>
                <p>Analyses</p>
            </div>

            <div>
                <strong>
                    {stats.highestATS}%
                </strong>
                <p>Best ATS</p>
            </div>

            <div>
                <strong>
                    {stats.averageATS}%
                </strong>
                <p>Average ATS</p>
            </div>
        </div>

        {
            stats.total === 0 && (
                <div
                    className="stat-card"
                    style={{
                        textAlign: "center",
                        marginBottom: "25px",
                    }}
                >
                    <h3>
                        No Resume Analyses Yet
                    </h3>

                    <p>
                        Upload your first resume
                        to start receiving ATS
                        scores and AI insights.
                    </p>
                </div>
            )
        }

        <ATSTrendChart
            analyses={stats.analyses}
        />
        
        <div className="stats-row">

            <div className="stat-card">
            <h3>Total Analyses</h3>
            <div className="big-stat">
                {stats.total}
            </div>
            </div>

            <div className="stat-card">
            <h3>Average ATS</h3>
            <div className="big-stat">
                {stats.averageATS}%
            </div>
            </div>

            <div className="stat-card">
            <h3>Best ATS</h3>
            <div className="big-stat">
                {stats.highestATS}%
            </div>
            </div>

            <div className="stat-card">
            <h3>Latest ATS</h3>
            <div className="big-stat">
                {stats.latestATS}%
            </div>
            </div>

        </div>

        
        <ATSTrendChart
            analyses={stats.analyses}
        />

        <div className="card recent-card">

            <h2>
            Recent Analyses
            </h2>

            {stats.analyses
                .slice(0, 5)
                .map(item => (

                <div
                    key={item._id}
                    className="recent-analysis-card"
                >

                    <div>

                        <h4>
                        {
                            item
                            .candidateInfo
                            ?.name
                        }
                        </h4>

                        <p>
                        {
                            new Date(
                            item.createdAt
                            ).toLocaleString()
                        }
                        </p>

                    </div>

                    <div
                        className={
                        item.atsScore >= 70
                            ? "score-good"
                            : item.atsScore >= 40
                            ? "score-medium"
                            : "score-bad"
                        }
                    >
                        {item.atsScore}%
                    </div>

                </div>

            ))}

        </div>

        </div>
    );
}

export default Dashboard;