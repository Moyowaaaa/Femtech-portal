import Link from "next/link";
import React from "react";

import { REGISTER_PAGE } from '../config';

const LoginForm = ({ loading, onSubmit, form, onChange, errors }) => {
  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(form);
      }}
      className="flex flex-col gap-4 w-8/12 py-2 h-4/6 bg-[#3041DC] rounded-lg text-white px-6"
    >
      <h1>Good Morning Techy!</h1>
      <div className="h-full w-full flex flex-col justify-center">
        <div className="mb-3">
          <label>Student ID</label>
          <input
            disabled={loading}
            type="text"
            className="text-gray-700 w-full p-2 outline-none border-2 border-[#3041DC] rounded-md"
            onChange={onChange}
            name="studentId"
            value={form?.studentId || ""}
          />

          {errors?.studentId && (
            <p className="mt-1 text-sm text-red-300">{errors.studentId}</p>
          )}
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            disabled={loading}
            type="password"
            className="text-gray-700 w-full p-2 outline-none border-2 border-[#3041DC] rounded-md"
            onChange={onChange}
            name="password"
            value={form?.password || ""}
          />
          {errors?.password && (
            <p className="mt-1 text-sm text-red-300">{errors.password}</p>
          )}
        </div>

        <div className="w-full  my-4 flex justify-center">
          <button 
            className={`${loading ? 'cursor-not-allowed' : 'cursor-pointer'} bg-[#187DF3] text-white py-2 px-9 flex items-center w-max rounded-md shadow-md`}
            disabled={loading}
            type="submit"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </div>

        <div className="flex justify-end">
          <Link href={REGISTER_PAGE}>Register</Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
// import Link from "next/link";
// import React from "react";

// import { REGISTER_PAGE } from '../config';

// const LoginForm = ({ loading, onSubmit, form, onChange, errors }) => {
//   return (
//     <form 
//       onSubmit={(e) => {
//         e.preventDefault()
//         onSubmit(form);
//       }}
//       className="flex flex-col gap-4 w-8/12 py-2 h-4/6 bg-[#3041DC] rounded-lg text-white px-6"
//     >
//       <h1>Good Morning Techy!</h1>
//       <div className="h-full w-full flex flex-col justify-center">
//         <div className="mb-3">
//           <label>Student ID</label>
//           <input
//             disabled={loading}
//             type="text"
//             className="text-gray-700 w-full p-2 outline-none border-2 border-[#3041DC] rounded-md"
//             onChange={onChange}
//             name="studentId"
//             value={form?.studentId || ""}
//           />

//           {errors?.studentId && (
//             <p className="mt-1 text-sm text-red-300">{errors.studentId}</p>
//           )}
//         </div>

//         <div className="mb-3">
//           <label>Password</label>
//           <input
//             disabled={loading}
//             type="password"
//             className="text-gray-700 w-full p-2 outline-none border-2 border-[#3041DC] rounded-md"
//             onChange={onChange}
//             name="password"
//             value={form?.password || ""}
//           />
//           {errors?.password && (
//             <p className="mt-1 text-sm text-red-300">{errors.password}</p>
//           )}
//         </div>

//         <div className="w-full  my-4 flex justify-center">
//           <button 
//             className={`${loading ? 'cursor-not-allowed' : 'cursor-pointer'} bg-[#187DF3] text-white py-2 px-9 flex items-center w-max rounded-md shadow-md`}
//             disabled={loading}
//             type="submit"
//           >
//             {loading ? 'Signing In...' : 'Sign In'}
//           </button>
//         </div>

//         <div className="flex justify-end">
//           <Link href={REGISTER_PAGE}>Register</Link>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default LoginForm;
