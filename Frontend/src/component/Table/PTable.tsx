
import SkeletonLoader from "./SkeletonLoader";
import Pagination from "../Pagination/Pagination";

const PTable = ({ data, columns }: any) => {
  const isLoading = !data || data.length === 0;

  return (
    <div>
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <>
          <div className='search-filter-section shadow-md p-2 m-2'>
            <input
              type='text'
              placeholder='Type here'
              className='input input-bordered w-full max-w-xs'
            />
          </div>

          <div className='overflow-x-auto shadow-md p-2 m-2'>
            <table className='table'>
              <thead>
                <tr>
                  {columns.map((column: any) => (
                    <th key={column.key}>{column.title}</th>
                  ))}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.map((item: any, index: any) => (
                  <tr key={index}>
                    {columns.map((column: any) => 
                      {
                        if(column.dataIndex=="ImgUrl")
                          {
                            return <td>
                            <div className="flex items-center gap-3">
                              <div className="avatar">
                                <div className="mask mask-squircle h-12 w-12">
                                  <img
                                    src={item[column.dataIndex]}
                                    alt="Avatar Tailwind CSS Component" />
                                </div>
                              </div>
                              <div>
                                <div className="font-bold">Hart Hagerty</div>
                                <div className="text-sm opacity-50">United States</div>
                              </div>
                            </div>
                          </td>
                          }
                          else if(column.title=="action"){
                            return <td key={column.key}>
                              {column.render(item)}
                            
                            </td>
                          //    <td key={column.key}>
                          //   <button
                          //     style={{ margin: "0px 5px" }}
                          //     onClick={() => console.log(item)}
                          //   >
                          //     {column.render ? column.render(item) : "Action"}
                          //   </button>
                          // </td>

                          }
                          else {
                            return <td key={column.key}>{item[column.dataIndex]?item[column.dataIndex]:"---"}</td>
                          }
                      }
                    
                    )}
                  
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  {columns.map((column: any) => (
                    <th key={column.key}>{column.title}</th>
                  ))}
                  <th></th>
                </tr>
              </tfoot>
            </table>
          </div>
          {/* <Pagination /> */}
        </>
      )}
    </div>
  );
};


export default PTable;
