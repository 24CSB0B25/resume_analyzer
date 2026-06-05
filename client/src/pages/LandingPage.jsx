import { Link } from "react-router-dom";

function LandingPage() {
    return (
        <div className="container">

            <div
                className="stat-card dashboard-hero"
                style={{
                    marginTop: "50px",
                    textAlign: "center",
                }}
            >

                <div
                    style={{
                        display: "inline-block",
                        padding: "8px 16px",
                        borderRadius: "30px",
                        background: "rgba(0,255,136,0.15)",
                        border: "1px solid #00ff88",
                        color: "#00ff88",
                        marginBottom: "20px",
                        fontSize: "14px",
                        fontWeight: "600",
                    }}
                >
                    Powered by Gemini AI
                </div>

                <h1
                    className="title"
                    style={{
                        fontSize: "4rem",
                        marginBottom: "20px",
                    }}
                >
                    Resume Analyzer AI
                </h1>

                <p className="subtitle">
                    Analyze resumes using ATS scoring,
                    AI-powered insights, skill-gap
                    detection and interview preparation.
                </p>

                <div
                    style={{
                        marginTop: "20px",
                        color: "#00ff88",
                        fontWeight: "600",
                        fontSize: "14px",
                    }}
                >
                    ✓ ATS Optimization • ✓ AI Insights • ✓ Interview Preparation
                </div>

                <div
                    style={{
                        marginTop: "30px",
                        display: "flex",
                        justifyContent: "center",
                        gap: "20px",
                    }}
                >
                    <Link to="/login">
                        <button className="ai-button">
                            Login
                        </button>
                    </Link>

                    <Link to="/register">
                        <button className="ai-button">
                            Register
                        </button>
                    </Link>
                </div>

                <div
                    style={{
                        marginTop: "30px",
                        display: "flex",
                        justifyContent: "center",
                        gap: "40px",
                        flexWrap: "wrap",
                    }}
                >
                    <div>
                        <h2>100+</h2>
                        <p>Resumes Analyzed</p>
                    </div>

                    <div>
                        <h2>95%</h2>
                        <p>ATS Accuracy</p>
                    </div>

                    <div>
                        <h2>24/7</h2>
                        <p>AI Analysis</p>
                    </div>
                </div>

                <div
                    className="stat-card"
                    style={{
                        marginTop: "40px",
                        maxWidth: "500px",
                        marginInline: "auto",
                        textAlign: "left",
                    }}
                >
                    <h3>Sample Analysis</h3>

                    <p>ATS Score: 87%</p>
                    <p>Skills Match: 92%</p>
                    <p>Missing Skills: 4</p>

                    <br />

                    <p>✓ Strong Technical Skills</p>
                    <p>✓ Relevant Projects</p>
                    <p>✓ Good Resume Structure</p>

                    <br />

                    <p>
                        Recommendation:
                        Add Cloud Computing,
                        Docker and Kubernetes.
                    </p>
                </div>

            </div>

            <div
                className="stat-card"
                style={{
                    marginTop: "40px",
                    textAlign: "center",
                }}
            >
                <h2>How It Works</h2>

                <div
                    style={{
                        marginTop: "25px",
                        display: "flex",
                        justifyContent: "space-around",
                        flexWrap: "wrap",
                        gap: "20px",
                    }}
                >
                    <div>
                        <h3>1</h3>
                        <p>Upload Resume</p>
                    </div>

                    <div>
                        <h3>2</h3>
                        <p>Paste Job Description</p>
                    </div>

                    <div>
                        <h3>3</h3>
                        <p>Get ATS Score</p>
                    </div>

                    <div>
                        <h3>4</h3>
                        <p>Receive AI Insights</p>
                    </div>

                    <div>
                        <h3>5</h3>
                        <p>Download Report</p>
                    </div>
                </div>
            </div>

            <div className="stats-row">

                <div className="stat-card">
                    <h3>ATS Score</h3>
                    <p className="summary-text">
                        Measure resume compatibility
                        against job descriptions.
                    </p>
                </div>

                <div className="stat-card">
                    <h3>AI Insights</h3>
                    <p className="summary-text">
                        Strengths, weaknesses and
                        improvement suggestions.
                    </p>
                </div>

                <div className="stat-card">
                    <h3>Interview Prep</h3>
                    <p className="summary-text">
                        Generate role-specific
                        interview questions.
                    </p>
                </div>

                <div className="stat-card">
                    <h3>PDF Reports</h3>
                    <p className="summary-text">
                        Export professional analysis
                        reports instantly.
                    </p>
                </div>

            </div>

            <footer
                className="stat-card"
                style={{
                    marginTop: "50px",
                    textAlign: "center",
                    padding: "25px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                    }}
                >
                    <span
                        style={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            background: "#00ff88",
                            display: "inline-block",
                            boxShadow: "0 0 10px #00ff88",
                        }}
                    />

                    <span>Gemini AI Active</span>
                </div>

                <p style={{ marginTop: "15px" }}>
                    Built by <strong>Harsh Mahavar</strong>
                </p>

                <p>NIT Warangal</p>

                <p
                    style={{
                        marginTop: "10px",
                        opacity: 0.7,
                    }}
                >
                    Version 1.0.0 • Powered by Gemini AI
                </p>

                <p
                    style={{
                        marginTop: "10px",
                        opacity: 0.6,
                    }}
                >
                    © 2026 Resume Analyzer AI.
                    All Rights Reserved.
                </p>

                <p
                    style={{
                        marginTop: "10px",
                        opacity: 0.6,
                    }}
                >
                    Developed as an AI-powered ATS Optimization Platform
                </p>

            </footer>
        </div>
    );
}

export default LandingPage;