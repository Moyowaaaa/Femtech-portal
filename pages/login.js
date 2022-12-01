import Image from 'next/image';
import React from "react";

import LoginForm from "../components/LoginForm";
import { useAuthContext } from "../store/contexts";
import leftMan from "../images/left_man.svg";
import rightMan from "../images/right_man.svg";

function Page() {
  const [form, setForm] = React.useState();
  const [errors, setErrors] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const { login } = useAuthContext();

  const handleChange = React.useCallback(({ target: { name, value } }) => {
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevState) => ({
      ...prevState,
      [name]: undefined,
    }));
  }, []);

  const handleSubmit = React.useCallback(
    (form) => {
      // api call goes here and then login with data from the api
      setLoading(true);
      setTimeout(() => {
        login();
        setLoading(false);
      }, 3000);
    },
    [login]
  );

  return (
    <div className="bg-gray-200 flex items-center min-h-screen h-full w-full">
      <div className="w-6/12 h-full flex flex-col px-8 mx-6">
        <LoginForm
          form={form}
          onChange={handleChange}
          loading={loading}
          errors={errors}
          setErrors={setErrors}
          onSubmit={handleSubmit}
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
