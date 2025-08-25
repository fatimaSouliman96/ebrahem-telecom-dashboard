import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { Link } from "react-router-dom";
import MainButton from "../elements/MainButton";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../constants/baseUrl";
import SwitchItem from "../elements/SwitchItem";
export default function Permitions() {
  const [userPermissions, setUserPermissions] = useState({
    balance: "",
    switch1: true,
    switch2: false,
  });

  const handleEditPermissions = async () => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}`, userPermissions, {
        headers: {},
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      className="rtl mt-8 flex flex-col gap-4"
      onSubmit={handleEditPermissions}
    >
      <div className="flex flex-col gap-3">
        <label htmlFor="balance" className="text-xs">
          الرصيد الائتماني المسموح
        </label>
        <input
          type="text"
          name="balance"
          id="balance"
          value={userPermissions.balance}
          placeholder="باقي 5.500.000"
          className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
        />
      </div>
      <div>
        <div className="flex justify-between items-center">
          <p>إدارة خدمات وأسعار تحويل رصيد مفرق</p>
          <SwitchItem />
        </div>
        <div className="flex justify-between items-center">
          <p>تمكين ميزات الوكيل</p>
          <SwitchItem />
          {/* checked={userPermissions.switch2}
          onChange=
          {(e) =>
            setUserPermissions({
              ...userPermissions,
              switch2: e.target.checked,
            })
          } */}
        </div>
      </div>
      <div className="flex flex-col gap-6 mb-[65px]">
        <div className="flex gap-2 items-center">
          <Link
            to="#"
            className="underline text-[#1F43F1] w-[170px]  text-[16px] font-medium"
          >
            تعديل صلاحيات الخدمات
          </Link>
          <ArrowBackIosNewRoundedIcon
            fontSize="10px"
            sx={{ color: "#1F43F1" }}
          />
        </div>
        <div className="flex gap-2 items-center">
          <Link
            to="#"
            className="underline text-[#1F43F1] w-[170px] text-[16px] font-medium"
          >
            تعديل صلاحيات الإدارة
          </Link>
          <ArrowBackIosNewRoundedIcon
            fontSize="10px"
            sx={{ color: "#1F43F1" }}
          />
        </div>
      </div>
      <MainButton title="حفظ التغييرات" h="44px" w="274px" className="mt-20" />
    </form>
  );
}