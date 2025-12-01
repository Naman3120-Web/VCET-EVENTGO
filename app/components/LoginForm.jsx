"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import styles from "./LoginForm.module.css";
import Button from "./Button";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To display login errors
  const [loading, setLoading] = useState(false); // To show a loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // If the response is not OK, set the error message from Supabase
        throw new Error(data.error || 'Login failed. Please try again.');
      }

      // --- LOGIN SUCCESSFUL ---
      console.log('Login successful:', data);
      // In a real app, you would redirect the user or save the session.
      // For now, a success message is sufficient for testing.
      alert("Login Successful! Check the console for session data.");

    } catch (err) {
      console.error('Login error:', err);
      setError(err.message);
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
