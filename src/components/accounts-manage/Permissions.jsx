import MainButton from "../elements/MainButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../constants/baseUrl";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import StepOne from "./PermissionsSteps/StepOne";
import StepTwo from "./PermissionsSteps/StepTwo";
import useStep from "../../hooks/useStep";
import Cookies from 'js-cookie';

const token = Cookies.get('token');

export default function Permissions({ balance, id,  fetchData, cridet }) {
  const { stepNum, incrementStep, decrementStep, setStepNum } = useStep(
    1,
    1,
    2
  );
  const [userPermissions, setUserPermissions] = useState({
    balance: "",
    switch1: false,
    switch2: false,
  });
  const [data, setData] = useState()
  const [role, setRole] = useState()

  const fetchPremation = async () => {
    await axios.request(
      {
        url: `${baseUrl}users/${id}/permissions`,
        method: "get",
        headers: {
          "Accept": "application/json",
          Authorization: `Bearer ${Cookies.get('token')}`,
        }
      }
    )
      .then(res => {
        setData(res.data)
        setRole(res.data.user.roles[0].name)
      })
  }
  useEffect(() => {
    fetchPremation()
  }, [])


  return (
    <>
      <form
        className=" mt-8 flex flex-col gap-4"

      >
        {stepNum === 1 && (
          <StepOne
            id={id}
            balance={balance}
            setStepNum={incrementStep}
             fetchData={fetchData} 
             cridet={cridet}

          />
        )}
        {stepNum === 2 && (
          <StepTwo
            userPermissions={userPermissions}
            setUserPermissions={setUserPermissions}
            id={id}
          />
        )}

        <div className="flex items-end justify-between">
          {/* <MainButton
            title="حفظ التغييرات"
            w="266px"
            h="44px"
            className="mt-8"
          /> */}
          <div className="flex">
            <div
              className="w-10 flex items-center justify-center rounded-tr-lg rounded-br-lg border border-[#D5D5D5] bg-[#FAFBFD] cursor-pointer h-[30px]"
              onClick={incrementStep}
            >
              <KeyboardArrowRightIcon
                sx={{ color: stepNum === 2 ? "#a6a6a6" : "#000" }}
              />
            </div>
            <div
              className="w-10 rounded-tl-lg flex items-center justify-center rounded-bl-lg border border-[#D5D5D5] bg-[#FAFBFD] cursor-pointer h-[30px]"
              onClick={decrementStep}
            >
              <KeyboardArrowLeftIcon
                sx={{ color: stepNum === 1 ? "#a6a6a6" : "#000" }}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
