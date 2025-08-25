import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { avatars } from "../../constants/avatars";
import "../../styles/modalProfile.css";
import { useState } from "react";
import clsx from "clsx";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function ModalSearchSections({ open, handleClose }) {
  const [avatarId, setAvatarId] = useState(0);
  return (
    <Modal
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="modal-search"
    >
      <Box sx={style}>
        <div className="flex justify-between items-center pb-4">
          <img
            src="/assets/icons/iconClose.svg"
            className="pb-4 cursor-pointer"
            onClick={() => handleClose()}
          />
          <p className="font-inter text-2xl font-semibold pb-2">
            : اختر الأفتار الخاص بك
          </p>
        </div>
        <div className="flex flex-wrap gap-3 bg-white justify-center">
          {avatars.map((ele, index) => [
            <img
              width={"15%"}
              height={112}
              className={clsx(
                "rounded-[50%] hover:border-8 cursor-pointer  hover:border-[#282561]",
                {
                  "border-[#282561] border-8 ": avatarId === index,
                }
              )}
              src={ele}
              key={index}
              onClick={() => setAvatarId(index)}
            />,
          ])}
        </div>
        <button
          onClick={() => handleClose()}
          className="cursor-pointer btn-style font-inter w-[29%] mt-8 float-right text-center h-[35px] text-base font-normal"
        >
          حفظ التغييرات
        </button>
      </Box>
    </Modal>
  );
}