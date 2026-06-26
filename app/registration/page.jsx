"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import browserClient from "@/lib/supabaseClient";

function RegistrationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inviteToken = searchParams.get("token"); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("checking"); 
  const [inviteData, setInviteData] = useState(null);

  const supabase = browserClient();

  
  useEffect(() => {
    async function checkRegistrationStatus() {
      try {
      
        const { data: adminData, error: adminError } = await supabase
          .from("user_roles")
          .select("id")
          .eq("role", "super_admin")
          .limit(1);

        const adminExists = adminData && adminData.length > 0;

        if (!adminExists) {
          setStatus("first_admin");
          return;
        }

       
        if (adminExists && !inviteToken) {
          setStatus("denied");
          return;
        }

       
        const { data: invite, error: inviteError } = await supabase
          .from("invitations")
          .select("*")
          .eq("id", inviteToken)
          .single();

        if (inviteError || !invite) {
          setStatus("denied");
          return;
        }

        setInviteData(invite);
        setEmail(invite.email);
        setStatus("invited");
      } catch (error) {
        console.error("Setup error:", error);
        setStatus("denied");
      }
    }

    checkRegistrationStatus();
  }, [inviteToken, supabase]);

 
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
    
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (authError) throw authError;

      const newUserId = authData.user.id;

      
      if (status === "first_admin") {
       
        const { error: roleError } = await supabase
          .from("user_roles")
          .insert([{ user_id: newUserId, role: "super_admin" }]);
        if (roleError) throw roleError;
      } else if (status === "invited") {

        const { error: roleError } = await supabase
          .from("user_roles")
          .insert([{ user_id: newUserId, role: inviteData.role_offered }]);
        if (roleError) throw roleError;

       
        await supabase.from("invitations").delete().eq("id", inviteToken);
      }

      alert("Registration successful! You can now log in.");
      router.push("/login");
    } catch (error) {
      alert("Registration failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };


  if (status === "checking")
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        Verifying access...
      </p>
    );

  if (status === "denied")
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>🛑 Access Denied</h2>
        <p>Registration is by invitation only, or your token is invalid.</p>
      </div>
    );

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "30px",
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        fontFamily: "sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center" }}>
        {status === "first_admin"
          ? "👑 Claim Admin Account"
          : "🎟️ Accept Invitation"}
      </h2>

      <form
        onSubmit={handleRegister}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          marginTop: "20px",
        }}
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
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "invited"} // Lock the email if they were invited!
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #cbd5e1",
              backgroundColor: status === "invited" ? "#f1f5f9" : "white",
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
            Create Password
          </label>
          <input
            type="password"
            required
            minLength="6"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            marginTop: "10px",
          }}
        >
          {loading ? "Creating Account..." : "Register Securely"}
        </button>
      </form>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>
      }
    >
      <RegistrationForm />
    </Suspense>
  );
}
