import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";

import RegisterForm from "../components/RegisterForm";
import { LOGIN_PAGE, REGISTER_URL } from "../config";
import snip1 from "../images/snip1.svg";
import snip2 from "../images/snip2.svg";

function useRegisterRequest({ onSuccess, onError }) {
  const [loading, setLoading] = React.useState(false);

  const register = React.useCallback((form) => {
    setLoading(true);
    fetch(REGISTER_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        user_id: form.user_id.toUpperCase(), // force the ID to uppercase
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.status === 201) {
          onSuccess();
        } else {
          if (data?.status_code && data.status_code !== 200) {
            if (data.message) {
              onError([...data.message.split(",")]);
            } else {
              onError(["An error occurred!"]);
            }
          }
        }
      })
      .catch((error) => {
        onErrors([error?.message || "A server error occurred!"]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    loading,
    register,
  };
}

const Register = () => {
  const [form, setForm] = React.useState({
    user_id: "",
    password: "",
    full_name: ""
  });

  const router = useRouter();

  const { loading, register } = useRegisterRequest({
    onSuccess() {
      toast.success("Registration was successful", { autoClose: 5000 });
      router.push(LOGIN_PAGE);
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
    <div className="bg-gray-200 min-h-screen h-full w-full">
      <div className="flex items-center w-full h-full">
        <div className="w-5/12 h-full flex flex-col px-8 mx-6">
          <RegisterForm
            form={form}
            loading={loading}
            onSubmit={register}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-start w-7/12 h-full">
          <img className="h-[100vh] w-full" src="/fiti-attend-bg.jpg" alt="" />
          {/*<div className="pt-16">
            <Image src={snip1} alt="snip1" />
          </div>

          <Image src={snip2} alt="snip1" />*/}
        </div>
      </div>
    </div>
  );
};

Register.authRequired = false;

export default Register;
