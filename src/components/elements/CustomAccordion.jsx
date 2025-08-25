import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import TransferForm from "../forms/TransferForm";
import AddBalanceForm from "../forms/AddBalanceForm";
import CreditForm from "../forms/CreditForm";
import '../style/accordion.css'

export default function CustomAccordion({ balanceValue, balance, users, fetchData, credit, cerditValue }) {
  
  return (
    <Accordion sx={{ boxShadow: 0 }}>
      <AccordionSummary
        expandIcon={
          <ExpandMoreRoundedIcon sx={{ color: "#000", fontSize: "30px" }} />
        }
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <h2 className="text-black font-bold text-2xl">
          {balance ? "إضافة رصيد" : credit ? "رصيد ائتماني" : "تفاصيل التعبئة" }
        </h2>
      </AccordionSummary>
      <AccordionDetails>
        {balance ? <AddBalanceForm cridetbalance={cerditValue} balance={balanceValue}  fetchData={fetchData} /> : credit ? <CreditForm cridet={cerditValue} users={users} fetchData={fetchData} /> : <TransferForm balance={balanceValue} users={users} fetchData={fetchData} /> }
        
      </AccordionDetails>
    </Accordion>
  );
}
