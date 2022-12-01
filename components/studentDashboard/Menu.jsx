import React from "react";
import Image from "next/image";
import instructor from "../../images/instructor.svg";
import profile from "../../images/profile.svg";
import attendance from "../../images/attendance.svg";
import logoutImage from "../../images/logout.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import * as routes from "../../config/routes";
import { useAuthContext } from "../../store/contexts";

const Menu = () => {
  const { logout } = useAuthContext();

  const { pathname } = useRouter();
  return (
    <div className="shadow w-2/12   shadow-lg flex flex-col p-4 rounded-md cursor-pointer">
      <h1 className="text-[#187DF3] font-bold text-2xl">Menu</h1>

      <div className="mt-12 flex flex-col gap-4">
        <Link href={routes.DASHBOARD_PAGE}>
          <a
            className={`${
              pathname === routes.DASHBOARD_PAGE
                ? "border-2 border-[blue] py-2"
                : ""
            } cursor-pointer flex gap-2 hover:border-2 hover:p-2 hover:border-[blue]`}
          >
            <Image src={profile} alt="" />
            <p>Profile</p>
          </a>
        </Link>

        <Link href={routes.ATTENDANCE_PAGE}>
          <a
            className={`${
              pathname === routes.ATTENDANCE_PAGE
                ? "border-2 border-[blue] py-2"
                : ""
            } cursor-pointer flex gap-2 hover:border-2 hover:p-2 hover:border-[blue]`}
          >
            <Image src={attendance} alt="" />
            <p>Attendance</p>
          </a>
        </Link>

        <div className="flex gap-2">
          <Image src={instructor} alt="" />
          <p>My Instructor</p>
        </div>

        <div onClick={logout} className="cursor-pointer flex gap-2">
          <Image src={logoutImage} alt="" />
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
