import Menu from "@mui/material/Menu";
import "./dropDownProfile.css";
import userImg from '../../../public/assets/images/user.png'
import { rolles } from "../../constants/data";
import NumberDisplay from "../../hooks/NumberDisplay";

export default function DropDownProfile({
  open,
  anchorEl,
  close,
  openModal,
  changePassword,
  balance,
  cridet
}) {
  const user = JSON.parse(localStorage.getItem("user"))


  const openPassword = () => {
    changePassword();
    close();
  };

  return (
    <div className="profil">
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={close}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <div className="flex w-[301px] flex-col justify-center gap-3">
          <div className="font-inter flex flex-col items-center">
            <div className="relative">
              <img
                className="w-full h-24 rounded-full"
                src={userImg}
              />

            </div>
            <span className="text-[#5D7285] text-sm font-normal">{user?.name}</span>
          </div>
          <div className=" color-main pl-4 text-center pr-2 pt-2">
            <p className="font-inter text-base font-bold">{user?.username}</p>
            {
              rolles.map(ele => {
                if (JSON.parse(localStorage.getItem("user"))?.roles[0].name == ele.en) {
                  return <p key={ele.en} className="font-inter text-xs">{ele.ar}</p>
                }
              })
            }
          </div>
          <div className="flex flex-col color-main pl-4 text-center pr-2 pt-2 ">
            <div className="font-inter text-base font-bold flex items-center gap-2 "> <p >الرصيد الأساسي :</p> <p className="text-[#282561ba]" style={{ direction: 'ltr', unicodeBidi: 'plaintext' }} >{NumberDisplay(parseInt(balance))} L.S</p>  </div>
            <div className="font-inter text-base font-bold flex items-center gap-2"> <p >الرصيد الإتماني :</p> <p className="text-[#282561ba]"  style={{ direction: 'ltr', unicodeBidi: 'plaintext' }}>{NumberDisplay(parseInt(cridet))} L.S</p>  </div>
          </div>
          <hr className="mx-10 mt-4 h-2 text-[#CAC4D0]" />
          <button
            onClick={() => openPassword()}
            className="btn-style font-inter w-9/12 m-auto text-center  h-[35px] text-base font-normal"
          >
            تعديل كلمة المرور
          </button>
        </div>
      </Menu>
    </div>
  );
}
