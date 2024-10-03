import { Outlet } from "react-router-dom";
import Header from "./components/Header"; 

const LayoutWithHeader = () => {
  return (
    <>
      <Header />
     
        <Outlet /> 
     
    </>
  );
};

export default LayoutWithHeader;