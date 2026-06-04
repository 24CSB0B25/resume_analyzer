const calculateATS = (
    resumeText,
    jobDescription
    ) => {
    const resume = resumeText.toLowerCase();
    const jd = jobDescription.toLowerCase();

    const skillsDatabase =require("./skillsDatabase");

    const requiredSkills =
        skillsDatabase.filter(skill =>
        jd.includes(skill)
        );

    const matchedSkills =
        requiredSkills.filter(skill =>
        resume.includes(skill)
        );

    const missingSkills =
        requiredSkills.filter(
        skill => !resume.includes(skill)
        );

    const score =
        requiredSkills.length === 0
        ? 0
        : Math.round(
            (matchedSkills.length /
                requiredSkills.length) *
                100
            );

    return {
        score,
        matchedSkills,
        missingSkills,
    };
};

module.exports = calculateATS;