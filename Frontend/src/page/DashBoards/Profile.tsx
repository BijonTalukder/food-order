import React, { useState } from "react";
import { StorageManagerCustom } from "../../helpers/SessionHelper";
import { useGetSingleStoreQuery } from "../../redux/API/stores/storeApi";
// import { store } from "../../redux/store";


export interface User {
  id?: string;
  name?: string;
  email?: string;
  storeId?: string;
}
const Profile = () => {
  const sessionManager = new StorageManagerCustom<User>("local");
  const user = sessionManager.getItem("user");

  const { data, isLoading, isSuccess } = useGetSingleStoreQuery(user?.storeId);
  const storeData = data?.data[0] || null;

  const [isOpen, setIsOpen] = useState(false);
  const [profileImage, setProfileImage] = useState("/default-restaurant.png");
  const [workingHours, setWorkingHours] = useState({
    start: "10:00",
    end: "22:00"
  });

  const [isEditing, setIsEditing] = useState(false);

  const restaurantData = {
    name: "Tasty Bites Cafe",
    address: "123 Culinary Street, Foodville",
    description: "Serving local flavors with passion since 2015",
    cuisine: "Modern Local",
  };

  const handleImageUpload = (event:React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?event?.target?.files[0]: null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWorkingHoursChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWorkingHours(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Profile Image */}
            <div className="avatar relative">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={storeData?.imgUrl} alt="Restaurant" />
                <label className="absolute bottom-0 right-0 cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageUpload}
                    accept="image/*"
                  />
                  <span className="btn btn-xs btn-circle btn-primary absolute bottom-0 right-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                </label>
              </div>
            </div>

            {/* Restaurant Details */}
            <div className="flex-1">
              <h2 className="card-title">{storeData?.storeName}</h2>
              <p className="text-sm text-gray-500">{storeData?.pointLocation?.storeAddress}</p>

              <div className="mt-4 flex items-center space-x-4">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text mr-2">Restaurant Status</span>
                    <input
                      type="checkbox"
                      className="toggle toggle-success"
                      checked={isOpen}
                      onChange={() => setIsOpen(!isOpen)}
                    />
                  </label>
                </div>
                <span className={`badge ${isOpen ? 'badge-success' : 'badge-error'}`}>
                  {isOpen ? 'Open' : 'Closed'}
                </span>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div>
              <h3 className="font-bold">Restaurant Details</h3>
              <ul className="list-disc list-inside">
                <li>Cuisine: {restaurantData.cuisine}</li>
                <li>
                  Working Hours:
                  {isEditing ? (
                    <div className="flex items-center space-x-2 mt-2">
                      <input
                        type="time"
                        name="start"
                        value={workingHours.start}
                        onChange={handleWorkingHoursChange}
                        className="input input-bordered input-sm w-24"
                      />
                      <span>to</span>
                      <input
                        type="time"
                        name="end"
                        value={workingHours.end}
                        onChange={handleWorkingHoursChange}
                        className="input input-bordered input-sm w-24"
                      />
                      <button
                        className="btn btn-xs btn-primary"
                        onClick={() => setIsEditing(false)}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <span className="ml-2">
                      {storeData?.operatingHours.open} - {storeData?.operatingHours.close}
                      <button
                        className="btn btn-xs btn-ghost ml-2"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit
                      </button>
                    </span>
                  )}
                </li>
              </ul>
              <p className="text-sm mt-2">{restaurantData.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;