import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const EditTodoDialog = ({ todo, onSubmit, onClose }) => {
  const [title, setTitle] = useState(todo.title);
  const [startDate, setStartDate] = useState(new Date(todo.startDate));
  const [endDate, setEndDate] = useState(new Date(todo.endDate));
  const [priority, setPriority] = useState(todo.priority);

  const handleSubmit = () => {
    onSubmit({ ...todo, title, startDate, endDate, priority });
    onClose();
  };

  return (
    <div className="dialog">
      <input
        placeholder="TODOを入力"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <div>
        <label>開始日：</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </div>
      <div>
        <label>終了日：</label>
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
      </div>
      <div>
        <label>優先度：</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="小">小</option>
          <option value="中">中</option>
          <option value="大">大</option>
        </select>
      </div>
      <button onClick={handleSubmit}>変更</button>
      <button onClick={onClose}>キャンセル</button>
    </div>
  );
};
