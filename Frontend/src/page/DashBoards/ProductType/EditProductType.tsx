import { useParams } from "react-router-dom";
import Forms from "../../../component/Forma/Forms";
import FormInput from "../../../component/Forma/FormInput";
import {
  useGetSingleProdutTypeQuery,
  useUpdateProductTypeMutation,
} from "../../../redux/API/baseApi";
import SkeletonLoader from "../../../component/Table/SkeletonLoader";
import BradCumbs from "../../../share/BradCumbs/BradCumbs";
import { BreadcrumbItem } from "../../../constant";
import Swal from "sweetalert2";

const EditProductType = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleProdutTypeQuery(id);
  const [updateProductType] = useUpdateProductTypeMutation();

  const BreadCumbsItems: BreadcrumbItem[] = [
    {
      title: "DashBoard",
      path: "/dashboard",
      iconType: "folder",
    },
    {
      title: "category",
      path: "/dashboard/category",
      iconType: "folder",
    },
    {
      title: "edit",
      path: `/dashboard/edit-category-type/${id}`,
      iconType: "file",
    },
  ];

  const onsubmit = async (values: any) => {
    const postData = {
      id: id,
      ...values,
    };

    const res = await updateProductType(postData);
    if (res) {
      Swal.fire({
        icon: "success",
        timer: 2000,
        title:' done updated',
      });
    }
  };
  const defaultValue = {
    productTypeName: data?.data?.productTypeName || "",
  };
  return (
    <div className='shadow-sm m-3'>
      <BradCumbs items={BreadCumbsItems} />
      {isLoading && <SkeletonLoader />}
      <Forms submitHandler={onsubmit} defaultValues={defaultValue}>
        <FormInput name='productTypeName' />
        <button className='btn btn-success mt-1' type='submit'>
          update
        </button>
      </Forms>
    </div>
  );
};

export default EditProductType;
