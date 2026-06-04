function SkillTags({
    title,
    skills,
    type,
    }) {
    return (
        <div className="card">
        <h3>{title}</h3>

        <div className="tags">
            {skills?.map((skill) => (
            <span
                key={skill}
                className={
                type === "success"
                    ? "tag-success"
                    : "tag-danger"
                }
            >
                {skill}
            </span>
            ))}
        </div>
        </div>
    );
}

export default SkillTags;