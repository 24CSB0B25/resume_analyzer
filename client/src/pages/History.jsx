import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getHistory } from "../services/historyService";

function History() {

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {

            const data =
                await getHistory();

            setHistory(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }
    };

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div>
            <h1 className="dashboard-title">
                Analysis History
            </h1>

            {history.length === 0 ? (
                <p>No analyses found.</p>
            ) : (
                <div className="history-grid">

                    {history.map((item) => {

                        const score = item.atsScore || 0;

                        let scoreClass = "bad-score";

                        if (score >= 75)
                            scoreClass = "good-score";
                        else if (score >= 50)
                            scoreClass = "medium-score";

                        return (
                            <div
                                key={item._id}
                                className="history-card"
                            >
                                <h3>
                                    {item.candidateInfo?.name ||
                                        "Unknown Candidate"}
                                </h3>

                                <div
                                    className={`history-score ${scoreClass}`}
                                >
                                    {score}%
                                </div>

                                <div className="progress-bar">
                                    <div
                                        className="progress-fill"
                                        style={{
                                            width: `${score}%`,
                                        }}
                                    />
                                </div>

                                <div
                                    style={{
                                        marginTop: "18px",
                                    }}
                                >
                                    <p>
                                        ✓ Matched Skills:{" "}
                                        <strong>
                                            {item.matchedSkills?.length || 0}
                                        </strong>
                                    </p>

                                    <p>
                                        ✗ Missing Skills:{" "}
                                        <strong>
                                            {item.missingSkills?.length || 0}
                                        </strong>
                                    </p>

                                    <p
                                        style={{
                                            color: "#9ca3af",
                                            marginTop: "10px",
                                        }}
                                    >
                                        {new Date(
                                            item.createdAt
                                        ).toLocaleDateString()}
                                    </p>
                                </div>

                                <Link
                                    to={`/analysis/${item._id}`}
                                    style={{
                                        marginTop: "20px",
                                        color: "#00e5ff",
                                        fontWeight: "600",
                                        textDecoration: "none",
                                    }}
                                >
                                    View Details →
                                </Link>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default History;