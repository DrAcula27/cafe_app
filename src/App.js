import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/auth";
import NewOrderPage from "./pages/new_order";
import OrderHistoryPage from "./pages/order_history";
import Nav from "./components/nav";

function App() {
  const [user, setUser] = useState({});

  return (
    <div className="App">
      {user ? (
        <div>
          <Nav />
          <Routes>
            <Route path="/orders" element={<OrderHistoryPage />} />
            <Route path="/orders/new" element={<NewOrderPage />} />
          </Routes>
        </div>
      ) : (
        <AuthPage />
      )}
    </div>
  );
}

export default App;
