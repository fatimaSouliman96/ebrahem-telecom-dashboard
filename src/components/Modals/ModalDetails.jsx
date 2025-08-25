import Modal from "@mui/material/Modal";
import "./modalProfile.css";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/material";
import Details from "../FormsOrder/Details";
import WatingPay from "../FormsOrder/WatingPay";
import Processing from "../FormsOrder/Processing";
import { useContext } from "react";
import { OrdersContext } from "../../hooks/UseContext";
import { CloseOutlined } from "@mui/icons-material";
import RejectProcess from "../FormsOrder/RejectProcess";
import Rejected from "../FormsOrder/Rejected";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalDetails({ open, handleClose, useId, fetchData }) {
  const info = useContext(OrdersContext)
  let data = info?.filter(ele => ele.id == useId)[0]
  const [stutas, setStutas] = useState(data?.status)
  
  const [reject, setReject] = useState(false)
  
  const close = () => {
    handleClose(false)
    setReject(false)
  }


  return (
    <Modal
      open={open}
      onClose={() => close()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >

      <Box sx={style}>
      
        {data && 
        <div className=" absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 w-[449px] rounded-2xl p-4 bg-white flex flex-col gap-2">
          <CloseOutlined 
            onClick={() => close()}
            className="cursor-pointer"
          />

          {   stutas | data?.status == "completed" ? <Details data={data}  /> : null}
          { stutas | data?.status == "pending" ? <WatingPay fetchData={fetchData} changeStatus={setStutas} data={data} /> : null}
          {  stutas | data?.status == "processing"  ?
          reject == false ?
           <Processing close={handleClose} changeStatus={setStutas} setReject={setReject} fetchData={fetchData}  data={data} /> : null : null}
          {  stutas | data?.status == "rejected" ? <Rejected changeStatus={setStutas} setReject={setReject} fetchData={fetchData}   data={data} /> : null}
          { reject == true  ? <RejectProcess changeStatus={setStutas} setReject={setReject} close={handleClose} fetchData={fetchData}  data={data} /> : null}
        </div>

        }


      </Box>

    </Modal>

  );
}
