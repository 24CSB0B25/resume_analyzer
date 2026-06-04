require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const analyzeWithGemini = async (
    resumeText,
    jobDescription
    ) => {
    const prompt = `
    You are an ATS resume analyzer.

    Analyze the resume against the job description.

    Return ONLY valid JSON.

    DO NOT add explanations.
    DO NOT add markdown.
    DO NOT add code fences.
    DO NOT add any text before or after the JSON.

    Required format:

    {
    "summary": "string",
    "strengths": ["string"],
    "weaknesses": ["string"],
    "improvements": ["string"],
    "interviewQuestions": ["string"]
    }

    Resume:
    ${resumeText}

    Job Description:
    ${jobDescription}
    `;

    let lastError;

    for (let i = 0; i < 3; i++) {
        try {
        const response =
            await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
                config: {
                    responseMimeType:
                        "application/json",
                },
            });


        console.log("RAW GEMINI RESPONSE:");
        console.log(response.text);

        return response.text;
        } catch (error) {
        lastError = error;

        console.log(
            `Gemini attempt ${i + 1} failed`
        );

        await new Promise(resolve =>
            setTimeout(resolve, 2000)
        );
        }
    }

    throw lastError;
};
module.exports = analyzeWithGemini;