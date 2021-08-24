import styleCss from "./styles/style.module.css";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TaskItem from "./components/TaskItem";
import EditDialog from "./components/dialogs/EditDialog";
import RemoveDialog from "./components/dialogs/RemoveDialog";
import Button from "@material-ui/core/Button";
import Input from "./components/Input";
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  addBtn: {
    width: "11%",
    marginLeft: 8,
    backgroundColor: "#75e6da",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#8ecae6",
      transition: "all .4s escape",
      WebkitTransition: "all .4s ease",
      color: "black",
    },
  },
});

function App(props) {
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [filteredTaskList, setfilteredTaskList] = useState([]);
  const [editedItem, setEditedItem] = useState(null);
  const [removedItem, setRemovedItem] = useState(null);
  const [taskStatus, setRemaining] = useState({ completed: 0, remaining: 0 });

  // Effects place
  useEffect(() => {
    let compl = 0;
    let rem = filteredTaskList.reduce((reducer, item) => {
      if (item) {
        if (item.completed) {
          compl += 1;
        }
        return (reducer += 1);
      }
      return reducer;
    }, 0);

    setRemaining({ remaining: rem - compl, completed: compl });
  }, [setTaskList, taskList, searchValue, filteredTaskList]);

  useEffect(() => {
    setfilteredTaskList(
      taskList.filter((item) => item.name.includes(searchValue))
    );
  }, [setfilteredTaskList, taskList, searchValue]);
  // Effects place

  const { addBtn } = props.classes;
  const onInputChange = (evn) => setInputValue(evn.target.value);
  const onSeachChange = (evn) => setSearchValue(evn.target.value);
  const onAdd = () => {
    const value = inputValue.trim();
    if (value) {
      const ifExists = filteredTaskList.find((item) => item.name === value);
      if (!!ifExists) {
        return alert("You already have that task in your list");
      }
      const newTaskItem = {
        id: uuidv4(),
        name: value,
        completed: false,
      };
      setTaskList((prevTaskList) => [...prevTaskList, newTaskItem]);
      setInputValue("");
    }
  };
  const onEnterAdd = (evn) => {
    if (evn.keyCode === 13) onAdd();
  };
  const onComplete = (completedTask) => {
    const newTaskList = taskList.map((item) => {
      if (item.id === completedTask.id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setTaskList(newTaskList);
  };
  const onEdit = (editedTask) => {
    const editedItem = taskList.find((item) => item.id === editedTask.id);
    setEditedItem(editedItem);
  };
  const onEditSave = (newName) => {
    const newTaskList = taskList.map((item) => {
      if (item.id === editedItem.id) {
        return { ...item, name: newName };
      }
      return item;
    });
    setTaskList(newTaskList);
    onEditClose();
  };
  const onEditClose = () => setEditedItem(null);
  const onRemove = (removedItem) => {
    setRemovedItem(removedItem);
  };
  const onRemoveYes = (bool) => {
    console.log(bool);
    typeof bool === "object"
      ? setTaskList(taskList.filter((item) => item.id !== removedItem.id))
      : setTaskList([]);
    setRemovedItem(null);
  };
  const onRemoveNo = () => {
    setRemovedItem(null);
  };
  const removeAll = () => {
    setRemovedItem(true);
  };
  const renderTaskList = () => {
    return filteredTaskList.map((item, index) => (
      <TaskItem
        key={item.id}
        data={item}
        index={index}
        onComplete={() => {
          onComplete(item);
        }}
        onEdit={() => onEdit(item)}
        onRemove={() => onRemove(item)}
      />
    ));
  };
  return (
    <div className={styleCss.mainDiv}>
      <div className={styleCss.searchBar}>
        <Input onSeachChange={onSeachChange} searchValue={searchValue} />
      </div>
      <div className={styleCss.crTask}>
        <input
          className={styleCss.addInput}
          type="text"
          value={inputValue}
          onChange={onInputChange}
          onKeyDown={onEnterAdd}
          autoFocus={true}
        />
        <Button variant="contained" onClick={onAdd} className={addBtn}>
          Add task
        </Button>
      </div>
      <ul className={styleCss.taskList}>{renderTaskList()}</ul>
      <div className={styleCss.completed__status}>
        <p>
          {taskStatus?.completed || 0} COMPLETED / {taskStatus?.remaining || 0}{" "}
          REMAINING
        </p>
        <Button
          variant="outlined"
          color="secondary"
          onClick={removeAll}
          className={styleCss.editBtn}
          disabled={!taskList.length && true}
        >
          REMOVE ALL TASKS
        </Button>
      </div>

      {!!editedItem && (
        <EditDialog
          onEditSave={onEditSave}
          onEditClose={onEditClose}
          data={editedItem}
        />
      )}
      {!!removedItem && (
        <RemoveDialog
          data={removedItem}
          onRemoveYes={onRemoveYes}
          onRemoveNo={onRemoveNo}
          onAllRemove={removeAll}
        />
      )}
    </div>
  );
}

export default withStyles(styles)(App);
