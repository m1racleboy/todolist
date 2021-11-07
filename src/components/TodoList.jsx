import React from 'react';
import '../index.css';
import { List } from 'antd';
import TodoCard from './TodoCard';

export default function TodoList({ todos }) {
  return (
    <List
      grid={{
        gutter: 16,
      }}
      dataSource={todos}
      renderItem={todo => (
        <List.Item>
          <TodoCard todo={todo} />
        </List.Item>
      )}
    />
  )
};
