import { Outlet } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Bar from "./layout/Bar";
import { useGetProfileQuery } from "./api/ApiClient";
import { useState, useEffect } from "react";
import Loading from "./components/Loading";

function App() {
  const access = localStorage.getItem("access");
  const {data, isError, isLoading } = useGetProfileQuery("",{skip: !access});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);


  return (
    <>
      {access ? (
        loading ? (
          <>
            <Loading />
          </>
        ) : (
          <div className="grid grid-cols-6">
            <div className="col-span-1">
              <Bar />
            </div>
            <div className="col-span-5">
              <Navbar data={data} isError={isError} />
              <Outlet />
            </div>
          </div>
        )
      ) : (
        <Outlet />
      )}
    </>
  );
}

export default App;
