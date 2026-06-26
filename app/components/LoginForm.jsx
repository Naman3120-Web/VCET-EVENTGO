"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import styles from "./LoginForm.module.css";
import Button from "./Button";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const router = useRouter(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
      
        setError(data.error || "Login failed. Please try again.");
        setPassword("");
        setEmail("");
        return handleSubmit;
      }
      const Role = data.user.email;
      if (Role === "andydan3030@gmail.com") {
        router.push("/admin/dashboard");
      } else {
        router.push("departmentUser/dashboard");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              disabled={loading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <div className={styles.passwordWrapper}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                disabled={loading}
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={loading}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && <p className={styles.errorText}>{error}</p>}

          <Button
            type="submit"
            text={loading ? "Signing in..." : "Sign In"}
            className={styles.submitButton}
            disabled={loading}
          />
        </form>
      </div>
      <div className={styles.cardFooter}>
        <p>
          Need access?{" "}
          <a href="#" className={styles.link}>
            Contact Admin
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
