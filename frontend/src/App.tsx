import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import PrivateRoute from "./routes/PrivateRoute";
import AccountSettings from "./components/AccountSettings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública */}
        <Route path="/" element={<Auth />} />

        {/* Ruta privada */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        {/* Rutas internas de Home */}
        <Route path="settings" element={<AccountSettings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
