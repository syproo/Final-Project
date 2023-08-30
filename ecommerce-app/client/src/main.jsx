import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth.jsx";
import { Toaster } from "react-hot-toast";
import { SearchProvider } from "./context/search"
import { CartProvider } from "./context/Cart"


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <SearchProvider>
        <CartProvider>
          <App />
          <Toaster />
        </CartProvider>
      </SearchProvider>
    </AuthProvider>
  </BrowserRouter>
);
