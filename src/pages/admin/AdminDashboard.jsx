import { useEffect, useState } from "react";

function AdminDashboard() {

  const [stats, setStats] = useState({
    totalStudents: 128,
    pendingDocs: 23,
    visaInProgress: 41,
    approvedCases: 64,
    tuitionPaid: 92,
    inactiveStudents: 18
  });

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/notifications/admin")
      .then(res => res.json())
      .then(data => setNotifications(data))
      .catch(err => console.error("Failed to load notifications", err));
  }, []);

  const recentActivities = [
    "Rahul uploaded passport document",
    "Anjali visa status updated",
    "New student registered: Amaan",
    "Docs team approved 3 files"
  ];

  const pendingTasks = [
    "Verify 12 student documents",
    "Assign cases to Docs Team",
    "Review visa applications",
    "Generate monthly report"
  ];


  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Admin Dashboard</h1>

      {/* ===== STATS ===== */}
      <div style={styles.grid}>
        <StatCard title="Total Students" value={stats.totalStudents} color="#1E3A8A" />
        <StatCard title="Pending Documents" value={stats.pendingDocs} color="#F97316" />
        <StatCard title="Visa In Progress" value={stats.visaInProgress} color="#7C3AED" />
        <StatCard title="Approved Cases" value={stats.approvedCases} color="#059669" />
        <StatCard title="Tuition Fee Paid" value={stats.tuitionPaid} color="#0EA5E9" />
        <StatCard title="Inactive Students" value={stats.inactiveStudents} color="#DC2626" />
      </div>


      {/* ===== QUICK ACTIONS ===== */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Quick Actions</h2>
        <div style={styles.actions}>
          <ActionBtn text="Add Student" />
          <ActionBtn text="Assign Docs Team" />
          <ActionBtn text="Update Visa Status" />
          <ActionBtn text="Generate Report" />
        </div>
      </div>

      {/* ===== ACTIVITY + TASKS ===== */}
      <div style={styles.twoCol}>
        {/* Recent Activity */}
        <div style={styles.box}>
          <h3 style={styles.boxTitle}>Recent Activity</h3>
          {recentActivities.map((a, i) => (
            <p key={i} style={styles.listItem}>• {a}</p>
          ))}
        </div>

        {/* Pending Tasks */}
        <div style={styles.box}>
          <h3 style={styles.boxTitle}>Pending Tasks</h3>
          {pendingTasks.map((t, i) => (
            <p key={i} style={styles.listItem}>• {t}</p>
          ))}
        </div>
      </div>

      {/* ===== SYSTEM STATUS ===== */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>System Status</h2>
        <div style={styles.statusRow}>
          <StatusBadge label="Server" status="Online" color="#16A34A" />
          <StatusBadge label="Database" status="Connected" color="#2563EB" />
          <StatusBadge label="API" status="Running" color="#7C3AED" />
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({ title, value, color }) {
  return (
    <div style={{ ...styles.card, borderLeft: `6px solid ${color}` }}>
      <h3 style={styles.cardTitle}>{title}</h3>
      <p style={{ ...styles.cardValue, color }}>{value}</p>
    </div>
  );
}

function ActionBtn({ text }) {
  return <button style={styles.actionBtn}>{text}</button>;
}

function StatusBadge({ label, status, color }) {
  return (
    <div style={styles.statusBox}>
      <span>{label}</span>
      <span style={{ ...styles.status, color }}>{status}</span>
    </div>
  );
}

export default AdminDashboard;

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#F9FAFB",
    padding: "30px 40px"
  },

  title: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#1E3A8A",
    marginBottom: "25px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px"
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: "14px",
    padding: "20px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.06)"
  },

  cardTitle: {
    fontSize: "14px",
    color: "#6B7280",
    marginBottom: "10px"
  },

  cardValue: {
    fontSize: "32px",
    fontWeight: "700"
  },

  section: {
    marginTop: "35px"
  },

  sectionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "12px",
    color: "#1F2933"
  },

  actions: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap"
  },

  actionBtn: {
    backgroundColor: "#1E3A8A",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px"
  },

  twoCol: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginTop: "30px"
  },

  box: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "18px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.05)"
  },

  boxTitle: {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "10px"
  },

  listItem: {
    fontSize: "14px",
    color: "#374151",
    marginBottom: "6px"
  },

  statusRow: {
    display: "flex",
    gap: "20px"
  },

  statusBox: {
    backgroundColor: "#fff",
    padding: "12px 16px",
    borderRadius: "10px",
    boxShadow: "0 6px 14px rgba(0,0,0,0.05)",
    display: "flex",
    gap: "10px",
    alignItems: "center"
  },

  status: {
    fontWeight: "700"
  }
};
