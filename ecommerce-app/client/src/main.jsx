import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth.jsx";
import { Toaster } from "react-hot-toast";
// import { SearchProvider } from "./context/search"; 
import {SearchProvider } from "./context/search.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <SearchProvider>
      <App />
      <Toaster />
      </SearchProvider>
     </AuthProvider>
  </BrowserRouter>
);
