function CircularATS({ score }) {
    const radius = 70;
    const circumference =
        2 * Math.PI * radius;

    const offset =
        circumference -
        (score / 100) *
        circumference;

    return (
        <div className="card ats-circle">
        <h3>ATS Score</h3>

        <svg
            width="180"
            height="180"
        >
            <circle
                cx="90"
                cy="90"
                r={radius}
                stroke="#1f2937"
                strokeWidth="12"
                fill="none"
            />

            <circle
                cx="90"
                cy="90"
                r={radius}
                stroke="url(#grad)"
                strokeWidth="12"
                fill="none"
                strokeDasharray={
                    circumference
                }
                strokeDashoffset={
                    offset
                }
                strokeLinecap="round"
                transform="
                rotate(-90 90 90)
                "
            />

            <defs>
                <linearGradient
                    id="grad"
                >
                    <stop
                    offset="0%"
                    stopColor="#00e5ff"
                    />
                    <stop
                    offset="100%"
                    stopColor="#7c3aed"
                    />
                </linearGradient>
            </defs>

            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dy=".3em"
                fill="white"
                fontSize="32"
                fontWeight="700"
                >
                {score}%
            </text>
        </svg>
        </div>
    );
}

export default CircularATS;