import {
    useParams,
} from "react-router-dom";

import {
    useEffect,
    useState,
} from "react";

import {
    getAnalysis,
} from "../services/analysisService";

import SkillTags from "../components/SkillTags";
import {
    exportReport,
} from "../utils/exportReport";

function AnalysisDetail() {

    const { id } =
        useParams();

    const [
        analysis,
        setAnalysis,
    ] = useState(null);

    useEffect(() => {

        const loadData =
            async () => {

            const data =
                await getAnalysis(id);

            setAnalysis(data);
        };

        loadData();

    }, [id]);

    if (!analysis) {
        return <div>Loading...</div>;
    }

    return (
        <div>

            <h1 className="dashboard-title">
                Analysis Report
            </h1>

            <button
                className="download-btn"
                onClick={() =>
                    exportReport(
                        analysis
                    )
                }
            >
                Download PDF
            </button>

            <div className="dashboard-grid">

                <div className="card">

                    <h3>ATS Score</h3>

                    <div className="big-stat">
                        {analysis.atsScore}%
                    </div>

                </div>

                <div className="card">

                    <h3>Candidate</h3>

                    <p>
                        {
                            analysis
                            .candidateInfo
                            ?.name
                        }
                    </p>

                    <p>
                        {
                            analysis
                            .candidateInfo
                            ?.email
                        }
                    </p>

                </div>

            </div>

            <div className="card summary-card">

                <h2>
                    AI Summary
                </h2>

                <p className="summary-text">

                    {
                        analysis
                        .aiAnalysis
                        ?.summary
                    }

                </p>

            </div>

            <div className="dashboard-grid">

                <SkillTags
                    title="Matched Skills"
                    skills={
                        analysis.matchedSkills
                    }
                    type="success"
                />

                <SkillTags
                    title="Missing Skills"
                    skills={
                        analysis.missingSkills
                    }
                    type="danger"
                />

            </div>

            <div className="insights-grid">

                <div className="card">
                    <h2>Strengths</h2>

                    <ul className="insight-list">
                        {
                        analysis.aiAnalysis
                        ?.strengths?.map(
                            (item,index)=>(
                            <li key={index}>
                                {item}
                            </li>
                            )
                        )
                        }
                    </ul>
                </div>

                <div className="card">
                    <h2>Weaknesses</h2>

                    <ul className="insight-list">
                        {
                        analysis.aiAnalysis
                        ?.weaknesses?.map(
                            (item,index)=>(
                            <li key={index}>
                                {item}
                            </li>
                            )
                        )
                        }
                    </ul>
                </div>

                <div className="card">
                    <h2>Improvements</h2>

                    <ul className="insight-list">
                        {
                        analysis.aiAnalysis
                        ?.improvements?.map(
                            (item,index)=>(
                            <li key={index}>
                                {item}
                            </li>
                            )
                        )
                        }
                    </ul>
                </div>

                <div className="card">
                    <h2>Interview Questions</h2>

                    <ul className="insight-list">
                        {
                        analysis.aiAnalysis
                        ?.interviewQuestions?.map(
                            (item,index)=>(
                            <li key={index}>
                                {item}
                            </li>
                            )
                        )
                        }
                    </ul>
                </div>

            </div>

        </div>
    );
}

export default AnalysisDetail;