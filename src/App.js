import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/auth";
import NewOrderPage from "./pages/new_order";
import OrderHistoryPage from "./pages/order_history";
import Nav from "./components/nav";
import { getUserFromSession } from "./utilities/user-functions";

function App() {
  const [user, setUser] = useState(null);
  const [callMade, setCallMade] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      let user = await getUserFromSession();
      setUser(user);
      setCallMade(true);
    };
    getSession();
  }, []);

  const returnPage = () => {
    if (callMade) {
      return (
        <>
          {user ? (
            <div>
              <Nav />
              <Routes>
                <Route path="/orders" element={<OrderHistoryPage />} />
                <Route path="/orders/new" element={<NewOrderPage />} />
                <Route path="/*" element={<Navigate to="/orders/new" />} />
              </Routes>
            </div>
          ) : (
            <AuthPage setUser={setUser} />
          )}
        </>
      );
    } else {
      return <div>loading...</div>;
    }
  };

  return <div className="App">{returnPage()}</div>;
}

export default App;
