import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import clsx from "clsx";
import CircularProgress from '@mui/material/CircularProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

import Cookies from 'js-cookie';
import axios from "axios";
import { baseUrl } from "../../../constants/baseUrl";
import { permissions } from "../../../constants/data";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#317BFF",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));
export default function StepTwo({ id }) {

  const [submit, setSubmit] = useState(false)
  const [permission, setPermission] = useState([])
  const [checkedPermission, setCheckedPermission] = useState([])
  const [sendData, setSendData] = useState([])

  const fetchPremation = async () => {
    setCheckedPermission([])
    setPermission([])
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
        setPermission(res.data.user.roles[0].permissions)
        res.data.user?.permissions?.map(ele => {
          let idPer = ele.id
          sendData.push(idPer)
          setCheckedPermission(sendData)
        })
      })
  }

  useEffect(() => {
    fetchPremation()
  }, [])

  const handelChangePermission = (e, value) => {

    if (e.target.checked == true) {
      setSendData([...sendData, value])
    } else {
      let newData = sendData.filter(ele => ele !== value)
      setSendData(newData)
    }

  }
  const handleSave = async (e) => {
    console.log(sendData)
    setSubmit(true)
    e.preventDefault()
    await axios.request(
      {
        url: `${baseUrl}users/${id}/change-permissions`,
        method: "put",
        data: {
          permissions: sendData
        },

        headers: {
          "Accept": "application/json",
          Authorization: `Bearer ${Cookies.get('token')}`,
        }
      }

    )
      .then(res => {
        toast.success("تم تعديل الصلاحيات بنجاح")
        setSubmit(false)
      })
      .catch(e => {
        toast.error("فشلت العملية")
        setSubmit(false)
      })

  }

  return (
    <>
      <div className="border-b border-[#241e1e] pb-4">

        <div className="grid items-start grid-cols-3 gap-3 pb-4 h-[200px]">
          {permission?.map((el, index) => [
            permissions ? permissions.map((item, id) => {
              if (el.name == item.en) {
                return <div key={id} className="flex items-center gap-4 ">

                  {
                    checkedPermission ?
                      checkedPermission.includes(el.id) == true ?
                        <FormGroup id={`${index}`}>
                          <FormControlLabel
                            control={
                              <IOSSwitch defaultChecked sx={{ m: 1 }} onChange={e => handelChangePermission(e, el.id)} />
                            }
                          />
                        </FormGroup>
                        :
                        <FormGroup id={`${el.id}`}>
                          <FormControlLabel
                            control={
                              <IOSSwitch id={`${el.id}`} sx={{ m: 1 }} onChange={e => handelChangePermission(e, el.id)} />
                            }
                          />
                        </FormGroup>
                      :
                      <FormGroup id={`${el.id}`}>
                        <FormControlLabel
                          control={
                            <IOSSwitch id={`${el.id}`} sx={{ m: 1 }} onChange={e => handelChangePermission(e, el.id)} />
                          }
                        />
                      </FormGroup>
                  }
                  <label htmlFor={`${index}`} className="text-sm">{item.ar}</label>

                </div>
              }
            })
            :
            <CircularProgress className="m-auto" size={20} />
          ])
            
          }
        </div>
        <button
          onClick={e => handleSave(e)}
          type="submit"
          className={`bg-main-color mt-4 h-11 w-1/2 text-white rounded-lg flex-center main-button`}
        >
          حفظ التغييرات
        </button>
      </div>
      <div className={
        clsx(
          'w-full h-full flex cursor-not-allowed items-center justify-center absolute top-0 left-0 bg-[#ffffff7e]',
          {
            'hidden'
              : submit == false
          }
        )
      }>
        <CircularProgress/>
      </div>

    </>
  );
}
