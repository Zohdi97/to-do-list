import { useState, useEffect } from "react";
import EditTask from "./EditTask";
import classes from "./App.module.css";

function App() {
  const [inputValue, setInputValue] = useState({ id: null, task: "" });

  const [post, setPost] = useState("");
  const [edit, setEdit] = useState("");
  const [toDoList, setToDoList] = useState([]);
  const [showEdit, setShowEdit] = useState(false);

  const taskList = "http://localhost:4000/todolist";
  const loadToDoListData = async () => {
    const response = await fetch(taskList);
    const responseData = await response.json();
    setToDoList(responseData);
  };

  useEffect(() => {
    loadToDoListData();
  }, []);

  const addTaskHandler = async () => {
    const taskData = await fetch(taskList, {
      method: "POST",
      body: JSON.stringify({ task: post }),
      headers: { "content-type": "application/json" },
    });

    loadToDoListData();
  };

  const editTaskHandler = async () => {
    const editData = await fetch(
      `http://localhost:4000/todolist/${inputValue.id}`,
      {
        method: "PUT",
        body: JSON.stringify(inputValue),
        headers: { "content-type": "application/json" },
      }
    );
    const resData = await editData.json();
    console.log(resData);
    loadToDoListData();
    setShowEdit(false);
  };

  const deleteTaskHandler = async (id) => {
    const removeData = await fetch(`http://localhost:4000/todolist/${id}`, {
      method: "DELETE",
    });
    loadToDoListData();
  };

  const onEdit = async (item) => {
    setInputValue(item);
    setShowEdit(true);
  };

  return (
    <div className={classes.app}>
      {showEdit && (
        <EditTask
          item={inputValue}
          onCancel={() => {
            setShowEdit(false);
          }}
          onEdit={onEdit}
          setInputValue={setInputValue}
          onSave={editTaskHandler}
        />
      )}
      <div className={classes.task}>
        <input
          type="text"
          placeholder="Type your task"
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />
        <button onClick={addTaskHandler}>Add Task</button>
      </div>
      <div className={classes["task-list"]}>
        {toDoList.map((item) => {
          return (
            <div className={classes["new-task"]} key={item.id}>
              <p>{item.task}</p>
              <div className={classes["task-options"]}>
                <button
                  className={classes.edit}
                  onClick={() => {
                    onEdit(item);
                  }}
                >
                  Edit
                </button>
                <button
                  className={classes.delete}
                  onClick={() => deleteTaskHandler(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
