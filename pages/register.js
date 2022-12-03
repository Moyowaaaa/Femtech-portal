import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";

import RegisterForm from "../components/RegisterForm";
import { LOGIN_PAGE, REGISTER_URL } from "../config";
import snip1 from "../images/snip1.svg";
import snip2 from "../images/snip2.svg";

function useRegisterRequest() {
  const [success, setSuccess] = React.useState(false);
  const [errors, setErrors] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const register = React.useCallback((form) => {
    setLoading(true);
    setSuccess(false); // Just incase the user goes back to the previous page
    fetch(REGISTER_URL, {
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
        if (data?.status === 201) {
          setSuccess(true);
        } else {
          if (data?.status_code && data.status_code !== 200) {
            if (data.message) {
              setErrors([...data.message.split(",")]);
            } else {
              setErrors(["An error occurred!"]);
            }
          }
        }
      })
      .catch((error) => {
        setErrors([error?.message || "A server error occurred!"]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    errors,
    loading,
    register,
    success,
  };
}

const Register = () => {
  const [form, setForm] = React.useState();

  const router = useRouter();
  const { success, errors, loading, register } = useRegisterRequest();

  const handleChange = React.useCallback(({ target: { name, value } }) => {
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  React.useEffect(() => {
    if (errors && errors.length > 0) {
      errors.forEach((errorMessage) => {
        toast.error(errorMessage, { autoClose: 20000 });
      });
    }
  }, [errors]);

  React.useEffect(() => {
    if (success === true) {
      toast.success("Registration was successful", { autoClose: 20000 });
      router.push(LOGIN_PAGE)
    }
  }, [router, success]);

  return (
    <div className="bg-gray-200 min-h-screen h-full w-full">
      <div className="flex items-center w-full h-full">
        <div className="w-6/12 h-full flex flex-col px-8 mx-6">
          <RegisterForm
            form={form}
            loading={loading}
            onSubmit={register}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-start w-6/12 h-full">
          <div className="pt-16">
            <Image src={snip1} alt="snip1" />
          </div>

          <Image src={snip2} alt="snip1" />
        </div>
      </div>
    </div>
  );
};

Register.authRequired = false;

export default Register;
