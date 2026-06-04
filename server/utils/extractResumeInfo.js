const skillsDatabase = require("./skillsDatabase");

const extractResumeInfo = (resumeText) => {
    const email =
        resumeText.match(
        /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i
        )?.[0] || "";

    const phone =
        resumeText.match(
        /(\+91\s*[-]?\s*)?[6-9]\d{4}\s*[-]?\s*\d{5}/
        )?.[0] || "";

    const lines = resumeText
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0);

    const name =
        (lines[0] || "")
            .replace(/\+91.*$/, "")
            .replace(/[0-9]/g, "")
            .replace(/[^A-Za-z\s]/g, "")
            .trim();

    const github =
        resumeText.includes("GitHub")
        ? "Present"
        : "";

    const linkedin =
        resumeText.includes("LinkedIn")
        ? "Present"
        : "";

    const matchedSkills =
        skillsDatabase.filter(skill =>
        resumeText
            .toLowerCase()
            .includes(skill.toLowerCase())
        );

    return {
        name,
        email,
        phone,
        github,
        linkedin,
        skills: matchedSkills,
    };
};

module.exports = extractResumeInfo;