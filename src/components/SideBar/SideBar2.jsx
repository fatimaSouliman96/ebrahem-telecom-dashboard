import React from "react";
import { Link, NavLink } from "react-router-dom";
import { sideBarLinks, sideBarLinksEmploee, sideBarLinksMnage } from "../../constants/links";
import "./sideBar.css";


const SideBar = React.memo(({ open, openLogOut }) => {

  const user = JSON.parse(localStorage.getItem('user'))


  return (
    <aside
      className={`h-screen bg-white sticky top-0 ${open ? "w-[18%]" : "translate-x-[100%] w-0"
        } transition-all duration-300 ease-in-out  flex flex-col relative z-50`}
    >
      <div className="flex items-center" >

        <Link to="/" className="flex justify-center p-4">
          <img loading="lazy"  width={165} height={45} src={"/assets/sideBarIcons/Logo.svg"} />
        </Link>

      </div>

      <ul className={`${open ? "flex" : "hidden"
        } flex-col mt-2 gap-1 `}>
        {sideBarLinks.map((item, index) => (
          <li key={index} className="px-4">
            {item.allowed.includes(user?.roles[0]?.name) == true ?
              <NavLink
                className="color-main font-inter text-sm font-normal flex items-center  pr-10 py-2 gap-4 rounded-xl hover:bg-[#DDDCE6]"
                to={item.path}
              >
                <img loading="lazy"  className="not-active" src={item.icon} />
                <img loading="lazy"  className="active-icon" src={item.iconA} />
                {item.text}

              </NavLink>
              :
              <NavLink
                className="color-main font-inter text-sm font-normal flex items-center  pr-10 py-2 gap-4 mt-2 rounded-xl hover:bg-[#DDDCE6] opacity-20 cursor-not-allowed"
              >
                <img loading="lazy"  className="not-active" src={item.icon} />
                {item.text}

              </NavLink>
            }
          </li>
        ))}
        <hr className="mx-4 mt-2 text-[#E0E0E0]" />
        <p className="text-sm font-normal text-[#c0bfbf] text-right pr-4">
          ادارة الموقع
        </p>
        {sideBarLinksMnage.map((item, index) => (
          <li key={index} className="px-4">
            {item.allowed.includes(user?.roles[0]?.name) ? <NavLink
              className="color-main font-inter text-sm font-normal flex items-center  pr-10 py-2 gap-4  rounded-xl hover:bg-[#DDDCE6]"
              to={item.path}
            >
              {
                item.path === "providers" || "application" ?
                  <>
                    <img loading="lazy"  className="not-active w-5 h-5 " src={item.icon} />
                    <img loading="lazy"  className="active-icon w-5 h-5" src={item.iconA} />
                  </>
                  :
                  <>
                    <img loading="lazy"  className="not-active" src={item.icon} />
                    <img loading="lazy"  className="active-icon" src={item.iconA} />
                  </>
              }
              
              {item.text}

            </NavLink>
              :
              <NavLink
                className="color-main font-inter text-sm font-normal flex items-center  pr-10 py-2 gap-4 mt-2 rounded-xl hover:bg-[#DDDCE6] opacity-20 cursor-not-allowed"
              >
                <img loading="lazy"  className="not-active" src={item.icon} />
                {item.text}

              </NavLink>
            }
          </li>
        ))}
        <hr className="mx-4 mt-2 text-[#E0E0E0]" />
        <p className="text-sm font-normal text-[#c0bfbf] text-right pr-4">
          ادارة موظف
        </p>
        {sideBarLinksEmploee.map((item, index) => (
          <li key={index} className="px-4">
            {item.allowed.includes(user?.roles[0]?.name)
            || user?.is_agent == true && item.path == "orders"
            ? 
            
            <NavLink
              className="color-main font-inter text-sm font-normal flex items-center  pr-10 py-2 gap-4 rounded-xl hover:bg-[#DDDCE6]"
              to={item.path}
            >
              <img loading="lazy"  className="not-active" src={item.icon} />
              <img loading="lazy"  className="active-icon" src={item.iconA} />
              {item.text}

            </NavLink>
              :
              <NavLink
                className="color-main font-inter text-sm font-normal flex items-center  pr-10 py-2 gap-4 mt-2 rounded-xl hover:bg-[#DDDCE6] opacity-20 cursor-not-allowed"
              >
                <img loading="lazy"  className="not-active" src={item.icon} />
                {item.text}

              </NavLink>
            }
          </li>
        ))}
      </ul>

      <ul className="overflow-hidden">
        <hr className="mx-4 mt-4 text-[#E0E0E0]" />
        <li onClick={() => openLogOut()} className="m-4 color-main cursor-pointer font-inter text-sm font-normal flex items-center  pr-10 py-2 gap-4 mt-2 rounded-xl hover:bg-[#DDDCE6]">
          <img loading="lazy" 
            className="not-active"
            src={"/assets/sideBarIcons/iconLogOut.svg"}
          />
          <span>تسجيل خروج</span>
        </li>
      </ul>

    </aside>
  );
})

export default SideBar;
