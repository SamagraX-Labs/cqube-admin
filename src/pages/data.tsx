import { useStateContext } from '@/context';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Loader from '@/components/Loader';

const Data = () => {
  const { setTabledata, tabledata, errordata } = useStateContext();
  const [show, setShow] = useState(false);

  // Showing the table after the loop finishes updating the state
  useEffect(() => {
    setTimeout(() => {
      setShow(true)
    }, 1000);
  }, [])

  useEffect(() => {
    let modifiedData = tabledata;

    errordata &&
      errordata?.length > 0 &&
      errordata?.map((data: any) => {
        const value = modifiedData?.[data?.row][data?.col];
        if (!value?.error) {
          modifiedData[data?.row][data?.col] = {
            error: data.error,
            value,
          };
        }
        console.log(value);
      });

    setTabledata(modifiedData);
  }, [errordata, setTabledata, tabledata]);

  return (
    <div className="flex w-[100vw] h-[100vh] overflow-hidden">
      <div className="w-[18%] bg-[#10004f]">
        <Sidebar />
      </div>
      {show ? 
      <div className="relative overflow-auto shadow-md sm:rounded-lg container mx-auto my-10 w-[82%]">
        <table className="w-full text-sm text-left text-gray-500 lg:mx-10">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            {tabledata?.map(
              (data: any, index: any) =>
                index == 0 && (
                  <tr className="bg-gray-100 border-b" key={index}>
                    {data?.map((row: any, ind: any) => (
                      <th className={`px-6 py-4 text-center ${row?.error ? 'bg-red-200' : 'bg-green-200'}`} key={ind}>
                        {row?.error ? row?.error : row}
                      </th>
                    ))}
                  </tr>
                )
            )}
          </thead>
          <tbody>
            {tabledata?.map(
              (data: any, row: any) =>
                row > 0 && (
                  <tr className="bg-white border-b" key={row}>
                    {data?.map((columnData: any, column: any) => (
                      <>
                        <td
                          className={`px-6 py-4 text-center ${
                            columnData?.error ? 'bg-red-200' : 'bg-green-200'
                          } font-regular`}
                          key={column}>
                          {columnData?.error ? columnData?.error : columnData}
                        </td>
                      </>
                    ))}
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div> : <div className='flex items-center justify-center h-[100%] w-[100%]'><Loader/></div>}
    </div>
  );
  
};

export default Data;
