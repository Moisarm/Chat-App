import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import PrivateRoute from "./routes/PrivateRoute";
import AccountSettings from "./components/AccountSettings";
import SidebarMenu from "./components/SidebarMenu";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        >
          {/* Sidebar como layout interno */}
          <Route element={<Sidebar />}>
            <Route index element={<SidebarMenu />} />
            <Route path="settings" element={<AccountSettings />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
