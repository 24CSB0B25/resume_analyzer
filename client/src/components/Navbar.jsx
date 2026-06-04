import { Sparkles } from "lucide-react";

function Navbar() {
    return (
        <div
        style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
        }}
        >
        <h2
            style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            }}
        >
            <Sparkles size={20} />
            ResumeAI
        </h2>

        <div
            style={{
            color: "#10b981",
            fontWeight: 600,
            }}
        >
            ● Gemini Active
        </div>
        </div>
    );
}

export default Navbar;