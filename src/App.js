import "./App.css";
import storepersist from "./store/index";
import { SnackbarProvider } from "notistack";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import LoginComponent from "./pages/login/index.tsx";
import { RegisterComponent } from "./pages/register/index.tsx";
import { Suspense } from "react";
import { ThemeConfig } from "./theme/ThemeConfig.jsx";

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
        <BrowserRouter basename={"/"}>
          <ThemeConfig>
            <Provider store={store}>
              <Routes>
                <Route path="/auth">
                  <Route index element={<Navigate to="login" />} />
                  <Route
                    path="login"
                    element={<LoginComponent />}
                  />
                  <Route
                    path="register"
                    element={<RegisterComponent />}
                  /> 
                </Route>
              </Routes>
            </Provider>
          </ThemeConfig>
        </BrowserRouter>
      </SnackbarProvider>
    </Suspense>
  );
}

export default App;
