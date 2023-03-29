import React from "react";

export const IncompleteTodos = (props) => {
  const { todos, onClickComplete, onClickDelete } = props;
  return (
    <div className="incomplete-area">
      <p className="title">未完了のTODO</p>
      <ul>
        {todos.map((todo) => {
          return (
            <div key={todo.id} className="list-row">
              <li>{todo.title}</li>
              <button onClick={() => onClickComplete(todo)}>完了</button>
              <button onClick={() => onClickDelete(todo)}>削除</button>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
