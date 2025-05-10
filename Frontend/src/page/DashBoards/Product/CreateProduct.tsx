import { useState } from "react";
import FileUpload from "../../../component/Forma/FileUpload/FileUpload";
import FormInput from "../../../component/Forma/FormInput";
import Forms from "../../../component/Forma/Forms";
import FormSearchableSelect from "../../../component/Forma/FormSearchableSelect";
import { BreadcrumbItem } from "../../../constant";
import { useGetStoreProductTypeQuery } from "../../../redux/API/baseApi";
import { useCreateProductMutation } from "../../../redux/API/products/productsApi";
import BradCumbs from "../../../share/BradCumbs/BradCumbs";
import Swal from "sweetalert2";

const CreateProduct = () => {
  const [productTypeData, setProductTypeData] = useState<{ label: string; value: string } | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createProduct] = useCreateProductMutation();
  const user = JSON.parse(localStorage.getItem("user") as string);

  const { data: productType, isSuccess } = useGetStoreProductTypeQuery(user?.id || '');

  const BreadCumbsItems: BreadcrumbItem[] = [
    {
      title: "Dashboard",
      path: "/dashboard",
      iconType: "folder",
    },
    {
      title: "Food",
      path: "/dashboard/category",
      iconType: "file",
    },
  ];

  const handleProduct = async (value: any) => {
    setIsSubmitting(true);

    const formData = new FormData();
    const obj = { ...value, productTypeId: productTypeData?.value };
    const file = obj["ImgUrl"];

    if (file instanceof File) {
      formData.append("file", file);
    } else {
      console.error("Invalid file format");
      setIsSubmitting(false);
      return;
    }

    delete obj["ImgUrl"];
    formData.append("data", JSON.stringify(obj));

    try {
      await createProduct(formData).unwrap();
      Swal.fire({
        icon: 'success',
        title: "Product created successfully",
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: "Error creating product",
        text: 'There was an error while creating the product.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectOptions = isSuccess && productType
    ? productType.data.map((i: any) => ({
        label: i.productTypeName,
        value: i._id,
      }))
    : [];

  const select = (value: { label: string; value: string }) => {
    setProductTypeData(value);
  };

  return (
    <div className="container mx-auto p-4">
      <BradCumbs items={BreadCumbsItems} />
      <div className="mt-6 p-6 bg-white shadow-lg rounded-lg">
        <Forms submitHandler={handleProduct}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <FormInput
                id="productName"
                name='productName'
                placeholder='Product Name'
                type='text'
                className="  rounded-lg p-2"
                required
                label="Enter your Food Name"
              />
            </div>
            <div className="flex flex-col">
              <FormInput
               label="Enter your Food description"
                id="description"
                name="description"
                placeholder="Description"
                type="text"
                className="  rounded-lg p-2"
                required
              />
            </div>
            <div className="flex flex-col">
              <FormInput
               label="Enter your Food Price"
                id="price"
                name="price"
                placeholder="Price"
                type="number"
                className="  rounded-lg p-2"
                required
              />
            </div>
            <div className="flex flex-col">
              <FormInput
               label="Enter your Food Quantity"
                id="quantity"
                name="quantity"
                placeholder="Quantity"
                type="number"
                className="  rounded-lg p-2"
                required
              />
            </div>
            <div className="flex flex-col">
              <FormSearchableSelect
                id="productType"
                onSelect={select}
                dataKey="label"
                options={selectOptions}
                className="  rounded-lg p-2"
                placeholder="Select Product Type"
              />
            </div>
            <div className="flex flex-col">
              <FileUpload
                id='ImgUrl'
                name='ImgUrl'
                className="  rounded-lg p-2"
              />
            </div>
            <div className="col-span-2 text-center">
              <button
                type='submit'
                className={`btn ${isSubmitting ? 'bg-gray-400' : 'bg-green-500'} text-white px-6 py-2 rounded-lg transition`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <span className="loading-spinner"></span>
                    <span className='ml-2'>Submitting...</span>
                  </div>
                ) : (
                  'Submit'
                )}
              </button>
            </div>
          </div>
        </Forms>
      </div>
    </div>
  );
}

export default CreateProduct;
