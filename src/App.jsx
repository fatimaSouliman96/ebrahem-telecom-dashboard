import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
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

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        console.log("تمت إعادة المحاولة");
      }}
    >
      <>
        <div className={`flex bg-[#f7f8fa] w-full relative transition-all duration-300 ${open ? 'overflow-hidden lg:overflow-visible' : ''}`}>
          <SideBar openLogOut={handleOpenLogOut} open={open} setOpen={setOpen} />
          <div className="w-full flex-1 min-w-0 transition-all duration-300">
            <Navbar
              valueResult={valueResult}
              handelChangeSearch={handelChangeSearch}
              open={open}
              setOpen={setOpen}
            />
            <div className="px-8 pt-16 content">
              <Outlet />
            </div>
            <Results
              searchResults={searchResults}
              openResults={openResults}
              setOpenResults={setOpenResults}
            />
          </div>
        </div>
        {/* Mobile Sidebar Overlay */}
        {open && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
        )}
        <Toaster />
        <ModalPob open={openLogOut} handleClose={handleCloseLogOut}>
          <LogOut close={handleCloseLogOut} />
        </ModalPob>
      </>
    </ErrorBoundary>
  );
}

export default App;

