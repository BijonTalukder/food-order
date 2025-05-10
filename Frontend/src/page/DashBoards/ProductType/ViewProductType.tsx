import { useParams } from "react-router-dom";
import PView from "../../../component/View/PView"; // Adjust the path as per your project structure
import { useGetSingleProdutTypeQuery } from "../../../redux/API/baseApi";

const ViewProductType = () => {
  const {id} = useParams();
  const {data,isLoading} = useGetSingleProdutTypeQuery(id)
  console.log(data);
  


  const productFields = [
    { label: "Name", key: "productTypeName",dataIndex:"productTypeName" },
    { label: "Image", key: "ImgUrl",dataIndex:"image" },
   
   
  ];

  return (
    <div>
      <PView data={data?.data} fields={productFields} />
    </div>
  );
};

export default ViewProductType;
