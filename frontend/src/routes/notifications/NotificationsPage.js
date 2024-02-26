import React from "react";
import { useContext, useEffect } from "react";
import NotificationTable from "../../components/NotificationTable";
import axios from "axios";
import { useState } from "react";
import UserContext from "../../user/UserContext";

const NotificationsPage = () => {
    const userData = useContext(UserContext);

    // Get the user's notifications
    const [notifications, setNotifications] = useState();
    useEffect(() => {
        const getNotifications = async () => {
            const res = await axios
                .get(
                    `http://localhost:3001/notifications/:${userData.ucinetid}`
                )
                .catch((err) => console.log(err));
            setNotifications(res.data);
        };
        getNotifications();
    }, [userData]);

    return (
        <div className="pageContent">
            {notifications && (
                <div className="tableContainer">
                    <NotificationTable rowsPerPage={10} data={notifications} />
                </div>
            )}
        </div>
    );
};

export default NotificationsPage;
