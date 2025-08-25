import Modal from "@mui/material/Modal";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import "./accounts.css";
import { useState } from "react";
import { Actions } from "../accounts-manage";
export default function ActionsManageModal({ handleClose, stepNum, open, user, rolles, fetchData, name}) {
  const [step, setStep] = useState(stepNum);

  const titles = [
    "تعديل المستخدم",
    "الصلاحيات",
    "تعديل الأسعار",
    "حذف المستخدم",
  ];

  const buttons = [
    { step: 1, icon: "edit.svg", alt: "Edit" },
    { step: 2, icon: "prermisions.svg", alt: "Permissions" },
    { step: 3, icon: "dolar.svg", alt: "Dollar" },
    { step: 4, icon: "trash.svg", alt: "Trash" },
    { step: 5, icon: "icon5.svg", alt: "Setting" },
  ];

  const components = [
    <Actions.EditUser fetchData={fetchData} user={user} handleClose={handleClose} rollesName={rolles} />,
    <Actions.Permissions cridet={user.creditBalance} fetchData={fetchData}  balance={user.main_balance} id={user.id} />,
    <Actions.SpecialPrices name={name} id={user?.id} />,
    <Actions.DeleteUser id={user?.id} fetchData={fetchData} userName={user?.username} handleClose={handleClose} />,
    <Actions.Setting id={user?.id} />,
  ];

  return (
    <Modal
      keepMounted
      open={open}
      onClose={() => handleClose(false)}
      sx={{ padding: "3%" }}
    >
      <div className="max-w-[859px] m-auto top-1/2 relative -translate-y-1/2 w-full manage-popup px-6 pt-6 pb-16  bg-white">
        {/* <div className="actions-popup">
          {buttons.map(({ step: btnStep, icon, alt }) => (
            <button
              key={btnStep}
              className="tab"
              onClick={() => setStep(btnStep)}
              disabled={step !== btnStep}
            >
              <img src={`/assets/icons/${icon}`} alt={alt} />
            </button>
          ))}
        </div> */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <CloseRoundedIcon
              onClick={() => handleClose(false)}
              className="cursor-pointer"
            />
            <h3>{user?.username}</h3>
          </div>
          {stepNum !== 3 && <h3 className="text-xl font-semibold text-black">
            {titles[step - 1]}
          </h3>}
        </div>
        {
          components[step-1]
        }
      </div>
    </Modal>
  );
}
