import React, { useEffect, useState } from "react";
import styleCss from "../styles/style.module.css";
import Button from "@material-ui/core/Button";
import { pink } from "@material-ui/core/colors";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles, createTheme, ThemeProvider } from "@material-ui/core";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditIcon from "@material-ui/icons/Edit";

const styles = () => ({
  eachTask: {
    display: "flex",
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#8ecae6",
    gap: 10,
    borderRadius: 10,
    alignItems: "center",
    "&:hover": {
      backgroundColor: "#D4F1F4",
      transition: "all .4s escape",
      WebkitTransition: "all .4s ease",
      color: "black",
    },
  },
  labelTxt: {
    flex: 1,
  },
  completedTask: {
    backgroundColor: "#cccccc",
    color: "#666666",
    "&:hover": {
      backgroundColor: "#cccccc",
    },
  },
});

const pinkBtn = createTheme({
  palette: { secondary: pink },
});

function TaskItem(props) {
  const { data, classes, index, onEdit, onRemove, onComplete } = props;
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <li
      className={`${classes.eachTask} ${
        data.completed ? classes.completedTask : ""
      }`}
    >
      <label className={classes.labelTxt} onClick={onComplete}>
        {`${index + 1}) `}
        {data.name}
      </label>
      <Checkbox
        checked={data.completed}
        color="primary"
        onClick={onComplete}
        inputProps={{ "aria-label": "secondary checkbox" }}
      />
      <>
        {width < 800 ? (
          <EditIcon />
        ) : (
          <Button
            variant="outlined"
            color="primary"
            onClick={onEdit}
            className={styleCss.editBtn}
          >
            Edit
          </Button>
        )}
      </>
      <>
        {width < 800 ? (
          <DeleteOutlineOutlinedIcon onClick={onRemove} />
        ) : (
          <ThemeProvider theme={pinkBtn}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={onRemove}
              className={styleCss.removeBtn}
            >
              Remove
            </Button>
          </ThemeProvider>
        )}
      </>
    </li>
  );
}

export default withStyles(styles)(TaskItem);
