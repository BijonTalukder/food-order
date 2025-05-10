import axios from "axios"
import FileUpload from "../../../component/Forma/FileUpload/FileUpload"
import FormInput from "../../../component/Forma/FormInput"
import Forms from "../../../component/Forma/Forms"
import { BreadcrumbItem } from "../../../constant"
import BradCumbs from "../../../share/BradCumbs/BradCumbs"
import Swal from "sweetalert2"

const CreateProductCategory = () => {
    const BreadCumbsItems:BreadcrumbItem[]=
    [
    {
      title:"DashBoard",
      path:"/dashboard",
      iconType:"folder"
    },
    {
      title:"category",
      path:"/dashboard/category",
      iconType:"file"
    }
    ]

    const handleCategory = async (value: any) => {
      const formData = new FormData();

      const obj = { ...value };
      const file = obj["ImgUrl"];

      formData.append("file", file);

      delete obj["ImgUrl"];
      const strData = JSON.stringify(obj);
      formData.append("data", strData);

      try {
        const response = await axios.post(
          "http://localhost:5000/api/v1/productType/create",
          formData,
          // {
          //   "name":"bijon"
          // },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Handle success
        if (response.data.statusCode == 200) {
          Swal.fire({
            icon: "success",
            timer: 2000,
            title: response.data.message,
          });
        }
        console.log("Category created successfully:", response);
      } catch (error) {
        console.error("Error creating category:", error);
      }
    };
    return (
      <div className='shadow-sm m-3'>
        <div>
          <BradCumbs items={BreadCumbsItems} />
        </div>
        <div className='m-3 shadow-md p-3'>
          <Forms submitHandler={handleCategory}>
            <div className='grid grid-cols-1 gap-2'>
              <div>
                <FormInput
                  name='productTypeName'
                  placeholder='category name'
                  type='text'
                  label='Enter your category name'
                />
              </div>
              <div>
                <FileUpload name='ImgUrl' label='Upload File' />
              </div>
              <div>
                <button type='submit' className='btn btn-success'>
                  Submit
                </button>
              </div>
            </div>
          </Forms>
        </div>
      </div>
    );
}

export default CreateProductCategory