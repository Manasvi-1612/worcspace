import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { SidebarProvider } from "../../context/sidebar-context";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <main className="h-svh w-full flex flex-col overflow-hidden p-1.5">
        <Header />
        <div className="flex-1 flex overflow-hidden">
          <div className="h-full shrink-0 overflow-y-auto overflow-x-hidden"><Sidebar /></div>
          <div className="flex-1 overflow-hidden">{children}</div>
        </div>
      </main>
    </SidebarProvider>
  );
};

export default Layout;
