import React from "react";

export const IncompleteTodos = (props) => {
  const { todos, onClickComplete, onClickDelete } = props;

  // 開始日が早い順にソート
  const sortedTodos = todos.slice().sort((a, b) => {
    return new Date(a.startDate) - new Date(b.startDate);
  });
  return (
    <div className="incomplete-area">
      <p className="title">未完了のTODO</p>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>TODO名</th>
            <th>開始日</th>
            <th>終了日</th>
            <th>優先度</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {sortedTodos.map((todo, index) => {
            return (
              <tr key={todo.id}>
                <td>{index + 1}</td>
                <td>{todo.title}</td>
                <td>{todo.startDate}</td>
                <td>{todo.endDate}</td>
                <td>{todo.priority}</td>
                <td>
                  <button onClick={() => onClickComplete(todo)}>完了</button>
                  <button>編集</button>
                  <button onClick={() => onClickDelete(todo)}>削除</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
