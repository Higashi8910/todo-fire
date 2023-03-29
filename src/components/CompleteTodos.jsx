import React from "react";

export const CompleteTodos = (props) => {
  const { todos, onClickBack } = props;
  return (
    <div className="complete-area">
      <p className="title">完了のTODO</p>
      <ul>
        {todos.map((todo) => {
          return (
            <div key={todo.id} className="list-row">
              <li>{todo.title}</li>
              <button onClick={() => onClickBack(todo)}>戻す</button>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
