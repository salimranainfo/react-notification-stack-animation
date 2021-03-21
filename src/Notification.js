import { useEffect, useRef } from "react";
// import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./App.css";

function Notification(props) {
  const { notification, permanent } = props;

  let backgroundColor = "";
  const notifDiv = useRef(null);

  useEffect(() => {
    if (notifDiv && notifDiv.current) {
      notifDiv.current.classList.add("notif-show");

      if (permanent) {
        setTimeout(() => {
          closeNotification();
        }, 8000);
      }
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
    notifDiv.current.style.opacity = 0;
    notifDiv.current.style.transform = "scale(0)";

    setTimeout(() => {
      props.onCloseNotification(notification);
    }, 300);
  }

  return (
    <>
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
    </>
  );
}

export default Notification;
