import PTable from "../../../component/Table/PTable";
import { Link } from "react-router-dom";
import { FaEdit, FaEye } from "react-icons/fa";
import { useGetProductByStoreQuery } from "../../../redux/API/products/productsApi";
import { StorageManagerCustom } from "../../../helpers/SessionHelper";


interface IuserData {

    email: string,
    id: string,
    storeId: string

}
const ListProduct = () => {

    const storageMenager = new StorageManagerCustom<IuserData>("local");
    const userData = storageMenager.getItem("user")
    const { data, isLoading } = useGetProductByStoreQuery(userData?.storeId);

    const dataSource = data?.data;
    console.log(dataSource);
    
    const columns = [
        {
            ImgUrl: "",
            dataIndex: "ImgUrl",
            key: "image",
        },
        {
            title: "Name",
            dataIndex: "productName",
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

export default ListProduct;
