import { motion } from "framer-motion";

function AIInsightCard({
    title,
    items,
    }) {
    return (
        <motion.div
        className="card"
        initial={{
            opacity: 0,
            y: 20,
        }}
        animate={{
            opacity: 1,
            y: 0,
        }}
        >
        <h3>{title}</h3>

        <ul className="insight-list">
            {items?.map(
            (item, index) => (
                <li key={index}>
                {item}
                </li>
            )
            )}
        </ul>
        </motion.div>
    );
}

export default AIInsightCard;