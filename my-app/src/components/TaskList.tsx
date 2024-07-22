// src/components/TaskList.tsx
import React, { useEffect, useState } from "react";
import { List, Button, Checkbox, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import axiosInstance from "../services/axiosInstance";

interface Task {
  id: number;
  text: string;
  checked: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    axiosInstance
      .get("http://localhost:3001/todo")
      .then((response) => setTasks(response.data))
      .catch(() => message.error("Failed to fetch tasks"));
  }, []);

  const handleMarkAsDone = (task: Task) => {
    axiosInstance
      .patch(`http://localhost:3001/todo/${task.id}`, { checked: !task.checked })
      .then(() => {
        setTasks((prevTasks) =>
          prevTasks.map((t) =>
            t.id === task.id ? { ...t, checked: !t.checked } : t
          )
        );
        message.success("Task updated successfully");
      })
      .catch(() => message.error("Failed to update task"));
  };

  const handleDeleteTask = (taskId: number) => {
    axiosInstance
      .delete(`http://localhost:3001/todo/${taskId}`)
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId));
        message.success("Task deleted successfully");
      })
      .catch(() => message.error("Failed to delete task"));
  };

  return (
    <List
      itemLayout="horizontal"
      dataSource={tasks}
      renderItem={(task) => (
        <List.Item
          actions={[
            <Checkbox
              checked={task.checked}
              onChange={() => handleMarkAsDone(task)}
            >
              Done
            </Checkbox>,
            <Button icon={<EditOutlined />} />,
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteTask(task.id)}
            />,
          ]}
        >
          <List.Item.Meta
            title={task.text}
            style={{ textDecoration: task.checked ? "line-through" : "none" }}
          />
        </List.Item>
      )}
    />
  );
};

export default TaskList;
