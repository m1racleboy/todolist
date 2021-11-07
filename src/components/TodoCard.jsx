import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { Card, Button, Checkbox, Tag, DatePicker } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, } from '@ant-design/icons';
import '../index.css';
import { changeEditMode, changeTodoStatus, deleteTodo } from '../store/actions/TodoActions';
import { success } from '../utils/common';
import { settings } from '../utils/const';
import AddTodoForm from './AddTodoForm';

export default function TodoCard({ todo }) {
  const dispatch = useDispatch();
  const customFormat = value => `Created: ${value.format('ll')}`;
  const [complete, setComplete] = useState(todo.isComplete);

  const deleteTodoHandler = () => {
    dispatch(deleteTodo(todo.id))
    success('Тудушка удалена!');
  };

  const changeModeHandler = () => dispatch(changeEditMode(todo));

  useEffect(() => {
    dispatch(changeTodoStatus({
      ...todo,
      isComplete: complete,
    }));
  }, [complete]);

  return (
    todo.isEditMode
      ? <AddTodoForm
        settings={settings.EDIT}
        todo={todo}
      />
      : <Card
        style={{ minWidth: '350px', maxWidth: '400px', borderRadius: '10px', flexDirection: 'column', textAlign: 'center' }}
        title={todo.title}
      >
        <div style={{ wordBreak: 'break-all', marginBottom: '10px', textAlign: 'start' }}>{todo.message}</div>
        <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <DatePicker defaultValue={moment(todo.date, 'll')} format={customFormat} disabled />
          <Checkbox onChange={() => setComplete(!complete)} checked={complete}>
            {todo.isComplete
              ? <Tag icon={<CheckCircleOutlined />} color="success">
                complete
              </Tag>
              : <Tag icon={<CloseCircleOutlined />} color="error">
                not complete
              </Tag>
            }
          </Checkbox>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            style={{ width: '40%' }}
            type='primary'
            onClick={changeModeHandler}
          >
            Edit
          </Button>
          <Button
            style={{ width: '40%' }}
            type='primary'
            danger
            onClick={deleteTodoHandler}
          >Delete</Button>
        </div>
      </Card >
  )
};
