import { useForm } from "react-hook-form";

import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useEffect } from "react";
import AdminConfPanel from './AdminConfPanel';

const ConfigurationPanel = () => {
  const { user } = useSelector( (state: RootState) => state.user )
  const getDefaultValues = (role?: string) => {
    if (role === "admin") {
      return {
        organizationName: "",
        organizationEmail:  "",
        organizationCNPJ:  "",
        organizationWppNumber: "",
      };
    }
    return {
      name: user?.name || "",
      email: user?.email || "",
      profilePhoto: user?.profilePhoto || "",
      password: "",
    };
  };
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: getDefaultValues(user?.role?.name),
  });

  // Reset the form whenever `data` changes
  useEffect(() => {
    if (user) {
      reset(getDefaultValues(user?.role?.name));
    }
  }, [user, reset]);

  const onSubmit = (data) => {
    // onUpdate(data); // Send updated data to the parent or API
    console.log(data);
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setValue("profilePhoto", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
      <div className="p-6 bg-[#F3F3F3] rounded-2xl w-full h-full">
      {user?.role?.name === "user" && (
        <div>User</div>
      )}
      {user?.role?.name === "admin" && (
        <AdminConfPanel
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
        />
      )}
    </div>
  );
};

export default ConfigurationPanel;
