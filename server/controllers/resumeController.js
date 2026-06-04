const pdfParse = require("pdf-parse");
const calculateATS = require("../utils/atsScore");
const extractResumeInfo = require("../utils/extractResumeInfo");
const analyzeWithGemini = require("../utils/geminiAnalyzer");
const Analysis =require("../models/Analysis");

const analyzeResume = async (req, res) => {
    try {

        const pdfData = await pdfParse(
            req.file.buffer
        );

        const resumeText = pdfData.text;

        const jobDescription =
            req.body.jobDescription || "";

        if (!jobDescription.trim()) {
            return res.status(400).json({
                message: "Job description required",
            });
        }

        const atsResult = calculateATS(
        resumeText,
        jobDescription
        );

        const candidateInfo =
            extractResumeInfo(resumeText);

        let aiAnalysis = {
            summary:
                "ATS analysis completed successfully. AI insights could not be generated at this time.",

            strengths: [],

            weaknesses: [],

            improvements: [],

            interviewQuestions: [],
        };

        try {
            const aiResponse =
                await analyzeWithGemini(
                    resumeText,
                    jobDescription
                );

            console.log("RAW GEMINI RESPONSE:");
            console.log(aiResponse);

            const cleaned =
                aiResponse
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim();

            const start =
                cleaned.indexOf("{");

            const end =
                cleaned.lastIndexOf("}");

            if (start !== -1 && end !== -1) {

                const jsonString =
                    cleaned.substring(
                        start,
                        end + 1
                    );

                aiAnalysis =
                    JSON.parse(jsonString);

                console.log(
                    "PARSED AI ANALYSIS:"
                );

                console.dir(
                    aiAnalysis,
                    { depth: null }
                );
            }
        } catch (err) {

            console.error(
                "Gemini Error:",
                err.message
            );

            aiAnalysis = {

                summary:
                    `Resume matches ${atsResult.score}% of the job requirements. ${atsResult.matchedSkills.length} required skills were detected and ${atsResult.missingSkills.length} important skills are currently missing.`,

                strengths: [

                    ...(candidateInfo.github === "Present"
                        ? ["GitHub profile included."]
                        : []),

                    ...(candidateInfo.linkedin === "Present"
                        ? ["LinkedIn profile included."]
                        : []),

                    ...(atsResult.matchedSkills.length > 0
                        ? [
                            `Relevant skills detected: ${atsResult.matchedSkills.join(", ")}`
                        ]
                        : []),

                    "Resume contact information is present.",

                ],

                weaknesses: [

                    ...atsResult.missingSkills.map(
                        skill =>
                            `Missing required skill: ${skill}`
                    ),

                ],

                improvements: [

                    ...atsResult.missingSkills.map(
                        skill =>
                            `Gain practical experience with ${skill}.`
                    ),

                    "Add more projects aligned with the target job description.",

                    "Quantify achievements with measurable results where possible.",

                ],

                interviewQuestions: [

                    "Explain your strongest technical project.",

                    "Which technologies are you most comfortable using and why?",

                    "How would you learn a missing skill required for this role?",

                    "Describe a difficult technical problem you solved.",

                    "How do you approach debugging and testing?",

                ],
            };
        }

        console.log("REQ USER =", req.user);
        const savedAnalysis = await Analysis.create({

            atsScore: atsResult.score,

            matchedSkills: atsResult.matchedSkills,

            missingSkills: atsResult.missingSkills,

            candidateInfo,

            aiAnalysis,
        });

        console.log("SAVED ANALYSIS:", savedAnalysis);

        res.json({
            atsScore: atsResult.score,
            matchedSkills: atsResult.matchedSkills,
            missingSkills: atsResult.missingSkills,
            candidateInfo,
            aiAnalysis,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
        message: error.message,
        });
    }
};


const getAnalysisHistory =
    async (req, res) => {
        try {
        const analyses = await Analysis.find()
        .sort({ createdAt: -1 });

        res.json(analyses);
        } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


const getAnalysisById =
    async (req, res) => {

    try {

        const analysis =
            await Analysis.findById(
                req.params.id
            );

        if (!analysis) {
            return res.status(404).json({
                message:
                "Analysis not found",
            });
        }

        res.json(analysis);

    } catch (error) {

        res.status(500).json({
            message:
            error.message,
        });

    }
};

module.exports = {
    analyzeResume,
    getAnalysisHistory,
    getAnalysisById,
};