import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/style/main.css";
import App from "./App.tsx";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login.tsx";
import Landing from "./pages/Landing/Landing.tsx";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";
import '@ant-design/v5-patch-for-react-19';
import Profile from "./pages/profile/Profile.tsx";
import Leads from "./pages/Leads.tsx";
import Students from "./pages/students/Students.tsx";

const access = localStorage.getItem("access");
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            {access ? (
              <>
                <Route index element={<Landing />} />
                <Route path="/dashboard" element={<Landing />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/leads" element={<Leads />} />
                <Route path='/students' element={<Students />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Login />} />
              </>
            )}
            <Route path="*" element={<Navigate to={'/'} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
