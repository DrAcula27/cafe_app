import "./App.css";
import { useEffect, useState, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/auth";
import NewOrderPage from "./pages/new_order";
import OrderHistoryPage from "./pages/order_history";
import Nav from "./components/nav";
import { getUserFromSession } from "./utilities/user-functions";
import { AppContext } from "./contexts/app_context";
import Loader from "react-js-loader";

function App() {
  const [callMade, setCallMade] = useState(null);
  let { user, setUser } = useContext(AppContext);

  useEffect(() => {
    const getSession = async () => {
      let userResponse = await getUserFromSession();
      setUser(userResponse);
      setCallMade(true);
    };
    getSession();
  }, []);

  const returnPage = () => {
    if (callMade) {
      return (
        <>
          {user ? (
            <div className="page-wrapper">
              <Nav />
              <Routes>
                <Route path="/orders" element={<OrderHistoryPage />} />
                <Route path="/orders/new" element={<NewOrderPage />} />
                <Route path="/*" element={<Navigate to="/orders/new" />} />
              </Routes>
            </div>
          ) : (
            <AuthPage />
          )}
        </>
      );
    } else {
      return <Loader />;
    }
  };

  return <div className="App">{returnPage()}</div>;
}

export default App;
