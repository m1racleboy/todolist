import React from 'react';
import './index.css';
import { Layout, Empty, BackTop } from 'antd';
import { useSelector } from 'react-redux';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import { settings } from './utils/const';

const styles = {
  content: {
    padding: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  up: {
    height: 40,
    width: 40,
    lineHeight: '40px',
    borderRadius: 4,
    backgroundColor: '#1088e9',
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
  },
};

export default function App() {
  const todos = useSelector(state => state.todos);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Content style={styles.content}>
        {todos.length !== 0
          ? <>
            <AddTodoForm
              settings={settings.CREATE}
            />
            <TodoList todos={todos} />
          </>
          : <Empty
            style={{ margin: 'auto' }}
            image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
            imageStyle={{
              height: 60,
            }}
            description={
              <span>
                Not a single task ... It's time to create it!
              </span>
            }
          >
            <AddTodoForm settings={settings.CREATE} />
          </Empty>
        }
        <BackTop>
          <div style={styles.up}>UP</div>
        </BackTop>
      </Layout.Content>
    </Layout>
  );
}
