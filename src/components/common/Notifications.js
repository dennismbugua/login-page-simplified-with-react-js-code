import React, { useEffect, useState, useRef } from "react";
import { Alert } from "reactstrap";

import "../../style/notifications.css";

const Notifications = ({ notifications }) => {
  const [visible, setVisible] = useState(false);
  const timesRendering = useRef(1);

  const onDismiss = () => setVisible(false);

  useEffect(() => {
    if (timesRendering.current !== 1) {
      setVisible(true);
    }
    timesRendering.current++;
  }, [notifications]);

  useEffect(() => {
    const notificationTimeOut = setTimeout(() => {
      if (visible) {
        setVisible(false);
      }
    }, 3000);
    return () => {
      clearTimeout(notificationTimeOut);
    };
  }, [visible]);

  return (
    <div className="notification">
      <Alert
        color={(notifications?.status ?? 200) === 200 ? "info" : "danger"}
        isOpen={visible}
        toggle={onDismiss}
      >
        {notifications?.message ?? ""}
      </Alert>
    </div>
  );
};

export default Notifications;
