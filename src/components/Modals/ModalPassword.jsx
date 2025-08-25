import Modal from "@mui/material/Modal";
import CheckSharpIcon from "@mui/icons-material/CheckSharp";
import "./modalProfile.css";
import useClipboard from "../../hooks/useClipboard";
import { useState } from "react";
import clsx from "clsx";
import toast from "react-hot-toast";
import axios from "axios";
import { baseUrl } from "../../constants/baseUrl";
import Cookies from 'js-cookie';
import { CircularProgress } from "@mui/material";

export default function ModalPassword({ open, handleClose }) {

  const user = JSON.parse(localStorage.getItem("user"))
  const [submit, setSubmit] = useState(false)

  const { copySuccess, copyToClipboard, setCopySuccess } = useClipboard();
  const [passwords, setPasswords] = useState({
    new: "",
    newRepeate: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const [newRepeate, setNewRepeate] = useState("");

  const handleChangeConfirm = (e) => {
    setPasswords({ ...passwords, newRepeate: e.target.value })
    if (passwords.new !== passwords.newRepeate) {
      setNewRepeate("The password confirmation field must match password")
    }
    if (passwords.new == e.target.value) {
      setNewRepeate("Matched")

    }

  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmit(true)
    if (passwords.new.length < 8) {
      setNewPassword("Password must be at least 8 charts")
    } else {
      setNewPassword("")
    }
    await axios.request(
      {
        url: `${baseUrl}users/${user.id}/reset-password`,
        method: "put",
        data: {
          password: passwords.new,
          password_confirmation: passwords.newRepeate
        },
        headers: {
          "Accept": "application/json",
          Authorization: `Bearer ${Cookies.get('token')}`,
        }
      }
    )
      .then(res => {
        setSubmit(false)
        toast.success("تمت العملية بنجاح")
        handleClose()
        setPasswords({
          new: "",
          newRepeate: ""
        })

      })
      .catch(e => {
        setSubmit(false)
        e && toast.error("فشلت العملية")
      })

  }


  return (
    <Modal
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 w-[448px] rounded-2xl p-8 bg-white flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <img
            src="/assets/icons/iconClose.svg"
            className="pb-4 cursor-pointer"
            onClick={() => handleClose()}
          />
          <p className="font-inter text-2xl font-semibold pb-2">
            تعديل كلمة المرور
          </p>
        </div>
        <form className="rtl flex flex-col gap-6" onSubmit={e => handleSubmit(e)}>
          {/* <div className="flex flex-col gap-4">
            <label
              className="pr-1 text-xs font-medium text-right"
              htmlFor="old-password"
            >
              كلمة المرور القديمة
            </label>
            <input
              className="border border-1 border-[#eeeeee] rounded-2xl h-[59px] outline-none px-4"
              id="old-password"
              type="password"
              value={passwords.old}
              onChange={(e) =>
                setPasswords({ ...passwords, old: e.target.value })
              }
            />
          </div> */}
          <div>
            <div className="flex flex-col gap-4">
              <label
                className="pr-1 text-xs font-medium text-right"
                htmlFor="new-password"
              >
                كلمة المرور الجديدة
              </label>
              <div className="relative w-full border border-1 border-[#eeeeee] rounded-2xl h-[59px]">
                <input
                  className="outline-none px-4 w-[86%] h-full"
                  id="new-password"
                  type="password"
                  value={passwords.new}
                  onChange={(e) =>
                    setPasswords({ ...passwords, new: e.target.value })
                  }
                />

                <div className="absolute top-1/2 -translate-y-1/2 left-4 flex items-center gap-2">
                  {copySuccess ? (
                    <CheckSharpIcon
                      sx={{ color: "#a6a6a6", fontSize: "18px" }}
                    />
                  ) : (
                    <img
                      src="/assets/icons/copy.svg"
                      alt="copy"
                      className="cursor-pointer"
                      onClick={() => copyToClipboard(passwords.new)}
                    />
                  )}
                  <img
                    src="/assets/icons/refresh.svg"
                    alt="refresh"
                    className="cursor-pointer"
                    onClick={() => {
                      setPasswords({ ...passwords, new: "" });
                      setCopySuccess(false);
                    }}
                  />
                </div>
              </div>
            </div>
            {newPassword !== "" && <div className="text-red-600 text-sm">{newPassword}</div>}
            <ul
              className="val-pass text-right pt-2 text-xs font-normal"
              style={{ direction: "rtl" }}
            >
              <li className="flex items-center flex-row-reverse justify-end gap-1">
                يجب ان تكون من 8 محارف على الأقل.{" "}
                <span className="mt-1 block w-2 h-2 bg-black rounded-[50%]"></span>
              </li>
              <li className="flex items-center flex-row-reverse justify-end gap-1">
                يجب ان تكون من احرف ورموز وأرقام!@#$+.{" "}
                <span className="mt-1 block w-2 h-2 bg-black rounded-[50%]"></span>
              </li>
              <li className="flex items-center flex-row-reverse justify-end gap-1">
                يجب ان تحوي حرف كبير واحد على الأقل.{" "}
                <span className="mt-1 block w-2 h-2 bg-black rounded-[50%]"></span>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <label
              className="pr-1 text-xs font-medium text-right"
              htmlFor="re-password"
            >
              اعد كتابة كلمة المرور الجديدة
            </label>
            <input
              className="border border-1 border-[#eeeeee] rounded-2xl h-[59px] outline-none px-4"
              id="re-password"
              type="password"
              value={passwords.newRepeate}
              onChange={(e) =>
                handleChangeConfirm(e)
              }
            />
          </div>
          {newRepeate !== "" && <div className={
            clsx(
              "text-sm",
              {
                'text-red-600'
                  : newRepeate !== "Matched"
              },
              {
                'text-green-600'
                  : newRepeate == "Matched"
              }
            )
          }
          >{newRepeate}</div>}
          <button
            type="submit"
            style={{
              width: "219px",
              height: "35px",
            }}
            className={`bg-main-color text-white rounded-lg flex-center main-button`}
          >
            {"حفظ التغييرات"}
          </button>

        </form>
        <div className={
          clsx(
            'w-full h-full flex items-center justify-center absolute top-0 left-0 bg-[#ffffff7e]',
            {
              'hidden'
                : submit == false
            }
          )
        }>
          <CircularProgress />
        </div>
      </div>

    </Modal>
  );
}
