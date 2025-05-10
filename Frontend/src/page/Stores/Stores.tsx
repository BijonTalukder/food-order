import StoreCart from "../../share/StoreCart/StoreCart";

const Stores = ({ data, isLoading }:any) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }
  // const {data,isLoading} = useGetStoreQuery(undefined)
  return (
    <div className="max-w-5xl mx-auto py-10">


      {/* <label className="input input-bordered flex items-center gap-2">
        <input
         value={handleStoreSearch}
         onChange={(e) => setHandleStoreSearch(e.target.value)}
         type="text" className="grow" placeholder="Search" />
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
      </label> */}
      <h2 className="text-3xl font-bold text-center mb-6">Nearby Kitchens</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.data?.map((item: any, index: number) => (
          <StoreCart key={index} data={item} />
        ))}
      </div>
    </div>
  );
};


// Helper function to render star ratings
// const getStars = (rating:any) => {
//   const stars = [];
//   for (let i = 1; i <= 5; i++) {
//     if (i <= rating) {
//       stars.push(<FaStar key={i} className="text-yellow-400" />);
//     } else if (i - rating < 1) {
//       stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
//     } else {
//       stars.push(<FaRegStar key={i} className="text-yellow-400" />);
//     }
//   }
//   return <div className="flex">{stars}</div>;
// };

export default Stores;
