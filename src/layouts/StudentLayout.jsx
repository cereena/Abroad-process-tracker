import { useState } from "react";
import Sidebar from "../components/student/sidebar.jsx";
import Topbar from "../components/student/Topbar.jsx";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

function StudentLayout() {

  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-blue-50">

      <Sidebar open={open} setOpen={setOpen} />

      <div className="flex-1 flex flex-col">

        <Topbar setOpen={setOpen} />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

        <Footer />

      </div>

    </div>
  );
}

export default StudentLayout;