"use client";
import styles from "./page.module.css";
import SparklesBackground from "../components/SparklesBackground";
import LoginForm from "../components/LoginForm";
// MorphingText component is no longer imported

export default function LoginPage() {
  return (
    <main className={styles.pageContainer}>
      <div className={styles.backgroundWrapper}>
        <SparklesBackground particleColor="#FFFFFF" />
      </div>

      {/* The content wrapper is removed, and the form container is now the main content */}
      <div className={styles.formContainer}>
        {/* A simple title replaces the morphing text */}
        <h1 className={styles.title}>Admin & Department Login</h1>
        <LoginForm />
      </div>
    </main>
  );
}

