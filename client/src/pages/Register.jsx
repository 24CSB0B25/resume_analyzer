import { useState } from "react";

import {
    useNavigate,
    Link,
} from "react-router-dom";

import {
    registerUser,
} from "../services/authService";

function Register() {

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [error, setError] =
        useState("");

    const navigate =
        useNavigate();

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                await registerUser({
                    name,
                    email,
                    password,
                });

                navigate("/login");

            } catch (err) {

                setError(
                    err.response?.data?.message ||
                    "Registration failed"
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
                    Register
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
                        placeholder="Name"
                        value={name}
                        onChange={(e) =>
                            setName(
                                e.target.value
                            )
                        }
                    />

                    <br />
                    <br />

                    <input
                        className="input-file"
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
                        Register
                    </button>
                </form>

                <p
                    style={{
                        marginTop: "20px",
                    }}
                >
                    Already have an account?{" "}
                    <Link
                        to="/login"
                    >
                        Login
                    </Link>
                </p>
            </div>

        </div>
    );
}

export default Register;