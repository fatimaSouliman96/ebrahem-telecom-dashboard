
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";
import { validateFields } from "../../utilits/validation";
import "../style/loginform.css";
import { baseUrl } from "../../constants/baseUrl";

export default function LogInForm({ setSubmit }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleRememberMe = (e) => {
    if (e.target.checked) {
      localStorage.setItem("remember", true);
    } else {
      localStorage.setItem("remember", false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationRules = {
      name: { required: true, minLength: 3, label: "Username" },
      password: { required: true, minLength: 8, label: "Password" },
    };

    const validationErrors = validateFields({ name, password }, validationRules);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmit(true);

    try {
      const response = await axios.post(
        `${baseUrl}login`,
        null,
        {
          params: {
            username: name,
            password: password,
          },
          headers: {
            Accept: "application/json",
          },
        }
      );

      const token = response.data.data.token;
      Cookies.set("token", token, { expires: 90, secure: true });
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
      navigate("/dashboard", { state: { remember: true } });
    } catch (error) {
      toast.error("فشل تسجيل الدخول");
      if (error.response?.status === 404) {
        toast.error("User not found");
      }
      setSubmit(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <div className="flex flex-col items-end w-full justify-between gap-4">
        {/* Username */}
        <div className="flex flex-col gap-3 w-full">
          <label htmlFor="name" className="text-xs font-medium">
            اسم المستخدم
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            id="name"
            className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
          />
          {errors.name && <div className="text-red-600 text-sm">{errors.name}</div>}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-3 w-full">
          <label htmlFor="password" className="text-xs font-medium">
            كلمة المرور
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
          />
          {errors.password && <div className="text-red-600 text-sm">{errors.password}</div>}
        </div>

        {/* Remember me */}
        <div className="flex items-center self-start gap-2">
          <input
            onChange={handleRememberMe}
            className="hidden complete"
            type="checkbox"
            id={`check-round`}
          />
          <label className="flex items-center h-10 px-1 cursor-pointer" htmlFor={`check-round`}>
            <span className="checkbox-inner flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-300" />
          </label>
          <label htmlFor="check-round" className="text-xs font-medium">
            تذكرني
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-main-color w-full h-[50px] text-white rounded-lg flex-center main-button"
        >
          تسجيل الدخول
        </button>
      </div>
    </form>
  );
}

