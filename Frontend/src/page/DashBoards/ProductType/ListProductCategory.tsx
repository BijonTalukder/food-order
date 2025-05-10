import Swal from "sweetalert2";
import PTable from "../../../component/Table/PTable";
import axios from "axios";
import { useEffect, useState } from "react";
import { useGetProductTypeQuery } from "../../../redux/API/baseApi";
import { Link } from "react-router-dom";
import { FaEdit, FaEye } from "react-icons/fa";

const ListProductCategory = () => {
  // const [data, setData] = useState("");
  const { data, isLoading } = useGetProductTypeQuery(undefined);
  console.log(data, "data from reduxx");
  // const getData = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:5000/api/v1/productType/"
  //     );

  //     // Handle success
  //     if (response.data.statusCode == 200) {
  //       console.log(response.data);
  //       setData(response.data.data);

  //       Swal.fire({
  //         icon: "success",
  //         timer: 2000,
  //         title: response.data.message,
  //       });
  //     }
  //     console.log("Category created successfully:", response);
  //   } catch (error) {
  //     console.error("Error creating category:", error);
  //   }
  // };
  // useEffect(() => {
  //   getData();
  // }, []);
  const dataSource = data?.data;
  // const dataSource = [
  //   {
  //     key:"0",
  //     name:"Img",
  //     imgUrl:"asdfa"

  //   },
  //   {
  //     key: "1",
  //     name: "Mike",
  //     age: 32,
  //     address: "10 Downing Street",
  //   },
  //   {
  //     key: "2",
  //     name: "John",
  //     age: 42,
  //     address: "10 Downing Street",
  //   },
  // ];
  const columns = [
    {
      ImgUrl: "",
      dataIndex: "ImgUrl",
      key: "image",
    },
    {
      title: "Name",
      dataIndex: "productTypeName",
      key: "name",
    },
    {
      title: "created date",
      dataIndex: "createdAt",
      key: "date",
    },
    {
      title: "action",
      render: function (data: any) {
        return (
          <>
            <Link to={`/dashboard/view-category/${data._id}`}>
              <button
                className='btn btn-primary'
                style={{
                  margin: "0px 5px",
                }}
                onClick={() => console.log(data)}
              >
                <FaEye />{" "}
              </button>
            </Link>
            <Link to={`/dashboard/edit-category-type/${data._id}`}>
              <button
                className='btn btn-primary'
                style={{
                  margin: "0px 5px",
                }}
                onClick={() => console.log(data)}
              >
                <FaEdit />{" "}
              </button>
            </Link>
          </>
        );
      },
    },
  ];
  return (
    <div className='shadow-sm m-3'>
      <PTable data={dataSource} columns={columns} />
    </div>
  );
};

export default ListProductCategory;
