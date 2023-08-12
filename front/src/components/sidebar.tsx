import React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store'; 
import { toggleSidebar } from '../redux/sidebarSlice';

const Sidebar = () => {
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);
  const dispatch = useDispatch();

  const toggleSidebarOpen = () => {
    dispatch(toggleSidebar());
  };

  return (
    <SwipeableDrawer
      anchor='left'
      open={isSidebarOpen}
      onClose={toggleSidebarOpen}
      onOpen={toggleSidebarOpen}
    >
      
      <List className={`test ${darkMode ? 'dark' : ''}`}>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItemButton key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        ))}
      </List>
    </SwipeableDrawer>
  );
};

export default Sidebar;
