// A placeholder to show dynamic routing is working.

export default function DepartmentPage({ params }) {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Department Page</h1>
      <p>You are viewing the page for Department ID: <strong>{params.deptId}</strong></p>
    </div>
  );
}
