import React from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

import { useGetLicensePlatesQuery } from "../redux/slices/licensePlate.slice";

const HomeScreen = (query) => {
  var { data, isFetching } = useGetLicensePlatesQuery();

  if (isFetching) {
    return (
      <Skeleton
        style={{
          display: "block",
          margin: "30px auto 0",
          backgroundColor: "#f1f2f3",
        }}
        height="30px"
        width="90%"
        count={12}
      />
    );
  }

  return (
    <div className="space-two-side pt-24 pb-6">
      <table className="w-full mt-5 rounded-md overflow-hidden shadow-xl">
        <thead className="bg-[#6c7ae0]">
          <tr>
            <th
              width="22%"
              className="whitespace-nowrap capitalize text-white py-4"
            >
              biển số
            </th>
            <th
              width="22%"
              className="whitespace-nowrap capitalize text-white py-4"
            >
              giá
            </th>
            <th
              width="22%"
              className="whitespace-nowrap capitalize text-white py-4"
            >
              thời gian
            </th>
            <th
              width="22%"
              className="whitespace-nowrap capitalize text-white py-4"
            >
              ảnh biển số
            </th>
            <th
              width="12%"
              className="whitespace-nowrap capitalize text-white py-4"
            ></th>
          </tr>
        </thead>
        <tbody className="mb-10">
          {data?.map((item) => {
            return (
              <tr className="even:bg-[#f8f6ff]" key={item?.Id}>
                <td
                  width="22%"
                  className="whitespace-nowrap text-center py-2 px-6 md:px-4"
                >
                  {item?.LicensePlate}
                </td>
                <td
                  width="22%"
                  className="whitespace-nowrap text-center py-2 px-6 md:px-4"
                >
                  {item?.Price?.toLocaleString()} VND
                </td>
                <td
                  width="22%"
                  className="whitespace-nowrap text-center py-2 px-6 md:px-4"
                >
                  {item?.CreatedDate?.slice(-8)}
                </td>
                <td
                  width="22%"
                  className="whitespace-nowrap text-center py-2 px-6 md:px-4"
                >
                  <div className="min-w-[96px] w-24 mx-auto">
                    <img
                      className="max-w-full h-auto"
                      src={item?.ImagePath}
                      alt="license plate"
                    />
                  </div>
                </td>
                <td width="12%" className="whitespace-nowrap px-6 md:px-10">
                  <Link to={`/payment/${item?.Id}`}>
                    <p className="capitalize text-center cursor-pointer underline">
                      thanh toán
                    </p>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HomeScreen;
