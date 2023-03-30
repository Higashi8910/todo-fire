import React, { useEffect, useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";
import { EditTodoDialog } from "/project/todo-fire/src/components";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import db from "./firebase";

export const App = () => {
  //const [変数名, 変数に値を設定する関数]
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  // 状態を追加
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    const getTodosFromFirestore = async () => {
      const todoCollection = collection(db, "todos");
      const todoSnapshot = await getDocs(todoCollection);
      const todoList = todoSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setIncompleteTodos(todoList.filter((todo) => !todo.complete));
      setCompleteTodos(todoList.filter((todo) => todo.complete));
    };

    getTodosFromFirestore();
  }, []);

  //入力した値が変化したときにリアルタイムでテキストボックスに代入する用
  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickAdd = async (text, startDate, endDate, priority) => {
    if (text === "") return;
    const newTodo = {
      title: text,
      complete: false,
      startDate: startDate.toISOString().substring(0, 10),
      endDate: endDate.toISOString().substring(0, 10),
      priority: priority,
    };
    await addDoc(collection(db, "todos"), newTodo);
    const todoSnapshot = await getDocs(collection(db, "todos"));
    const todoList = todoSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setIncompleteTodos(todoList.filter((todo) => !todo.complete));
    setCompleteTodos(todoList.filter((todo) => todo.complete));
  };

  // 編集機能を実装
  const onClickEdit = (todo) => {
    setEditingTodo(todo);
  };

  const onSubmitEdit = async (updatedTodo) => {
    const todoId = updatedTodo.id;
    await updateDoc(doc(db, "todos", todoId), {
      title: updatedTodo.title,
      startDate: updatedTodo.startDate,
      endDate: updatedTodo.endDate,
      priority: updatedTodo.priority,
    });
    const newTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return updatedTodo;
      }
      return todo;
    });
    setTodos(newTodos);
    setEditingTodo(null);
  };
  const onCloseEditDialog = () => {
    setEditingTodo(null);
  };

  const onClickDelete = async (todo) => {
    const todoId = todo.id;
    await deleteDoc(doc(db, "todos", todoId));
    const newIncompleteTodos = incompleteTodos.filter(
      (incompleteTodo) => incompleteTodo.id !== todoId
    );
    const newCompleteTodos = completeTodos.filter(
      (completeTodo) => completeTodo.id !== todoId
    );
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  const onClickComplete = async (todo) => {
    const todoId = todo.id;
    await updateDoc(doc(db, "todos", todoId), { complete: true });
    const newIncompleteTodos = incompleteTodos.filter(
      (incompleteTodo) => incompleteTodo.id !== todoId
    );
    todo.complete = true;
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos([...completeTodos, todo]);
  };

  const onClickBack = async (todo) => {
    const todoId = todo.id;
    await updateDoc(doc(db, "todos", todoId), { complete: false });
    const newCompleteTodos = completeTodos.filter(
      (completeTodo) => completeTodo.id !== todoId
    );
    todo.complete = false;
    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos([...incompleteTodos, todo]);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
        setTodoText={setTodoText}
      />
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>登録ができるtodoは5個までです。</p>
      )}
      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickEdit={onClickEdit}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
      {editingTodo && (
        <EditTodoDialog
          todo={editingTodo}
          onSubmit={onSubmitEdit}
          onClose={onCloseEditDialog}
        />
      )}
    </>
  );
};
