"use client";
import { useState, useEffect } from "react";
import browserClient from "@/lib/supabaseClient";

export default function AdminDashboard() {
  const [deptName, setDeptName] = useState("");
  const [facultyEmail, setFacultyEmail] = useState("");
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCreateDepartment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const supabase = browserClient();

   
      const { data: authData, error: authError } =
        await supabase.auth.getUser();
      if (authError) throw authError;
      const AuthUUID = authData.user.id;

      
      const { data: deptData, error: deptError } = await supabase
        .from("departments")
        .insert([{ name: deptName }])
        .select()
        .single();
      if (deptError) throw deptError;

      
      const { data: userData, error: userError } = await supabase
        .from("user_roles")
        .select()
        .eq("user_id", AuthUUID)
        .single();
      if (userError) throw userError;

      
      if (userData.role === "admin" || userData.role === "super_admin") {
        const ExpiryDate = new Date();
        ExpiryDate.setDate(ExpiryDate.getDate() + 1);

        const { error: inviteError } = await supabase
          .from("invitations")
          .insert([
            {
              email: facultyEmail,
              role_offered: "department_user",
              invited_by: AuthUUID,
              target_id: deptData.id,
              expires_at: ExpiryDate.toISOString(),
            },
          ]);

        if (inviteError) throw inviteError;

        
        alert(`Success! Invited ${facultyEmail} to manage ${deptName}.`);
        setDeptName(""); 
        setFacultyEmail(""); 

        await fetchDepartments();
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Database Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const supabase = browserClient();
      const { data: deptData, error: deptError } = await supabase
        .from("departments")
        .select("*")
        .order("created_at", { ascending: false })

      if (deptError) throw deptError;

      setDepartments(deptData);
    } catch (err) {
      console.error("Error fetching departments:", err);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);


  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "40px 20px",
        fontFamily: "sans-serif",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <h1>🛡️ Admin Dashboard</h1>
        <button
          style={{
            padding: "8px 16px",
            background: "#fee2e2",
            color: "#991b1b",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Log Out
        </button>
      </header>

      <section
        style={{
          background: "#f8fafc",
          padding: "24px",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          marginBottom: "40px",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Create & Invite</h2>
        <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "20px" }}>
          Create a new department and send an invitation to the Faculty Manager.
        </p>

        <form
          onSubmit={handleCreateDepartment}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              Department Name
            </label>
            <input
              type="text"
              required
              value={deptName}
              onChange={(e) => setDeptName(e.target.value)}
              placeholder="e.g., Computer Science"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              Faculty Manager Email
            </label>
            <input
              type="email"
              required
              value={facultyEmail}
              onChange={(e) => setFacultyEmail(e.target.value)}
              placeholder="faculty@college.edu"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "12px",
              background: loading ? "#94a3b8" : "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Processing..." : "Create Department & Send Invite"}
          </button>
        </form>
      </section>

      {/* DEPARTMENT LIST */}
      <section>
        <h2>Active Departments</h2>
        <div
          style={{
            background: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          <ul>
            {departments.map((dept) => (
              <li
                key={dept.id}
                style={{ padding: "8px 0", borderBottom: "1px solid #f1f5f9" }}
              >
                <strong>{dept.name}</strong>

                <span
                  style={{
                    fontSize: "12px",
                    color: "#64748b",
                    marginLeft: "10px",
                  }}
                >
                  {dept.manager_id ? "✅ Manager Joined" : "⏳ Pending Invite"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
