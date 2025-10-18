"use client";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import ShaderBackground from "../components/ShaderBackground";

const mockDepartments = [
  { name: "Computer Science", id: "cs" },
  { name: "Mechanical Engineering", id: "mech" },
  { name: "Electronics & Comm.", id: "ece" },
  { name: "Civil Engineering", id: "civil" },
  { name: "Information Technology", id: "it" },
];

export default function DepartmentsPage() {
  return (
    <main className={styles.pageContainer}>
      <ShaderBackground />
      <div className={styles.contentWrapper}>
        <header className={styles.header}>
          <h1 className={styles.title}>College Departments</h1>
        </header>
        <div className={styles.grid}>
          {mockDepartments.map((dept, index) => (
            <Link
              href={`/departments/${dept.id}`}
              key={dept.id}
              className={styles.card}
              style={{ "--i": index }}
            >
              <div className={styles.cardImageContainer}>
                <Image
                  src="/images/image.jpg"
                  alt={`${dept.name} Department`}
                  width={100}
                  height={100}
                  className={styles.departmentImage}
                />
              </div>
              <h3 className={styles.departmentName}>{dept.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

