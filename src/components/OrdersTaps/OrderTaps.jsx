import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './orderTabs.css'
import FormBill from '../FormsOrder/FormBill';
import FormBalance from '../FormsOrder/FormBalance';
import { createTheme, ThemeProvider } from '@mui/material';
import AppsForm from '../FormsOrder/AppsForm';
import { useEffect, useState } from 'react';
import { baseUrl } from '../../constants/baseUrl';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import axios from 'axios';
import KaziehForm from '../FormsOrder/KaziehForm';

const theme = createTheme({
  components: {
    MuiTabs: {
      styleOverrides: {
        indicator: {
          display: 'none', // Hides the underline indicator
        },
      },
    },
  },
});
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function OrderTabs({ fetchData, balance }) {

  const [value, setValue] = useState(0);
  const [setting, setSetting] = useState();

  const id = JSON.parse(localStorage.getItem("user")).id
  const handleChange = (event, newValue) => {
    setValue(newValue);
    
  };

  const fetchOptions = async () => {
        try {
            const res = await axios.get(`${baseUrl}users/options/${id}`, {
                headers: {
                    "Accept": "application/json",
                    Authorization: `Bearer ${Cookies.get('token')}`,
                }
            });
            setSetting(res.data);
        } catch (e) {
            console.log(e);
            toast.error("فشل في جلب البيانات");
        }
    };

    useEffect(() => {
        fetchOptions();
    }, []);


  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.paper', width: 500 }}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >

            {setting?.mobile == true && <Tab label="رصيد" {...a11yProps(0)} />}
            <Tab label="فاتورة" {...a11yProps(1)} />
            {setting?.application == true && <Tab label="تطبيقات" {...a11yProps(2)} />}
            {setting?.kazieh == true && <Tab label="كازية" {...a11yProps(3)} />}
          </Tabs>
        </AppBar>

        <TabPanel value={value} index={0} dir="rtl">
          <FormBalance fetchData={fetchData} balance={balance} />
        </TabPanel>
        <TabPanel value={value} index={1} dir="rtl">
          <FormBill setting={setting} balance={balance} fetchData={fetchData} />
        </TabPanel>
        <TabPanel value={value} index={2} dir="rtl">
          <AppsForm />
        </TabPanel>
        <TabPanel value={value} index={3} dir="rtl">
          <KaziehForm fetchData={fetchData} balance={balance} />
        </TabPanel>

      </Box>
    </ThemeProvider>
  );
}

