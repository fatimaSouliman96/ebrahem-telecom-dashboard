import Modal from "@mui/material/Modal";
import "./modalProfile.css";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/material";
import { useContext } from "react";
import { OrdersContext } from "../../hooks/UseContext";
import { CloseOutlined } from "@mui/icons-material";
import Processing from "../FormsInquries/Processing";
import Details from "../FormsInquries/Details";
import WatingPay from "../FormsInquries/WatingPay";
import Rejected from "../FormsInquries/Rejected";
import RejectProcess from "../FormsInquries/RejectProcess";


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

export default function ModalDetailsInquries({ open, handleClose, useId, fetchData }) {
  const info = useContext(OrdersContext)
  let data = info?.filter(ele => ele.id == useId)[0]
  const [stutas, setStutas] = useState(data?.status)

  const [reject, setReject] = useState(false)

  const close = () => {
    handleClose(false)
    console.log("jjjj")
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

        {data ?
          <div className=" absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 w-[449px] rounded-2xl p-4 bg-white flex flex-col gap-2">
            <CloseOutlined
              onClick={() => close()}
              className="cursor-pointer"
            />

            {reject == false && stutas | data?.status == "completed" ? <Details data={data} /> : null}
            {reject == false && stutas | data?.status == "pending" ? <WatingPay fetchData={fetchData} changeStatus={setStutas} data={data} /> : null}
            {reject == false && stutas | data?.status == "processing" ? <Processing close={handleClose} changeStatus={setStutas} setReject={setReject} fetchData={fetchData} data={data} /> : null}
            {reject == false && stutas | data?.status == "rejected" ? <Rejected changeStatus={setStutas} setReject={setReject} fetchData={fetchData} data={data} /> : null}
            {reject == true ? <RejectProcess changeStatus={setStutas} setReject={setReject} close={handleClose} fetchData={fetchData} data={data} /> : null}
          </div>
          :
          <CircularProgress />
        }


      </Box>

    </Modal>

  );
}
