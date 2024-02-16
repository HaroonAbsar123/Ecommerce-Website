import React, {useContext} from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { faChair, faCouch, faFire, faHourglass, faMattressPillow, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProductContext from '../Context/ProductContext';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ showSidebar, setShowSidebar }) {

    const {isUserLoggedIn} = useContext(ProductContext);
    const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setShowSidebar(open)
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['All Collections'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton  onClick={() => {
                navigate("/collection")
            }}>
              <ListItemIcon>
      <FontAwesomeIcon icon={faWarehouse} />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
              <Divider />

      <List style={{padding: '10px'}}>
        {["Hot Products", 'Armchairs', 'Sofas', 'Lamps', 'Cushions'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => {
              if(text=="Armchairs"){
                navigate("/collection/armchairs")
              } else if(text=="Sofas"){
                navigate("/collection/sofas")
              } else if(text=="Lamps"){
                navigate("/collection/lamps")
              } else if(text=="Cushions"){
                navigate("/collection/cushions")
              } else if(text=="Hot Products"){
                navigate("/collection/hot")
              }
            }}>

              <ListItemIcon>

              {text=="Hot Products" &&  
      <FontAwesomeIcon icon={faFire} />}
      
                {text=="Armchairs" &&  
      <FontAwesomeIcon icon={faChair} />}
      
      {text=="Sofas" &&  
      <FontAwesomeIcon icon={faCouch} />}
      
      {text=="Lamps" &&  
      <FontAwesomeIcon icon={faHourglass} />}
      
      {text=="Cushions" &&  
      <FontAwesomeIcon icon={faMattressPillow} />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Open Sidebar</Button>
      <SwipeableDrawer
        anchor={'right'}
        open={showSidebar}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
    </div>
  );
}
