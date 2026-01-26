import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <h1 className="text-3xl font-bold text-red-500">Tailwind funcionando</h1>
    </BrowserRouter>
  );
}

export default App;
