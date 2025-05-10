
const PView = ({ data, fields }:any) => {
  if (!data || !fields) {
    return <div>Loading...</div>; // Handle loading state if data or fields are not available
  }

  return (
    <div className="font-roboto bg-white rounded-lg shadow-md p-4">
      <h1 className="text-2xl font-bold mb-4">Details</h1>
      <div className="grid grid-cols-1 gap-4">
        {fields.map((field:any, index:number) => (
          <div key={index} className="grid grid-cols-2 gap-4">
            <div className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md">{field.label}</div>
            {field.dataIndex === "image" ? (
              <div className=" border border-gray-300 py-2 px-4 rounded-md flex items-center justify-center">
                <img
                  src={data[field.key]}
                  alt={field.label}
                  className="object-cover hover:cursor-zoom-in  hover:grayscale h-48 w-96 rounded-md"
                />
              </div>
            ) : (
              <div className="border border-gray-300 py-2 px-4 rounded-md">{data[field.key]}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PView;
