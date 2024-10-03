import { Outlet } from "react-router-dom";
import Header from "./components/Header"; 

const LayoutWithHeader = ({ onLogout }) => { // Accept onLogout as a prop
  return (
    <>
      <Header onLogout={onLogout} /> {/* Pass onLogout to the Header */}
      <Outlet /> 
    </>
  );
};

export default LayoutWithHeader;
