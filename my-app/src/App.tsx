import { Button, Layout } from "antd";
import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import { useAuth } from "./contexts/AuthContext";
import TaskPage from "./pages/TaskPage";

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated, navigate]);
  return (
    <Layout className="layout" style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="logo" style={{ color: "white", fontSize: "20px" }}>
          Insight Task List App
        </div>
        <div style={{}}>
          {!!isAuthenticated && (
            <Button
              style={{
                height: "40px",
                fontWeight: "500",
              }}
              type="primary"
              onClick={logout}
            >
              Logout
            </Button>
          )}
        </div>
      </Header>
      <Content style={{ padding: "0 50px", marginTop: "20px" }}>
        <Routes>
          <Route path="/login" element={<></>} />
          <Route path="/tasks" element={!!isAuthenticated && <TaskPage />} />
        </Routes>
        <div style={{ textAlign: "center", marginTop: "20vh" }}>
          {isAuthenticated ? <></> : <LoginForm />}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>Insight Task App ©2024</Footer>
    </Layout>
  );
};

export default App;
