import { Layout } from "antd";
import React from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { useAuth } from "../contexts/AuthContext";

const TaskPage: React.FC = () => {
  const { user } = useAuth();
  const { Content } = Layout;

  return (
    <Layout>
      <Content
        style={{ padding: "24px", background: "#fff", minHeight: "80vh" }}
      >
        <h2>Welcome {user?.name}</h2>
        <TaskForm />
        <TaskList />
      </Content>
    </Layout>
  );
};

export default TaskPage;
