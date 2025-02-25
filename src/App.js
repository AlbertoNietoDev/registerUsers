import "./App.css";
import storepersist from "./store/index";
import { SnackbarProvider } from "notistack";
import { HashRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { RegisterPage } from "./pages/register/index.tsx";
import { Suspense } from "react";
import { ThemeConfig } from "./theme/ThemeConfig.jsx";
import LoginPage from "./pages/login/index.tsx";
import { DashboardPage } from "./pages/dashboard/index.tsx";
import { PrivateRoute } from "./components/PrivateRoute.tsx";

function App() {
  const { store } = storepersist;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Router basename={"/"}>
          <ThemeConfig>
            <Provider store={store}>
              <Routes>
                <Route path="/auth">
                  <Route index element={<Navigate to="login" />} />
                  <Route path="login" element={<LoginPage />} />
                  <Route path="register" element={<RegisterPage />} />
                </Route>
                <Route path="/" element={<PrivateRoute />}>
                  <Route index element={<Navigate to="main" />} />
                  <Route path="/main">
                    <Route path="dashboard" element={<DashboardPage />} />
                  </Route>
                </Route>
              </Routes>
            </Provider>
          </ThemeConfig>
        </Router>
      </SnackbarProvider>
    </Suspense>
  );
}

export default App;
