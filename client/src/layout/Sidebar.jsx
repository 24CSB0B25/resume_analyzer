import {
    LayoutDashboard,
    FileText,
    History,
    Sparkles,
    LogOut,
    User,
} from "lucide-react";

import {
    Link,
    useNavigate,
} from "react-router-dom";

import {
    useAuth,
} from "../context/AuthContext";

function Sidebar() {

    const navigate =
        useNavigate();

    const {
        logout,
        user,
    } = useAuth();

    const handleLogout =
        () => {

            logout();

            navigate("/");
        };

    return (

        <div
            className="sidebar"
            style={{
                display: "flex",
                flexDirection: "column",
            }}
        >

            <Link
                to="/"
                style={{
                    textDecoration: "none",
                    color: "white",
                }}
            >
                <div className="logo">
                    <Sparkles size={20} />
                    ResumeAI
                </div>
            </Link>

            <nav>

                <Link to="/dashboard">
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

            <div
                style={{
                    marginTop: "auto",
                    padding: "20px",
                    borderTop:
                        "1px solid rgba(255,255,255,0.08)",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "15px",
                    }}
                >
                    <div
                        style={{
                            width: "42px",
                            height: "42px",
                            borderRadius: "50%",
                            background:
                                "linear-gradient(135deg,#00d4ff,#7c3aed)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontWeight: "bold",
                        }}
                    >
                        {user?.name?.charAt(0) || "U"}
                    </div>

                    <div>
                        <div
                            style={{
                                color: "white",
                                fontWeight: "600",
                                fontSize: "14px",
                            }}
                        >
                            {user?.name || "User"}
                        </div>

                        <div
                            style={{
                                color: "#9ca3af",
                                fontSize: "12px",
                            }}
                        >
                            {user?.email}
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    style={{
                        background: "transparent",
                        border: "none",
                        color: "#9ca3af",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "12px",
                        borderRadius: "12px",
                        width: "100%",
                        textAlign: "left",
                        fontSize: "14px",
                    }}
                >
                    <LogOut size={18}/>
                    Logout
                </button>
            </div>

        </div>
    );
}

export default Sidebar;