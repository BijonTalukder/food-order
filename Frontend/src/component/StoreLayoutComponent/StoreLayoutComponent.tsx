import { useCallback, useEffect, useState } from "react";
import { useGetStoreQuery } from "../../redux/API/stores/storeApi";
import FilterSection from "../../page/Stores/FilterSection/FilterSection";
import Stores from "../../page/Stores/Stores";
import { useLocation } from "react-router-dom";
import { debounce } from "../../utility/debounce";

const StoreLayoutComponent = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const lat = parseFloat(queryParams.get("lat") || "0");
  const lng = parseFloat(queryParams.get("lng") || "0");

  const [priceRange, setPriceRange] = useState(0);
  const [deliveryTime, setDeliveryTime] = useState(0);
  const [category, setCategory] = useState("");
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const debounceSearch = useCallback(
    debounce((term: string) => setDebouncedSearchTerm(term), 500),
    []
  );

  useEffect(() => {
    debounceSearch(searchTerm);
  }, [searchTerm, debounceSearch]);

  const { data, isLoading } = useGetStoreQuery({
    priceRange,
    deliveryTime,
    category,
    cuisines: selectedCuisines,
    lat,
    lng,
    search: debouncedSearchTerm,
  });

  return (
    <div className="grid grid-cols-12 gap-4 p-4">
      <FilterSection
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        deliveryTime={deliveryTime}
        setDeliveryTime={setDeliveryTime}
        category={category}
        setCategory={setCategory}
        selectedCuisines={selectedCuisines}
        setSelectedCuisines={setSelectedCuisines}
      />
      <div className="col-span-9">
        <div>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="grow"
              placeholder="Search"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
        {isLoading ? <div>Loading...</div> : <Stores data={data} />}
      </div>
    </div>
  );
};

export default StoreLayoutComponent;
