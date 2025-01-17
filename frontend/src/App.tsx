import { AppSidebar } from "@/components/AppSidebar";
import Dashboard from "@/pages/dashboard/Dashboard";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import Upload from "@/pages/upload/Upload";
import { Route, Routes } from "react-router";
import Input from "@/pages/input/Input";

export default function App() {
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <main className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" variant="ghost" />
        </main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/input" element={<Input />} />
        </Routes>
      </SidebarInset>
    </>
  );
}
