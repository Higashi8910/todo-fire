import { useState } from "react";

const style = {
  backgroundColor: "#c1ffff",
  width: "400px",
  height: "30px",
  borderRadius: "8px",
  padding: "8px",
  margin: "8px",
};

const Dialog = (props) => {
  const [dialogText, setDialogText] = useState(props.initialText);

  const onChangeDialogText = (event) => setDialogText(event.target.value);

  const onClickDialogAdd = () => {
    if (dialogText === "") return;
    props.onClick(dialogText);
    setDialogText("");
    props.onClose();
  };

  return (
    <div className="dialog">
      <input
        placeholder="TODOを入力"
        value={dialogText}
        onChange={onChangeDialogText}
      />
      <button onClick={onClickDialogAdd}>追加</button>
      <button onClick={props.onClose}>キャンセル</button>
    </div>
  );
};

export const InputTodo = (props) => {
  const { todoText, setTodoText, onClick, disabled } = props;
  const [dialogOpen, setDialogOpen] = useState(false);

  const onClickAdd = (text) => {
    props.onClick(text);
    props.setTodoText("");
    setDialogOpen(false);
  };

  return (
    <div style={style}>
      {dialogOpen && (
        <Dialog
          onClick={onClickAdd}
          onClose={() => setDialogOpen(false)}
          initialText={todoText}
        />
      )}
      <input
        disabled={disabled}
        placeholder="TODOを入力"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
      />
      {!dialogOpen && (
        <button
          disabled={disabled || !todoText}
          onClick={() => setDialogOpen(true)}
        >
          追加
        </button>
      )}
    </div>
  );
};
