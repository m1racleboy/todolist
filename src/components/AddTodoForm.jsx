import React from 'react';
import moment from 'moment';
import { Button, Form, Input, Card } from "antd";
import { addTodo, editTodo } from '../store/actions/TodoActions';
import '../index.css';
import { useInput } from './../hooks/useInput';
import { error, success } from '../utils/common';
import { useDispatch, useSelector } from 'react-redux';
import { settings as settingsOnForm } from '../utils/const';

export default function AddTodoForm({ settings, ...props }) {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);
  const title = useInput(props.todo ? props.todo.title : '', { isEmpty: true, isOnlySpace: true, minLength: 5, maxLength: 40 })
  const message = useInput(props.todo ? props.todo.message : '', { isEmpty: true, isOnlySpace: true, minLength: 5, maxLength: 300 });

  const addTodoHandler = () => {
    if (todos.find(todo => todo.title.toLowerCase() === title.value.trim().toLowerCase())) {
      error('Тудушка с таким названием уже существует!');
      return;
    }
    dispatch(addTodo({
      id: moment().format('DDMMYYYYHHmmss'),
      title: title.value.trim(),
      message: message.value.trim(),
      complete: false,
      date: moment().format('ll'),
    }));
    title.onReset();
    message.onReset();
    success('Тудушка добавлена!');
  }

  const editTodoHandler = () => {
    if (todos.find(todo => todo.title.toLowerCase() === title.value.trim().toLowerCase() && todo.id != props.todo.id)) {
      error('Тудушка с таким названием уже существует!');
      return;
    }
    dispatch(editTodo({
      ...props.todo,
      title: title.value,
      message: message.value,
      isEditMode: !props.todo.isEditMode,
    }));
    success('Тудушка измненена!');
  }

  return (
    <Card
      style={{ minWidth: '350px', maxWidth: '400px', borderRadius: '10px', flexDirection: 'column', margin: '0 20px' }}
      title={settings.title + ' todo'}
    >
      <Form
        style={{ width: '100%' }}
        onFinish={settings.title === settingsOnForm.EDIT.title ? editTodoHandler : addTodoHandler}
      >
        <Form.Item
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
          label="* todo title:"
        >
          <Input
            value={title.value}
            onChange={e => title.onChange(e)}
            onBlur={e => title.onBlur(e)}
          />
          {(title.isDirty && title.isEmpty) && <div style={{ color: 'red' }}>* Поле не может быть пустым</div>}
          {(title.isDirty && title.minLengthError) && <div style={{ color: 'red' }}>* Слишком короткое название, осталось: {5 - title.value.length}</div>}
          {(title.isDirty && title.maxLengthError) && <div style={{ color: 'red' }}>* Слишком длинное название, удалите: {title.value.length - 40}</div>}
          {(title.isDirty && title.spaceError) && <div style={{ color: 'red' }}>* Поле не может содержать только пробелы</div>}
        </Form.Item>
        <Form.Item
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
          label="* todo message:"
        >
          <Input.TextArea
            rows={4}
            value={message.value}
            onChange={e => message.onChange(e)}
            onBlur={e => message.onBlur(e)}
          />
          {(message.isDirty && message.isEmpty) && <div style={{ color: 'red' }}>* Поле не может быть пустым</div>}
          {(message.isDirty && message.minLengthError) && <div style={{ color: 'red' }}>* Слишком короткая тудушка, осталось: {5 - message.value.length}</div>}
          {(message.isDirty && message.maxLengthError) && <div style={{ color: 'red' }}>* Слишком длинная тудушка, удалите: {message.value.length - 300}</div>}
          {(message.isDirty && message.spaceError) && <div style={{ color: 'red' }}>* Поле не может содержать только пробелы</div>}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            disabled={!title.inputValid || !message.inputValid}
          >
            {settings.button}
          </Button>
        </Form.Item>
      </Form >
    </Card>
  );
};
