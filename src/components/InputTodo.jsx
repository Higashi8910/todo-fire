import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import godImage from "/project/todo-fire/src/components/godImage.png";
import { useForm } from "react-hook-form";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

import "react-datepicker/dist/react-datepicker.css";

const style = {
  backgroundColor: "#c1ffff",
  width: "800px",
  height: "30px",
  borderRadius: "8px",
  padding: "8px",
  margin: "8px",
};

const inputStyle = {
  width: "87%", // ここで入力ボックスの幅を設定
};

const Dialog = (props) => {
  // const [dialogText, setDialogText] = useState(props.initialText);
  // useEffect(() => {
  //   setDialogText(props.initialText);
  // }, [props.initialText]);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  // const [priority, setPriority] = useState("小");
  const [count, setCount] = useState(0);
  const [showImage, setShowImage] = useState(false);

  const maxLength = 20;
  const priorityOptions = [
    { value: "小", label: "小" },
    { value: "中", label: "中" },
    { value: "大", label: "大" },
  ];
  const [selectedPriority, setSelectedPriority] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    setError,
  } = useForm();

  const onSubmit = (data) => {
    if (startDate > endDate) {
      setError("endDate", { type: "invalid" });
      return;
    }

    if (data.existingTodoTexts.includes(data.dialogText)) {
      setError("dialogText", { type: "duplicate" });
      return;
    }

    if (!selectedPriority) {
      setError("priority", { type: "required" });
      return;
    }

    console.log(data);
    if (data.dialogText === "god") {
      setShowImage(true);
      return;
    }
    // await new Promise((resolve) => setTimeout(resolve, 0));
    props.onClick(data.dialogText, startDate, endDate, selectedPriority.value);
    props.onClose();
  };

  // const onChangeDialogText = (event) => setDialogText(event.target.value);

  // const onClickDialogAdd = () => {
  //   if (dialogText === "god") {
  //     setCount(count + 1);
  //     if (count + 1 >= 10) {
  //       setShowImage(true);
  //     }
  //     return;
  //   }
  //   props.onClick(dialogText, startDate, endDate, priority);
  //   setDialogText("");
  //   props.onClose();
  // };

  useEffect(() => {
    register("startDate");
    register("endDate");
    register("priority", { required: true });
  }, [register]);

  useEffect(() => {
    if (props.incompleteTodos) {
      const todoTexts = props.incompleteTodos.map((todo) => todo.title);
      setValue("existingTodoTexts", todoTexts);
    }
  }, [props.incompleteTodos, setValue]);

  return (
    <div className="dialog">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="TODOを入力"
          {...register("dialogText", { required: true, maxLength: maxLength })}
          defaultValue={props.initialText}
        />
        {errors &&
          errors.dialogText &&
          errors.dialogText.type === "required" && (
            <p style={{ color: "red" }}>入力が必要です。</p>
          )}
        {errors &&
          errors.dialogText &&
          errors.dialogText.type === "maxLength" && (
            <p style={{ color: "red" }}>入力は20字以内でお願いします。</p>
          )}
        {errors &&
          errors.dialogText &&
          errors.dialogText.type === "duplicate" && (
            <p style={{ color: "red" }}>このTodoは既に存在します。</p>
          )}
        <div>
          <label>開始日：</label>
          <DatePicker
            selected={startDate}
            maxDate={endDate}
            onChange={(date) => {
              setStartDate(date);
              setValue("startDate", date);
            }}
          />
        </div>
        <div>
          <label>終了日：</label>
          <DatePicker
            selected={endDate}
            minDate={startDate}
            onChange={(date) => {
              setEndDate(date);
              setValue("endDate", date);
            }}
          />
        </div>
        {errors && errors.endDate && errors.endDate.type === "invalid" && (
          <p style={{ color: "red" }}>
            終了日は開始日以降の日付を選択してください。
          </p>
        )}
        <div>
          <label>優先度：</label>
          <CreatableSelect
            options={priorityOptions}
            value={selectedPriority}
            onChange={(option) => {
              setSelectedPriority(option);
              setValue("priority", option ? option.value : null);
            }}
          />
        </div>
        {errors && errors.priority && errors.priority.type === "required" && (
          <p style={{ color: "red" }}>優先度を選択してください。</p>
        )}
        <button type="submit">追加</button>
        <button type="button" onClick={props.onClose}>
          キャンセル
        </button>
      </form>
      {showImage && <img src={godImage} alt="God Image" />}
    </div>
  );
};

export const InputTodo = (props) => {
  const { todoText, setTodoText, onClick, disabled, incompleteTodos } = props;
  const [dialogOpen, setDialogOpen] = useState(false);

  const onClickAdd = (text, startDate, endDate, priority) => {
    props.onClick(text, startDate, endDate, priority);
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
          incompleteTodos={incompleteTodos}
        />
      )}
      <input
        disabled={disabled}
        placeholder="TODOを入力"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        style={inputStyle}
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
