import { motion } from "framer-motion";

function ATSCard({ score }) {
    return (
        <div className="card ats-card">
        <h3>ATS Score</h3>

        <div className="score">
            {score}%
        </div>

        <div className="progress-bar">
            <motion.div
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{
                width: `${score}%`,
            }}
            transition={{
                duration: 1,
            }}
            />
        </div>
        </div>
    );
}

export default ATSCard;