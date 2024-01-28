import React from 'react';
import NotificationTable from '../../components/NotificationTable';

const NotificationsPage = () => {
  return (
    <div className='pageContent'>

    	<div className="tableContainer">
    		<NotificationTable rowsPerPage={10}/>
    	</div>

    </div>
  );
};

export default NotificationsPage;