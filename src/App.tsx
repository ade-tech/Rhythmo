import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/ui/Home";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/track/:id" />
      <Route path="/album/:id" />
      <Route path="/playlist/:id" />
      <Route path="/artist/:id" />
      <Route path="/genre/:id" />
      <Route path="/profile" />
    </Routes>
  );
}

export default App;
