import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Navbar, ModalPob, LogOut, SideBar } from "./components";
import Results from "./components/results/Results";
import { allLinks } from "./constants/links";

import { ErrorBoundary } from "react-error-boundary";

// 🔹 واجهة احتياطية عامة (للأخطاء بأي مكون)
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" className="flex flex-col bg-[#f7f8fa] w-full relative h-screen p-6 items-center justify-center">
      <p>❌ حدث خطأ غير متوقع:</p>
      <pre>{error.message}</pre>
      <button className="text-blue-600 cursor-pointer" onClick={resetErrorBoundary}>🔄 حاول مرة أخرى</button>
    </div>
  );
}

// مكون ممكن يعمل خطأ (اختياري للتجربة)
function BuggyComponent() {
  throw new Error("مشكلة في المكون 😅");
  return <div>لن يظهر هذا النص</div>;
}

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const name = localStorage.getItem("name");

  const [searchResults, setSearchResults] = useState([]);
  const [openResults, setOpenResults] = useState(false);
  const [valueResult, setValueResult] = useState("");
  const [open, setOpen] = useState(true);
  const [openLogOut, setOpenLogOut] = useState(false);

  const handelOpenResults = () => setOpenResults(true);
  const handelCloseResults = () => setOpenResults(false);

  const handelChangeSearch = (e) => {
    setValueResult(e.target.value);
    if (e.target.value !== "") {
      handelOpenResults();
      handelSearchResults(e.target.value);
    } else {
      handelCloseResults();
    }
  };

  const handelSearchResults = (value) => {
    setSearchResults(allLinks.filter((ele) => ele.text.includes(value)));
  };

  const handleOpenLogOut = () => setOpenLogOut(true);
  const handleCloseLogOut = () => setOpenLogOut(false);

  useEffect(() => {
    if (name == null) {
      if (location?.state?.remember == false || location?.state?.remember == true) {
        return;
      } else {
        navigate("/log_in");
      }
    }
  }, []);

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        console.log("تمت إعادة المحاولة");
      }}
    >
      <div className="flex bg-[#f7f8fa] w-full relative">
        <SideBar openLogOut={handleOpenLogOut} open={open} setOpen={setOpen} />
        <div
          className={`${
            open ? "w-[82%]" : "w-[100%]"
          } transform transition-all duration-200 `}
        >
          <Navbar
            valueResult={valueResult}
            handelChangeSearch={handelChangeSearch}
            open={open}
            setOpen={setOpen}
          />
          <div className="px-8 pt-16">
            {/* إذا بدك تجربي الأخطاء حطي المكون هون */}
            {/* <BuggyComponent /> */}
            <Outlet />
          </div>
          <Results
            searchResults={searchResults}
            openResults={openResults}
            setOpenResults={setOpenResults}
          />
        </div>
      </div>
      <Toaster />
      <ModalPob open={openLogOut} handleClose={handleCloseLogOut}>
        <LogOut close={handleCloseLogOut} />
      </ModalPob>
    </ErrorBoundary>
  );
}

export default App;
