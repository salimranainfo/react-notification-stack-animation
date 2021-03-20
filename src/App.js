import { useRef, useState, useEffect } from "react";
import Notification from "./Notification";

import "./App.css";

function App() {
  const motifDiv = useRef(null);
  const [notifications, setNotifications] = useState([]);
  const [notification, setNotification] = useState({
    message: "",
    type: "Success",
  });

  useEffect(() => {
    if (motifDiv && motifDiv.current) {
      motifDiv.current.classList.add("notif-move-down");
    }
  }, [JSON.stringify(notifications)]);

  const hanldeClick = (e) => {
    e.preventDefault();

    if (notification.message && notification.type) {
      setNotifications([...notifications, notification]);
    }

    setNotification({ message: "", type: "Primary" });
  };

  function handleCloseNotification(notification) {
    setNotifications(() => {
      return notifications.filter((notif, i) => {
        return notifications.indexOf(notification) !== i;
      });
    });
  }

  return (
    <>
      <div className="App">
        <div className="notification-container">
          {notifications.length > 0 &&
            notifications.map((notif, i) => {
              return (
                <div ref={motifDiv} className="notification-wrapper">
                  <Notification
                    className="test"
                    key={i}
                    notification={notif}
                    onCloseNotification={handleCloseNotification}
                  />
                </div>
              );
            })}
        </div>

        <div className="form">
          <input
            id="message"
            value={notification.message}
            onChange={(e) =>
              setNotification({ ...notification, message: e.target.value })
            }
            type="text"
          />
          <select
            id="type"
            type="text"
            value={notification.type}
            onChange={(e) =>
              setNotification({ ...notification, type: e.target.value })
            }
          >
            <option>Danger</option>
            <option>Primary</option>
            <option>Success</option>
          </select>
          <button onClick={hanldeClick}>Add Notification</button>
        </div>
      </div>
    </>
  );
}

export default App;
