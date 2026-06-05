import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Login() {

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [error, setError] =
        useState("");

    const navigate =
        useNavigate();

    const { login } =
        useAuth();

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                const data =
                    await loginUser({
                        email,
                        password,
                    });

                login(data);

                navigate("/analyze");

            } catch (err) {

                setError(
                    err.response?.data?.message ||
                    "Login failed"
                );

            }
        };

    return (
        <div className="container">

            <div
                className="stat-card"
                style={{
                    maxWidth: "500px",
                    margin: "50px auto",
                }}
            >
                <h1
                    className="dashboard-title"
                >
                    Login
                </h1>

                {error && (
                    <p
                        style={{
                            color: "#ef4444",
                            marginBottom: "15px",
                        }}
                    >
                        {error}
                    </p>
                )}

                <form
                    onSubmit={
                        handleSubmit
                    }
                >
                    <input
                        className="input-file"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }
                    />

                    <br />
                    <br />

                    <input
                        className="input-file"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                    />

                    <button
                        className="ai-button"
                        type="submit"
                    >
                        Login
                    </button>
                </form>

                <p
                    style={{
                        marginTop: "20px",
                    }}
                >
                    New user?{" "}
                    <Link
                        to="/register"
                    >
                        Register
                    </Link>
                </p>
            </div>

        </div>
    );
}

export default Login;