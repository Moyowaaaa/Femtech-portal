import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaBook, FaSignOutAlt, FaUserCircle } from "react-icons/fa";

import * as routes from "../../config/routes";
import { useAuthContext } from "../../store/contexts";

const Menu = () => {
  const { logout } = useAuthContext();

  const { pathname } = useRouter();

  return (
    <div className="w-3/12 shadow-lg rounded-md cursor-pointer">
      <div className="h-full shadow-md bg-white p-1">
        <h1 className="text-[#187DF3] mb-3 p-3 font-bold text-2xl">Menu</h1>
        <ul className="relative">
          <MenuLink
            active={pathname === routes.COURSES_PAGE || pathname === '/courses'}
            icon={FaBook}
            link={routes.COURSES_PAGE}
            title="Courses"
          />
          <MenuLink
            active={pathname === routes.DASHBOARD_PAGE}
            icon={FaUserCircle}
            link={routes.DASHBOARD_PAGE}
            title="Profile"
          />
          <li className="relative" onClick={logout}>
            <div className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out">
              <FaSignOutAlt className="h-4 mr-3 text-primary-600 w-3" />
              <span>Sign Out</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

function MenuLink({ active, icon: Icon, link, title }) {
  return (
    <li className="relative">
      <Link href={link || "#"}>
        <a
          className={`${
            active
              ? "bg-primary-600 text-gray-100"
              : "bg-transparent text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          } flex items-center text-sm py-4 px-6 h-12 overflow-hidden whitespace-nowrap rounded transition duration-300 ease-in-out`}
        >
          {/*<Image alt="" src={profile} />*/}
          <Icon className={`h-3 mr-3 ${active ? 'text-gray-200' : 'text-primary-600'} w-3`} />
          <span className="inline-block">{title}</span>
        </a>
      </Link>
    </li>
  );
}

export default Menu;
// import React from "react";
// import Image from "next/image";
// import instructor from "../../images/instructor.svg";
// import profile from "../../images/profile.svg";
// import attendance from "../../images/attendance.svg";
// import logoutImage from "../../images/logout.svg";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import * as routes from "../../config/routes";
// import { useAuthContext } from "../../store/contexts";

// const Menu = () => {
//   const { logout } = useAuthContext();

//   const { pathname } = useRouter();

//   return (
//     <div className="shadow w-2/12   shadow-lg flex flex-col p-4 rounded-md cursor-pointer">
//       <h1 className="text-[#187DF3] font-bold text-2xl">Menu</h1>

//       <div className="mt-12 flex flex-col gap-4">
//         <Link href={routes.DASHBOARD_PAGE}>
//           <a
//             className={`${
//               pathname === routes.DASHBOARD_PAGE
//                 ? "border-2 border-[blue] py-2"
//                 : ""
//             } cursor-pointer flex gap-2 hover:border-2 hover:p-2 hover:border-[blue]`}
//           >
//             <Image src={profile} alt="" />
//             <p>Profile</p>
//           </a>
//         </Link>

//         <Link href={routes.ATTENDANCE_PAGE}>
//           <a
//             className={`${
//               pathname === routes.ATTENDANCE_PAGE
//                 ? "border-2 border-[blue] py-2"
//                 : ""
//             } cursor-pointer flex gap-2 hover:border-2 hover:p-2 hover:border-[blue]`}
//           >
//             <Image src={attendance} alt="" />
//             <p>Attendance</p>
//           </a>
//         </Link>

//         <div className="flex gap-2">
//           <Image src={instructor} alt="" />
//           <p>My Instructor</p>
//         </div>

//         <div onClick={logout} className="cursor-pointer flex gap-2 hover:border-2 hover:p-2 hover:border-[blue]">
//           <Image src={logoutImage} alt="" />
//           <p>Logout</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Menu;
