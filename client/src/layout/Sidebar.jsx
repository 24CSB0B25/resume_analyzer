import {
    LayoutDashboard,
    FileText,
    History,
    Sparkles,
} from "lucide-react";

import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div className="sidebar">

        <div className="logo">
            <Sparkles size={20} />
            ResumeAI
        </div>

        <nav>

            <Link to="/">
            <LayoutDashboard size={18}/>
            Dashboard
            </Link>

            <Link to="/analyze">
            <FileText size={18}/>
            Analyze
            </Link>

            <Link to="/history">
            <History size={18}/>
            History
            </Link>

        </nav>

        </div>
    );
}

export default Sidebar;