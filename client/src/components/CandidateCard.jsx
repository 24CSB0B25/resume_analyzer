import { Mail, Phone } from "lucide-react";

function CandidateCard({
    candidate,
    }) {
    return (
        <div className="card">
        <h3>
            {candidate?.name}
        </h3>

        <p>
            <Mail size={16} /> {candidate?.email}
        </p>

        <p>
            <Phone size={16} /> {candidate?.phone}
        </p>

        <p>
            GitHub: {candidate?.github}
        </p>

        <p>
            LinkedIn: {candidate?.linkedin}
        </p>
        </div>
    );
}

export default CandidateCard;