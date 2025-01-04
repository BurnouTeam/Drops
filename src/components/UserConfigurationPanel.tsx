import { useForm } from "react-hook-form";

const UserConfigurationPanel = ({ user, onUpdate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      profilePhoto: user.profilePhoto || "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    onUpdate(data); // Send updated data to the parent or API
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">User Configuration</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.name ? "border-red-500" : ""
              }`}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Profile Photo */}
          <div>
            <label
              htmlFor="profilePhoto"
              className="block text-sm font-medium text-gray-700"
            >
              Profile Photo URL
            </label>
            <input
              type="text"
              id="profilePhoto"
              {...register("profilePhoto")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              {...register("password")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Read-Only Fields */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <p className="text-gray-500">{user.role?.name || "No Role Assigned"}</p>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Organization</label>
          <p className="text-gray-500">{user.organization?.name || "No Organization Assigned"}</p>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserConfigurationPanel;

