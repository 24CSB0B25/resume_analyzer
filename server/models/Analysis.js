const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
    {
        user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        },

        atsScore: Number,

        matchedSkills: [String],

        missingSkills: [String],

        candidateInfo: Object,

        aiAnalysis: Object,
    },
    {
        timestamps: true,
    }
);

    module.exports = mongoose.model(
    "Analysis",
    analysisSchema
);