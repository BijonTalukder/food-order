import { useEffect, useState } from "react";
import FileUpload from "../../../component/Forma/FileUpload/FileUpload";
import FormInput from "../../../component/Forma/FormInput";
import Forms from "../../../component/Forma/Forms";
import { BreadcrumbItem } from "../../../constant";
import { useCreateStoreMutation } from "../../../redux/API/stores/storeApi";
import BradCumbs from "../../../share/BradCumbs/BradCumbs";
import FormSelect from "../../../component/Forma/FormSelect";

const CreateStores = () => {
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);
  const [operatingHours, setOperatingHours] = useState({ open: "10:00", close: "22:00" });

  const [setStore] = useCreateStoreMutation();
  const BreadCumbsItems: BreadcrumbItem[] = [
    {
      title: "DashBoard",
      path: "/dashboard",
      iconType: "folder",
    },
    {
      title: "Create Store",
      path: "/dashboard/create-store",
      iconType: "file",
    },
  ];

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCoordinates({ latitude, longitude });
    });
  }, []);

  const handleStore = async (values: any) => {
    if (!coordinates) {
      console.error("Location not available");
      return;
    }
    const formData = new FormData();
    const { storeAddress, ...data } = values;
    const file = data["imgUrl"];
    console.log(file);
    

    formData.append("file", file);

    delete data["imgUrl"];
    const bodyData = {
      ...data,
      pointLocation: {
        storeAddress: storeAddress,
        coordinates: [coordinates.longitude, coordinates.latitude],
      },
      operatingHours, // Include operating hours in the form data
    };
    const strData = JSON.stringify(bodyData);
    formData.append("data", strData);

    await setStore(formData).unwrap();
    console.log(bodyData);
  };

  const handleOperatingHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOperatingHours({ ...operatingHours, [e.target.name]: e.target.value });
  };

  return (
    <div className="shadow-sm m-3 bg-gray-100 rounded-lg">
      <div className="p-4">
        <BradCumbs items={BreadCumbsItems} />
      </div>
      <div className="m-3 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Create Store</h2>
        <Forms submitHandler={handleStore}>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <FormInput
                name="storeName"
                placeholder="Store Name"
                type="text"
                label="Enter your store name"
              />
            </div>
            <div>
              <FormInput
                name="storeAddress"
                placeholder="Store Address"
                type="text"
                label="Enter your store address"
              />
            </div>

            <div>
              <FormSelect
                name="status"
                defaultValue={"open"}
                options={[
                  { label: "Open", value: "open" },
                  { label: "Close", value: "close" },
                  { label: "Busy", value: "busy" },
                ]}
                label="Select Store Status"
              />
            </div>

            {/* Operating Hours */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-600">Operating Hours</span>
              </label>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="label">
                    <span className="label-text text-sm text-gray-500">Open</span>
                  </label>
                  <input
                    type="time"
                    name="open"
                    className="input input-bordered w-full"
                    value={operatingHours.open}
                    onChange={handleOperatingHoursChange}
                    required
                  />
                </div>

                <div>
                <FormInput
                name="storeDetails"
                placeholder="Store details"
                type="text"
                label="Enter your store details"
              />
                </div>
                <div className="flex-1">
                  <label className="label">
                    <span className="label-text text-sm text-gray-500">Close</span>
                  </label>
                  <input
                    type="time"
                    name="close"
                    className="input input-bordered w-full"
                    value={operatingHours.close}
                    onChange={handleOperatingHoursChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <FileUpload name="imgUrl" label="Upload Store Photo" />
            </div>
            <div className="col-span-2">
              <button type="submit" className="btn btn-success w-full">
                Submit
              </button>
            </div>
          </div>
        </Forms>
      </div>
    </div>
  );
};

export default CreateStores;
