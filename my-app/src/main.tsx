import { GoogleOAuthProvider } from "@react-oauth/google";
import "antd/dist/reset.css";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";

ReactDOM.render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID ?? ""}>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </GoogleOAuthProvider>,
  document.getElementById("root")
);
