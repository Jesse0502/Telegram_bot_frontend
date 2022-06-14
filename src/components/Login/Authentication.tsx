import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

function Authentication() {
  const [isLogin, setLogin] = useState("login");
  if (isLogin === "login") {
    return <Login setLogin={setLogin} />;
  }
  return <Signup setLogin={setLogin} />;
}

export default Authentication;
