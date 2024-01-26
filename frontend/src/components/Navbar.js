import React from 'react';
// import { Link } from 'react-router-dom';
import { Stack, AppBar, Toolbar, Typography, Button} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Navbar = () => {
  return (

	// 'sx' property allows for in-line style changes
	<AppBar position="static" sx={{backgroundColor: '#0E1C4C', minHeight: '4rem', justifyContent: 'center'}}>
		<Toolbar variant="dense">
			<div className="navbarTitle">
				<Typography variant="h2" color="inherit">
				Zot Support
				</Typography>
			</div>

			<Stack direction="row" spacing={4}>
				<Button href="/Discover" startIcon={<SearchIcon/>} sx={{color: 'white'}}>
					<Typography variant="h3" color="inherit">
					Discover
					</Typography>
				</Button>

				<Button href="/Notifications" startIcon={<NotificationsIcon/>} sx={{color: 'white'}}>
					<Typography variant="h3" color="inherit">
					Notifications
					</Typography>
				</Button>

				<Button href="/StudentDashboard" startIcon={<DashboardIcon/>} sx={{color: 'white'}}>
					<Typography variant="h3" color="inherit">
					Your dashboard
					</Typography>
				</Button>

				<Button endIcon={<ArrowDropDownIcon/>} sx={{color: 'white'}}>
					<img src="/images/placeholder.jpg" className="profileImg" alt="student profile"></img>
					<Typography variant="h3" color="inherit">
					Student Name
					</Typography>
				</Button>
			</Stack>
			
		</Toolbar>
	</AppBar>
  );
};

export default Navbar;