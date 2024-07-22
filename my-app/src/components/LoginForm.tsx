import React from "react";
import { Button, Typography } from "antd";
import { useAuth } from "../contexts/AuthContext";

const { Title } = Typography;

const LoginForm: React.FC = () => {
  const { login } = useAuth();

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
      }}
    >
      <Title level={3}>Login through OAuth</Title>
      <Button style={{ height: "45px", fontWeight: "500" }} type="primary" onClick={login}>
        Login with Google
      </Button>
    </div>
  );
};

export default LoginForm;
