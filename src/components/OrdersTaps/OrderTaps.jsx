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
import { CircularProgress, createTheme, ThemeProvider } from '@mui/material';
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
  const [isLoading, setIsLoading] = useState(false)

  const id = JSON.parse(localStorage.getItem("user")).id
  const handleChange = (event, newValue) => {
    setValue(newValue);

  };

  const fetchOptions = async () => {
    setIsLoading(true)
    try {
      const res = await axios.get(`${baseUrl}users/options/${id}`, {
        headers: {
          "Accept": "application/json",
          Authorization: `Bearer ${Cookies.get('token')}`,
        }
      });
      setSetting(res.data);
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
      toast.error("فشل في جلب البيانات");
    }
  };

  useEffect(() => {
    fetchOptions();
  }, []);


  return (
    <ThemeProvider theme={theme}>
      {isLoading == false ? <Box sx={{ bgcolor: 'background.paper', width: 500 }}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >

            {<Tab label="رصيد" {...a11yProps(0)} />}
            <Tab label="فاتورة" {...a11yProps(1)} />
            {<Tab label="تطبيقات" {...a11yProps(2)} />}
            {<Tab label="كازية" {...a11yProps(3)} />}
          </Tabs>
        </AppBar>

        <TabPanel value={value} index={0} dir="rtl">
          <FormBalance mobile={setting?.mobile} fetchData={fetchData} />
        </TabPanel>
        <TabPanel value={value} index={1} dir="rtl">
          <FormBill setting={setting} balance={balance} fetchData={fetchData} />
        </TabPanel>
        <TabPanel value={value} index={2} dir="rtl">
          <AppsForm application={setting?.application} />
        </TabPanel>
        <TabPanel value={value} index={3} dir="rtl">
          <KaziehForm kazieh={setting?.kazieh} fetchData={fetchData} balance={balance} />
        </TabPanel>

      </Box>
        :
        <CircularProgress className="ml-[50%] mt-[10%]" />
      }
    </ThemeProvider>
  );
}

