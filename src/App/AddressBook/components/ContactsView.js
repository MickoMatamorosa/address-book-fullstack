import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import ContactItem from './ContactItem';
import TblHeader from './TblHeader';
import CreateGroup from './CreateGroup'
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ContactsView(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="group tabs">
          <Tab label="All Contacts" {...a11yProps(0)} />
          <Tab label="Groups" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      {
        props.loading
        ? ( <Grid container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <CircularProgress />
              <Typography variant="h1">
                Loading...
              </Typography>
            </Grid>)
        : (<Table>
            <TblHeader 
              sort={props.sort} 
              sortFn={props.sortFn}
            />
            <TableBody>
              { props.contacts.map(contact => {
                  return <ContactItem 
                    key={contact.id}
                    contact={contact}
                    updateBtn={props.updateBtn}
                    deleteBtn={props.deleteBtn}
                  />
                })
              }
            </TableBody>
          </Table>
        )
      }
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CreateGroup/>
      </TabPanel>
    </div>
  );
}