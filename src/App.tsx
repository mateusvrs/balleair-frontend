import { BrowserRouter, Routes, Route } from "react-router-dom"

import { PrivateRoute } from "./components/PrivateRoute"
import { PublicRoute } from "./components/PublicRoute"
import { TravelerOnlyRoute } from "./components/TravelerOnlyRoute"

import { AuthContextProvider } from "./contexts/AuthContext"
import { LoadingContextProvider } from "./contexts/LoadingContext"
import { ModalOpenContextProvider } from "./contexts/ModalOpenContext"
import { SelectedFlightContextProvider } from "./contexts/SelectedFlightContext"

import { FlightsPage } from "./pages/Flights"
import { HomePage } from "./pages/Home"
import { LoginPage } from "./pages/Login"
import { RegisterPage } from "./pages/Register"

export function App() {
  return (
    <ModalOpenContextProvider>
      <SelectedFlightContextProvider>
        <LoadingContextProvider>
          <AuthContextProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<PublicRoute component={<RegisterPage />} />} />
                <Route path="/login" element={<PublicRoute component={<LoginPage />} />} />
                <Route path="/home" element={<TravelerOnlyRoute component={<HomePage />} />} />
                <Route path="/flights" element={<PrivateRoute component={<FlightsPage />} />} />
              </Routes>
            </BrowserRouter>
          </AuthContextProvider>
        </LoadingContextProvider>
      </SelectedFlightContextProvider>
    </ModalOpenContextProvider>
  )
}
