import React, { useState } from 'react';
import { useGetOrderByStoreQuery, useUpdateOrderMutation } from '../../../../redux/API/order/orderApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import Pagination from '../../../../component/Pagination/Pagination';
import Swal from 'sweetalert2';

const SellerOrderManagement = () => {
  const userData = useSelector((state: RootState) => state.user.userData);
  console.log(userData.storeId);

  const [filter, setFilter] = useState('');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('orderId'); // Default sort field
  const [sortOrder, setSortOrder] = useState('asc'); // Default sort order
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);

  const { data, isLoading, isSuccess } = useGetOrderByStoreQuery({
    storeId: userData.storeId,
    orderStatus: filter,
    sortBy,
    sortOrder,
  });

  const [setUpdateOrderData,{isSuccess:updateOrderSuccess}] = useUpdateOrderMutation()

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };


  const handleAcceptOrder = async(orderId: string) => {
    console.log(orderId);
    
   const res= await setUpdateOrderData({id:orderId,data:{orderStatus:"Accepted"}})
   console.log(res);
   
    if(updateOrderSuccess)
    {
      Swal.fire({
        icon: 'success',
        title: 'Order Accepted',
      })
    }
    // Logic to accept the order
  };

  const handleRejectOrder = (orderId: string) => {
    // Logic to reject the order
  };

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'badge-warning';
      case 'Accepted':
        return 'badge-success';
      case 'Rejected':
        return 'badge-error';
      default:
        return 'badge-neutral';
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      {/* Header, Filter, and Sorting */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Order Management</h1>

        <div className="flex items-center space-x-4">
          {/* Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-600 font-medium">Filter:</span>
            <select
              className="select select-bordered select-sm w-full md:w-auto"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-600 font-medium">Sort By:</span>
            <select
              className="select select-bordered select-sm w-full md:w-auto"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="orderId">Order ID</option>
              <option value="placedAt">Order Date</option>
              <option value="totalAmount">Total Amount</option>
              <option value="orderStatus">Order Status</option>
            </select>
          </div>

          {/* Sort Order */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-600 font-medium">Order:</span>
            <select
              className="select select-bordered select-sm w-full md:w-auto"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>

      {/* No Orders State */}
      {isSuccess && data?.data?.orders?.length === 0 && (
        <div className="alert alert-info shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>No orders found matching the selected filter</span>
          </div>
        </div>
      )}

      {/* Orders List */}
      <div className="space-y-4">
        {data?.data?.orders.map((order: any) => (
          <div
            key={order._id}
            className={`card bg-white shadow-md rounded-lg border border-gray-200 transition-all duration-300 hover:shadow-lg ${expandedOrder === order._id ? 'border-blue-400' : ''
              }`}
          >
            {/* Order Header */}
            <div
              className="card-header flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleOrderExpansion(order._id)}
            >
              <div className="flex items-center space-x-4">
                <span
                  className={`badge ${getStatusBadge(order.orderStatus)} badge-md`}
                >
                  {order.orderStatus.charAt(0).toUpperCase() +
                    order.orderStatus.slice(1)}
                </span>
                <div>
                  <div className="font-bold text-lg text-gray-800">{order.userId}</div>
                  <div className="text-sm text-gray-500">Order #{order.orderId}</div>
                </div>
              </div>
              <div className="text-xl font-semibold text-blue-600">
                ${order.totalAmount.toFixed(2)}
              </div>
            </div>

            {/* Order Details */}
            {expandedOrder === order._id && (
              <div className="card-body p-4 bg-gray-50">
                <div className="text-sm text-gray-600">
                  <strong>Order Details:</strong>
                </div>
                <ul className="list-disc ml-6 mt-2 space-y-2 text-gray-700">
                  {order.items.map((item: any, index: number) => (
                    <li key={index}>
                      {item.productName} - ${item.price.toFixed(2)} x {item.quantity}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex justify-between text-gray-800">
                  <div>
                    <strong>Order Date:</strong> {new Date(order.placedAt).toLocaleString()}
                  </div>
                  <div>
                    <strong>Total:</strong> ${order.totalAmount.toFixed(2)}
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleAcceptOrder(order._id)}
                    className="btn btn-sm btn-success"
                  >
                    Ready Order
                  </button>
                  {/* <button
                    onClick={() => handleRejectOrder(order._id)}
                    className="btn btn-sm btn-error"
                  >
                    Reject Order
                  </button> */}
                </div>
              </div>
            )}
          </div>
        ))}

      </div>

      <Pagination
        onPageChange={handlePageChange}
        total={data?.data?.pagination?.total}
        limit={data?.data?.pagination?.limit}
        page={data?.data?.pagination?.page}
        totalPages={data?.data?.totalPages}
      />
    </div>
  );
};

export default SellerOrderManagement;
