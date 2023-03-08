import classes from "./EditTask.module.css";

const EditTask = (props) => {
  return (
    <div className={classes.edit}>
      <div className={classes["edit-task"]}>
        <input
          type="text"
          placeholder="Type your editing"
          value={props.item.task}
          onChange={(e) =>
            props.setInputValue({ id: props.item.id, task: e.target.value })
          }
        />
        <div className={classes["edit-options"]}>
          <button className={classes.save} onClick={props.onSave}>
            Save
          </button>
          <button className={classes.cancel} onClick={props.onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
