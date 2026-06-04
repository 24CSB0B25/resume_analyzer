import { useState } from "react";

import CircularATS from "../components/CircularATS";
import StatsRow from "../components/StatsRow";
import CandidateCard from "../components/CandidateCard";
import SkillTags from "../components/SkillTags";
import AIInsightCard from "../components/AIInsightCard";
import { analyzeResume } from "../services/resumeService";

function UploadResume() {
    const [resume, setResume] =
        useState(null);

    const [
        jobDescription,
        setJobDescription,
    ] = useState("");

    const [result, setResult] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!resume) {
        alert(
            "Please upload a resume"
        );
        return;
        }

        if (!jobDescription.trim()) {
            alert(
                "Please paste a Job Description"
            );
            return;
        }

        try {
        setLoading(true);

        const formData =
            new FormData();

        formData.append(
            "resume",
            resume
        );

        formData.append(
            "jobDescription",
            jobDescription
        );

        const data =
            await analyzeResume(
            formData
            );

        setResult(data);

        } catch (error) {
        console.error(error);

        alert(
            "Analysis failed"
        );
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="app">
        <div className="container">

            <div className="card">
            <h1 className="title">
                AI Resume Analyzer
            </h1>

            <p className="subtitle">
                Analyze resumes with
                ATS scoring,
                skill matching,
                and AI-powered insights.
            </p>
            </div>

            <div className="card hero-card">
            <form
                onSubmit={
                handleSubmit
                }
            >
                <label className="upload-zone">

                    <input
                        type="file"
                        accept=".pdf"
                        hidden
                        onChange={(e) =>
                        setResume(
                            e.target.files[0]
                        )
                        }
                    />

                    <div>
                        <h2>📄 Upload Resume</h2>

                        <p>
                        Drag & Drop your PDF
                        or click to browse
                        </p>

                        {resume && (
                        <div className="file-selected">
                            ✓ {resume.name}
                        </div>
                        )}
                    </div>

                </label>

                <h3>Job Description</h3>
                <textarea
                className="
                text-area
                "
                placeholder="
    Paste Job Description Here
    "
                value={
                    jobDescription
                }
                onChange={(e) =>
                    setJobDescription(
                    e.target.value
                    )
                }
                />

                <button
                type="submit"
                className="
                ai-button
                "
                >
                {loading
                    ? "Analyzing..."
                    : "Analyze Resume"}
                </button>
            </form>
            </div>

            {result && (
            <>
                <StatsRow
                    result={result}
                />
                <div className="dashboard-grid">
                    <CircularATS
                        score={result.atsScore}
                    />
                    <CandidateCard
                        candidate={result.candidateInfo}
                    />
                </div>

                <div className="dashboard-grid">
                    <SkillTags
                        title="Matched Skills"
                        skills={result.matchedSkills}
                        type="success"
                    />

                    <SkillTags
                        title="Missing Skills"
                        skills={result.missingSkills}
                        type="danger"
                    />
                </div>

                <div className="card summary-card">
                    <h3>AI Summary</h3>

                    <p className="summary-text">
                        {result.aiAnalysis?.summary}
                    </p>
                    </div>

                    <div className="insights-grid">

                    <AIInsightCard
                        title="Strengths"
                        items={
                        result.aiAnalysis?.strengths
                        }
                    />

                    <AIInsightCard
                        title="Weaknesses"
                        items={
                        result.aiAnalysis?.weaknesses
                        }
                    />

                    <AIInsightCard
                        title="Improvements"
                        items={
                        result.aiAnalysis?.improvements
                        }
                    />

                    <AIInsightCard
                        title="Interview Questions"
                        items={
                        result.aiAnalysis?.interviewQuestions
                        }
                    />

                </div>
            </>
            )}

        </div>
        </div>
    );
}

export default UploadResume;