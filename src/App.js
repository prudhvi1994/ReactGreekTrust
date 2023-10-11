import "./App.css";
import React from "react";
import { Main } from "./Components/Main.js";

export const config = {
  endpoint:
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
};

function App() {
  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
