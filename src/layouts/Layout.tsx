import React from "react";
import { Noice } from "@/components/Noice";
type LayoutProps = {
  children: React.ReactNode; // Los componentes hijos que serán envueltos por el layout
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {children}
      <Noice />
    </div>
  );
};

export default Layout;
