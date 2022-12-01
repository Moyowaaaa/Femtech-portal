import Image from "next/image";
import React from 'react';

import RegisterForm from "../components/RegisterForm";
import snip1 from "../images/snip1.svg";
import snip2 from "../images/snip2.svg";

const Register = () => {
  const [form, setForm] = React.useState()
  const [errors, setErrors] = React.useState()
  const [loading, setLoading] = React.useState(false)

  const handleChange = React.useCallback(({target: {name, value}}) => {
    setForm(prevState => ({
      ...prevState,
      [name]: value
    }))
    setErrors(prevState => ({
      ...prevState,
      [name]: undefined
    }))
  }, [])

  const handleSubmit = React.useCallback((data) => {
    // api call goes here...
  }, [])

  return (
    <div className="bg-gray-200 min-h-screen h-full w-full">
      <div className="flex items-center w-full h-full">
        <div className="w-6/12 h-full flex flex-col px-8 mx-6">
          <RegisterForm 
            form={form}
            errors={errors}
            loading={loading}
            setErrors={setErrors}
            onSubmit={handleSubmit}
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
