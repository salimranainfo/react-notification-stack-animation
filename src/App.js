import { useRef, useState, useEffect } from "react";
import Notification from "./Notification";

import "./App.css";

function App() {
  const notifDiv = useRef(null);
  const [notifications, setNotifications] = useState([]);
  const [notification, setNotification] = useState({
    message: "",
    type: "Success",
  });

  useEffect(() => {
    if (notifDiv && notifDiv.current) {
      notifDiv.current.classList.add("notif-move-down");
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
    const container = document.getElementById(
      notifications.indexOf(notification)
    );

    container.classList.remove("notif-move-down");
  }

  return (
    <>
      <div className="App">
        {/* Display Notifications */}
        <div className="notification-container">
          {notifications.length > 0 &&
            notifications.map((notif, i) => {
              return (
                <div
                  id={i}
                  ref={notifDiv}
                  key={i}
                  className="notification-wrapper"
                >
                  <Notification
                    className="test"
                    notification={notif}
                    permanent={false}
                    onCloseNotification={handleCloseNotification}
                  />
                </div>
              );
            })}
        </div>

        {/* Input Section */}
        <div className="form">
          <input
            value={notification.message}
            onChange={(e) =>
              setNotification({ ...notification, message: e.target.value })
            }
            type="text"
          />
          <select
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
