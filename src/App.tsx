import { ChakraProvider, Flex, theme } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Overview from "./components/Overview/Overview";
import Bots from "./components/Bots/Bots";
import Alerts from "./components/Alerts/Alerts";
import Navbar from "./components/Navbar/Navbar";
import ContextProvider, { LoggedInUser } from "./context/ContextProvider";
import Authentication from "./components/Login/Authentication";
import Scan from "./components/Scan/Scan";
import jwt_decode from "jwt-decode";
import "./styles.css";
export const App = () => {
  let auth = false;
  const token = localStorage.token;
  if (token) {
    let user: LoggedInUser = jwt_decode(token);
    if (user) {
      auth = true;
    }
  }
  return (
    <div className="scrollbar">
      <ChakraProvider theme={theme}>
        <ContextProvider>
          <Router>
            <Flex>
              {auth ? (
                <>
                  <Navbar />
                  <Routes>
                    <Route path="/overview" element={<Overview />} />
                    <Route path="/bots" element={<Bots />} />
                    <Route path="/alerts" element={<Alerts />} />
                    <Route path="/scan" element={<Scan />} />
                    <Route path="*" element={<Navigate to="/overview" />} />
                  </Routes>
                </>
              ) : (
                <Routes>
                  <Route path="*" element={<Navigate to="/login" />} />
                  <Route path="/login" element={<Authentication />} />
                </Routes>
              )}
            </Flex>
          </Router>
        </ContextProvider>
      </ChakraProvider>
    </div>
  );
};
