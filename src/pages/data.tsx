import { useStateContext } from '@/context';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';

const Data = () => {
  const { setTabledata, tabledata, errordata } = useStateContext();

  useEffect(() => {
    let modifiedData = tabledata;
    console.log(errordata)
    
      errordata && errordata?.length > 0 &&
      errordata?.map((data: any) => {   
        const value = modifiedData?.[data?.row][data?.col];
        console.log(value);
        modifiedData[data?.row][data?.col] = {
          error: data.error,
          value,
        };        
      });
    
    setTabledata(modifiedData);     
  }, [errordata, setTabledata, tabledata]);

  return (
    <div className="flex w-[100vw] h-[100vh] overflow-hidden">
      <div className="w-[18%] bg-[#10004f]">
        <Sidebar/>
      </div>
      <div className="relative overflow-auto shadow-md sm:rounded-lg container mx-auto my-10 w-[82%]">
        <table className="w-full text-sm text-left text-gray-500 lg:mx-10">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            {tabledata?.map(
              (data: any, index: any) =>
                index == 0 && (
                  <tr className="bg-gray-100 border-b" key={index}>
                    {data?.map((row: any) => (
                      <th className="px-6 py-4 text-center" key="">
                        {row}
                      </th>
                    ))}
                  </tr>
                )
            )}
          </thead>
          <tbody>
            {/* {console.log("tabledata", tabledata)} */}
            {tabledata?.map(
              (data: any, row: any) =>
                row > 0 && (
                  <tr className="bg-white border-b" key={row}>
                    {data?.map((columnData: any, column: any) => (
                      <>
                        {columnData?.error ? (
                          <td
                            className="px-6 py-4 text-center bg-red-200 font-regular"
                            key={column}>
                            {columnData?.value}
                          </td>
                        ) : (
                          <td
                            className="px-6 py-4 text-center bg-green-200 font-regular"
                            key={column}>
                            {columnData}
                          </td>
                        )}
                      </>
                    ))}
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Data;
