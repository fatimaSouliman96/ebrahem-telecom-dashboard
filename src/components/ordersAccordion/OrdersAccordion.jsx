import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OrderTabs from '../OrdersTaps/OrderTaps';
import "../style/accordion.css"

export default function OrdersAccordion({fetchData, balance}) {

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >

          <h2 className="text-black font-bold text-2xl">
            طلب جديد
        </h2>
        </AccordionSummary>
        <AccordionDetails>
          <OrderTabs balance={balance} fetchData={fetchData} />
        </AccordionDetails>
      </Accordion>
     
    </div>
  );
}
