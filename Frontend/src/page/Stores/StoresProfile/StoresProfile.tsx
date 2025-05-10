import { useParams } from 'react-router-dom';
import Img from '../../../assets/back.jpg';
import { useGetSingleProdutTypeQuery } from '../../../redux/API/baseApi';
import FoodCart from '../../../share/FoodCart/FoodCart';
import Cart from '../Cart/Cart';
import './StoreProfile.css';
import { store } from '../../../redux/store';
import { useGetSingleStoreQuery } from '../../../redux/API/stores/storeApi';
import { useGetProductByStoreQuery } from '../../../redux/API/products/productsApi';

const StoresProfile = () => {
  const { id } = useParams();

  const {data:storeData,isSuccess,isLoading} = useGetSingleStoreQuery(id);

  const {data:productData,isSuccess:productSuccess,isLoading:productLoading} = useGetProductByStoreQuery(id);
  
  console.log(productData)
  return (
    <div className="relative storeProfile shadow-sm m-3 p-4 bg-white rounded-lg">
      {/* Full-width Image */}
      <div className="storeImage relative  max-h-[120px] rounded-lg overflow-hidden mb-4">
        <img className="object-cover w-full h-full" src={isSuccess && storeData?.data[0]?.imgUrl} alt="Store Background" />
      </div>

      {/* Profile and Bio Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Profile Section */}
        <div className="profile flex items-center col-span-12 md:col-span-2 space-x-4">
          <div className="avatar shadow-md w-full">
            <div className="w-full rounded">
              <img src={isSuccess && storeData?.data[0]?.imgUrl} alt="Avatar" />
            </div>
          </div>
        </div>

        {/* Store Details Section */}
        <div className="StoreDetails col-span-12 md:col-span-8 p-4">
          <h1 className="text-xl font-bold">{ isSuccess && storeData?.data[0]?.storeName}</h1>
          <p className="text-sm text-gray-600">North Indian · Indian</p>
          <div className="body space-y-4 mt-2">
            <div className="information flex justify-between text-sm text-gray-600">
              <div className='grid gap-1 grid-cols-12 w-full'>
                <div className='col-span-4 p-4 border rounded shadow-md'>
                  <div className="text-lg font-semibold">4.1</div>
                  <div className="text-sm text-gray-600">Review</div>
                </div>
                <div className='col-span-4 p-4 border rounded shadow-md'>
                  <div className="text-lg font-semibold">5.7k</div>
                  <div className="text-sm text-gray-600">Delivery</div>
                </div>
              </div>
            </div>
            <div className="bio mt-2">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse necessitatibus inventore sed id modi odit facere, nisi corrupti nobis nulla?</p>
            </div>
          </div>
        </div>

        {/* Others Section */}
        <div className="others col-span-12 md:col-span-2 shadow-md p-4">
          asdafs
        </div>
      </div>

      {/* Menu Nav */}
      <div className="navBar mt-4 sticky top-0 z-10">
        <div className="sticky top-0 z-10 bg-white shadow-md py-2">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-2">
              <label className="input input-bordered flex items-center gap-2 border p-2 rounded">
                <input type="text" className="grow outline-none" placeholder="Search" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70">
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd" />
                </svg>
              </label>
            </div>
            <div className="col-span-10 flex items-center space-x-4">
              <ul className="flex space-x-4">
                <li className="cursor-pointer hover:bg-gray-200 px-2 py-1 rounded">Popular</li>
                <li className="cursor-pointer hover:bg-gray-200 px-2 py-1 rounded">Biryani</li>
                <li className="cursor-pointer hover:bg-gray-200 px-2 py-1 rounded">Dal</li>
                <li className="cursor-pointer hover:bg-gray-200 px-2 py-1 rounded">Dim</li>
              </ul>
            </div>

            {/* stores food section */}
           
          </div>
        </div>
      </div>


      {/* body section */}
      <div className='grid grid-cols-4 gap-1 mt-3'>
     
        <div className='col-span-3'>
          <div className='grid grid-cols-2 gap-2'>
          {
          productSuccess && productData.data.map((item:any,index:number)=><FoodCart data={item} />)
        }

          </div>
       
        </div>
        <div className='col-span-1'>

          <div>

            
          </div>

        <div className='col-span-1 sticky'>
<Cart/>
</div>
      </div>
    </div>
    </div>
  );
};

export default StoresProfile;
