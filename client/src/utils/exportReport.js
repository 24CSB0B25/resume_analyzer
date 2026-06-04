import jsPDF from "jspdf";

export const exportReport = (analysis) => {

    const doc = new jsPDF();

    let y = 20;

    // =====================
    // Helper Functions
    // =====================

    const checkPage = (spaceNeeded = 20) => {
        if (y > 270 - spaceNeeded) {
            doc.addPage();
            y = 20;
        }
    };

    const addSectionTitle = (title) => {

        checkPage(20);

        doc.setFillColor(52, 73, 94);

        doc.rect(
            20,
            y,
            170,
            10,
            "F"
        );

        doc.setTextColor(
            255,
            255,
            255
        );

        doc.setFont(
            "helvetica",
            "bold"
        );

        doc.setFontSize(13);

        doc.text(
            title,
            25,
            y + 7
        );

        doc.setTextColor(
            0,
            0,
            0
        );

        y += 18;
    };

    // =====================
    // Header
    // =====================

    doc.setFillColor(
        41,
        128,
        185
    );

    doc.rect(
        0,
        0,
        210,
        30,
        "F"
    );

    doc.setTextColor(
        255,
        255,
        255
    );

    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.setFontSize(22);

    doc.text(
        "Resume Analysis Report",
        20,
        20
    );

    doc.setTextColor(
        0,
        0,
        0
    );

    y = 45;

    // =====================
    // ATS Score Card
    // =====================

    const score =
        analysis.atsScore || 0;

    let scoreColor;

    if (score >= 80) {
        scoreColor = [220, 255, 220];
    } else if (score >= 60) {
        scoreColor = [255, 245, 220];
    } else {
        scoreColor = [255, 220, 220];
    }

    doc.setFillColor(
        scoreColor[0],
        scoreColor[1],
        scoreColor[2]
    );

    doc.roundedRect(
        20,
        y,
        170,
        25,
        3,
        3,
        "F"
    );

    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.setFontSize(18);

    doc.text(
        `ATS Score: ${score}%`,
        30,
        y + 15
    );

    y += 40;

    // =====================
    // Candidate Card
    // =====================

    doc.setFillColor(
        245,
        245,
        245
    );

    doc.rect(
        20,
        y,
        170,
        18,
        "F"
    );

    doc.setFontSize(12);

    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.text(
        "Candidate:",
        25,
        y + 11
    );

    doc.setFont(
        "helvetica",
        "normal"
    );

    doc.text(
        analysis.candidateInfo?.name ||
        "Unknown Candidate",
        60,
        y + 11
    );

    y += 30;

    // =====================
    // Summary
    // =====================

    addSectionTitle(
        "Executive Summary"
    );

    doc.setFontSize(11);

    const summary =
        doc.splitTextToSize(
            analysis.aiAnalysis?.summary ||
            "No summary available.",
            165
        );

    doc.text(
        summary,
        25,
        y
    );

    y += summary.length * 6 + 12;

    // =====================
    // Sections
    // =====================

    const sections = [
        [
            "Strengths",
            analysis.aiAnalysis?.strengths,
            [232, 245, 233]
        ],
        [
            "Weaknesses",
            analysis.aiAnalysis?.weaknesses,
            [255, 235, 238]
        ],
        [
            "Improvements",
            analysis.aiAnalysis?.improvements,
            [255, 248, 225]
        ],
        [
            "Interview Questions",
            analysis.aiAnalysis?.interviewQuestions,
            [240, 240, 240]
        ]
    ];

    sections.forEach(
        ([title, items, color]) => {

            addSectionTitle(title);

            const estimatedHeight =
                (items?.length || 1) * 10 + 10;

            checkPage(
                estimatedHeight
            );

            doc.setFillColor(
                color[0],
                color[1],
                color[2]
            );

            doc.rect(
                20,
                y - 5,
                170,
                estimatedHeight,
                "F"
            );

            doc.setFontSize(11);

            items?.forEach(
                item => {

                    const wrapped =
                        doc.splitTextToSize(
                            `• ${item}`,
                            155
                        );

                    doc.text(
                        wrapped,
                        25,
                        y
                    );

                    y +=
                        wrapped.length * 6 +
                        3;
                }
            );

            y += 10;
        }
    );

    // =====================
    // Footer
    // =====================

    const pages =
        doc.internal.getNumberOfPages();

    for (
        let i = 1;
        i <= pages;
        i++
    ) {

        doc.setPage(i);

        doc.setFontSize(9);

        doc.setTextColor(
            120,
            120,
            120
        );

        doc.text(
            "Generated by Resume Analyzer AI",
            20,
            290
        );

        doc.text(
            `Page ${i} of ${pages}`,
            170,
            290
        );
    }

    doc.save(
        "analysis-report.pdf"
    );
};