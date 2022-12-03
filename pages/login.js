import Image from 'next/image';
import React from "react";
import { toast } from "react-toastify"

import LoginForm from "../components/LoginForm";
import { LOGIN_URL } from "../config";
import { useAuthContext } from "../store/contexts";
import leftMan from "../images/left_man.svg";
import rightMan from "../images/right_man.svg";

function useLoginRequest({ onSuccess, onError}) {
  const [loading, setLoading] = React.useState(false);

  const login = React.useCallback((form) => {
    setLoading(true);
    fetch(LOGIN_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        user_id: form.user_id.toUpperCase() // force the ID to uppercase
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token && data.useri && data.status_code === 200) {
          onSuccess({ user: data.useri, token: data.token })
        } else {
          if (data?.status_code == 401) {
            onError(["Incorrect Password!"]); // incorrect password
          } else if (data?.status_code === 422) {
            onError(["Student/User ID is invalid!"])
          } else {
           onError(["An error occurred!"]);
          }
        }
      })
      .catch((error) => {
        onError([error?.message || "A server error occurred!"]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    loading,
    login,
  };
}


function Page() {
  const [form, setForm] = React.useState({
    user_id: "",
    password: ""
  });

  const { login } = useAuthContext();

  const { loading, login: loginUser } = useLoginRequest({
    onSuccess(data) {
      toast.success("Logged In successfully", { autoClose: 5000 });
      login(data)
    },
    onError(errors) {
      if (errors && errors.length > 0) {
        errors.forEach((errorMessage) => {
          toast.error(errorMessage, { autoClose: 20000 });
        });
      }
    },
  });

  const handleChange = React.useCallback(({ target: { name, value } }) => {
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  return (
    <div className="bg-gray-200 flex items-center min-h-screen h-full w-full">
      <div className="w-6/12 h-full flex flex-col px-8 mx-6">
        <LoginForm
          form={form}
          onChange={handleChange}
          loading={loading}
          onSubmit={loginUser}
        />
      </div>
      <div className="flex items-start w-6/12 h-full ">
        <Image src={leftMan} alt="" />
        <Image src={rightMan} alt="" />
      </div>
    </div>
  );
}

Page.authRequired = false;

export default Page;
