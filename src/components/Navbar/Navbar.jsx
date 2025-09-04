

import { useEffect, useState } from "react";
import { rolles } from "../../constants/data";
import { Button } from "@mui/material";
import userImg from '../../../public/assets/images/user.png'
import { SearchOutlined } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import DropDownProfile from "../elements/DropDownProfile";
import ModalPassword from "../Modals/ModalPassword";
import { fetchBalances } from "../../services/getBalances";


const Navbar = ({ open, setOpen, value, handelChangeSearch }) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const openProfile = Boolean(anchorEl);
  const [valueResult, setValueResult] = useState(value)

  const [dropBtn, setDropBtn] = useState("cursor-pointer");

  const [openModalPassword, setOpenModalPassword] = useState(false);
  const [balance, setBalance] = useState()
  const [cridet, setCridet] = useState()

  const handleOpenModal = () => setOpenModal(true);



  const handleOpenModalPassword = () => setOpenModalPassword(true);
  const handleCloseModalPassword = () => setOpenModalPassword(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClickProfile = (event) => {
    setAnchorEl(event.currentTarget);
    setDropBtn("cursor-pointer rotate-180");
  };

  const handleCloseProfile = () => {
    setAnchorEl(null);
    setDropBtn("cursor-pointer");
  };

  const getBalanses = async () => {
    const res = await fetchBalances()
    setBalance(res.main_balance)
    setCridet(res.credit_balance)
    localStorage.setItem("creditBalance", res.credit_balance )
    localStorage.setItem("balance", res.main_balance )
    
  }
  useEffect(() => {
    getBalanses()
    const handleResize = () => {
      if (window.innerWidth < 835) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav className={`flex justify-between  bg-white items-centerpx-8 px-2  max-w-full`}>

        <div className="flex gap-2 w-[40%] items-center">
          <MenuIcon onClick={handleOpen} className="cursor-pointer" />
          <div className="relative py-6 pr-4 w-[95%]">
            <input
              type="search"
              onChange={(e) => handelChangeSearch(e)}
              value={valueResult}
              className="placeholder:text-[#A6A6A6] text-black placeholder:text-right p-2 pr-8 bg-[#f5f6fa] rounded-lg w-full outline-[#D5D5D5]"
              placeholder="بحث"
            />
            <SearchOutlined className="text-[#A6A6A6] absolute right-5 top-8" />
          </div>
        </div>

        <div className="flex items-center">
          <img src={userImg} className="w-10 h-10 rounded-full ml-2" />
          <div className="font-inter text-right pl-1">
            <p className="text-black text-sm font-bold">{JSON.parse(localStorage.getItem("user"))?.username}</p>
            {
              rolles.map(ele => {
                if (JSON.parse(localStorage.getItem("user"))?.roles[0].name == ele.en) {
                  return <p key={ele.en} className="text-[#A6A6A6] text-xs">{ele.ar}</p>
                }
              })
            }
          </div>

          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={(e) => handleClickProfile(e)}
          >
            <img src="/assets/More.svg" className={dropBtn} />
          </Button>
        </div>
      </nav>

      { <DropDownProfile
        changePassword={handleOpenModalPassword}
        openModal={handleOpenModal}
        open={openProfile}
        anchorEl={anchorEl}
        close={handleCloseProfile}
        balance={balance}
        cridet={cridet}
      />}

      <ModalPassword
        open={openModalPassword}
        handleClose={handleCloseModalPassword}
      />
    </>
  );
};

export default Navbar;
