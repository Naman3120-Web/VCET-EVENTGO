// A placeholder to show dynamic routing is working.

export default async function DepartmentPage({ params }) {
  const { deptId } = await params;
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
      <h1>Department Page</h1>
      <p>You are viewing the page for Department ID: <strong>{deptId}</strong></p>
    </div>
  );
}
