// import Header from "./Header";
// import SidebarComponent from "./SidebarComponent";

import { Header } from "./header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-svh w-full flex flex-col overflow-hidden p-2">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <div className="">Sidebar</div>
        <div className="flex-1 overflow-hidden">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
