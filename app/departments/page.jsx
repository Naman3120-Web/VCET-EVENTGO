import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

// Mock data - replace with API call later
const mockDepartments = [
  { name: "Computer Science", logoUrl: "https://placehold.co/100x100/000000/FFFFFF?text=CS", id: 'cs' },
  { name: "Mechanical Engineering", logoUrl: "https://placehold.co/100x100/1a1a1a/FFFFFF?text=ME", id: 'mech' },
  { name: "Electronics & Comm.", logoUrl: "https://placehold.co/100x100/333333/FFFFFF?text=ECE", id: 'ece' },
  { name: "Civil Engineering", logoUrl: "https://placehold.co/100x100/4d4d4d/FFFFFF?text=CE", id: 'civil' },
  { name: "Information Technology", logoUrl: "https://placehold.co/100x100/666666/FFFFFF?text=IT", id: 'it' },
];

export default function DepartmentsPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>College Departments</h1>
      <div className={styles.grid}>
        {mockDepartments.map((dept) => (
          <Link href={`/departments/${dept.id}`} key={dept.name} className={styles.card}>
            <Image 
              src={dept.logoUrl} 
              alt={`${dept.name} Logo`} 
              width={80}
              height={80}
              className={styles.logo} 
            />
            <h3 className={styles.deptName}>{dept.name}</h3>
          </Link>
        ))}
      </div>
    </main>
  );
}

