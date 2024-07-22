import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";

const TaskForm: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: { title: string }) => {
    setLoading(true);
    axios
      .post("http://localhost:3001/todo", values)
      .then(() => {
        message.success("Task created successfully");
        form.resetFields();
      })
      .catch(() => message.error("Failed to create task"))
      .finally(() => setLoading(false));
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="inline"
      style={{ marginBottom: "24px" }}
    >
      <Form.Item
        name="title"
        rules={[{ required: true, message: "Please input the task title!" }]}
      >
        <Input placeholder="Task text" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Add Task
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
