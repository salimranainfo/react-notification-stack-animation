import { useState, useEffect, useRef } from "react";
// import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./App.css";

function Notification(props) {
  const { notification } = props;

  let backgroundColor = "";
  const notifDiv = useRef(null);

  useEffect(() => {
    if (notifDiv && notifDiv.current) {
      notifDiv.current.classList.add("notif-show");
    }
  }, []);

  switch (notification.type) {
    case "Danger":
      backgroundColor = "red";
      break;
    case "Success":
      backgroundColor = "green";
      break;
    default:
      backgroundColor = "lightblue";
      break;
  }

  function closeNotification() {
    props.onCloseNotification(notification);
  }

  return (
    <div
      ref={notifDiv}
      className="notification"
      style={{ backgroundColor: backgroundColor }}
    >
      {notification.message}

      <span className="notification-cross" onClick={closeNotification}>
        &times;
      </span>
    </div>
  );
}

export default Notification;
