function StatsRow({ result }) {
    return (

        
        <div className="stats-row">
        <div className="stat-card">
            <h4>ATS</h4>
            <span>{result.atsScore}%</span>
        </div>

        <div className="stat-card">
            <h4>Matched</h4>
            <span>{result.matchedSkills.length}</span>
        </div>

        <div className="stat-card">
            <h4>Missing</h4>
            <span>{result.missingSkills.length}</span>
        </div>

        <div className="stat-card">
            <h4>AI</h4>
            <span>Ready</span>
        </div>
        </div>
    );
}

export default StatsRow;