import { useGetAllProductTypeQuery } from "../../../redux/API/productType/productTypeApi";

interface FilterSectionProps {
    priceRange: number;
    deliveryTime: number;
    category: string;
    selectedCuisines: string[];
    setPriceRange: (value: number) => void;
    setDeliveryTime: (value: number) => void;
    setCategory: (value: string) => void;
    setSelectedCuisines: (value: string[]) => void;
  }
  
  const FilterSection: React.FC<FilterSectionProps> = ({
    priceRange,
    deliveryTime,
    category,
    selectedCuisines,
    setPriceRange,
    setDeliveryTime,
    setCategory,
    setSelectedCuisines,
  }) => {

    const {data,isLoading,isSuccess} = useGetAllProductTypeQuery(undefined)
    
    console.log(data);
    
    
    const handleCuisineChange = (cuisine: string) => {
      if (selectedCuisines.includes(cuisine)) {
        setSelectedCuisines(selectedCuisines.filter((c) => c !== cuisine));
      } else {
        setSelectedCuisines([...selectedCuisines, cuisine]);
      }
    };
  
    return (
      <div className="col-span-3 p-4 shadow-lg rounded-lg bg-white">
        <h1 className="text-xl font-semibold mb-4">Filter</h1>
  
        {/* Category Filter */}
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">Category</h2>
          <div className="space-y-2">
            {isSuccess && data.data.map((item:any) => (
              <label key={item?._id} className="flex items-center space-x-2">
               
                <input
                  type="radio"
                  name="category"
                  value={item?._id}
                  // checked={category === item}
                  onChange={() => setCategory(item?._id)}
                  className="radio radio-primary"
                />
                <span>{item?.productTypeName}</span>
              </label>
            ))}
          </div>
        </div>
  
        {/* Price Range Filter */}
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">Price Range (0 - 2000 ৳)</h2>
          <input
            type="range"
            min="0"
            max="2000"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="range range-primary"
          />
          <div className="text-gray-600 text-sm text-right mt-1">
            Selected: {priceRange} ৳
          </div>
        </div>
  
        {/* Delivery Time Filter */}
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">Delivery Time (0 - 100 min)</h2>
          <input
            type="range"
            min="0"
            max="100"
            value={deliveryTime}
            onChange={(e) => setDeliveryTime(Number(e.target.value))}
            className="range range-primary"
          />
          <div className="text-gray-600 text-sm text-right mt-1">
            Selected: {deliveryTime} min
          </div>
        </div>
  
        {/* Cuisine Filter */}
        {/* <div>
          <h2 className="text-lg font-medium mb-2">Cuisines</h2>
          <div className="space-y-2">
            {["Fast Food", "Burger", "Biryani", "Pizza", "Sweets", "Chicken"].map((cuisine) => (
              <label key={cuisine} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedCuisines.includes(cuisine)}
                  onChange={() => handleCuisineChange(cuisine)}
                  className="checkbox checkbox-primary"
                />
                <span>{cuisine}</span>
              </label>
            ))}
          </div>
        </div> */}
      </div>
    );
  };
  
  export default FilterSection;
  