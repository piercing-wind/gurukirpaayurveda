'use client';
import {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
 } from "@/components/ui/table"
import { OrdersData, ShippingAddress, OrderCardData, CartCard, Order } from '@/types/type';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from "react";
import { FilterIcon, TriangleAlert, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Pagination from "@/components/admin/pagination";
import { deleteOrderById, getAllOrders } from "@/data/admin";
import { ClipLoader } from "react-spinners";

const formatDate = (dateString: Date) => {
   const options: Intl.DateTimeFormatOptions = {
     weekday: 'short',
     year: 'numeric',
     month: 'short',
     day: 'numeric',
     hour: '2-digit',
     minute: '2-digit',
     second: '2-digit',
     timeZoneName: 'short'
   };
   return new Date(dateString).toLocaleDateString('en-IN', options);
 };

const ShippingAddressCard: React.FC<{ address: ShippingAddress, close : (v:string | null)=>void }> = ({address, close}) => {
   return (
     <div className=" absolute top-[20%] flex-shrink-0  max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white z-50">
       <div className="font-bold text-xl mb-2 flex items-center justify-between">Shipping Address <X onClick={()=>close(null)} className="cursor-pointer"/></div>
       
       <p className="text-gray-700 text-base"><strong>Phone:</strong>+{address.phone.slice(0, 2)} {address.phone.slice(2, 7)} {address.phone.slice(7)}</p>
       <p className="text-gray-700 text-base"><strong>Country:</strong> {address.country}</p>
       <p className="text-gray-700 text-base"><strong>Address:</strong> {address.address}</p>
       <p className="text-gray-700 text-base"><strong>State:</strong> {address.state}</p>
       <p className="text-gray-700 text-base"><strong>City:</strong> {address.city}</p>
       <p className="text-gray-700 text-base"><strong>ZIP:</strong> {address.zip}</p>
       {address.otherInformation && (
         <p className="text-gray-700 text-base"><strong>Other Information:</strong> {address.otherInformation}</p>
       )}
     </div>
   );
 };

 const OrderCard: React.FC<{ order: OrderCardData, close: (v: string | null) => void }> = ({ order, close }) => {
   const { shipping_address, carrier, tracking_number_waybill, shipping_status, delivery_charge, estimated_delivery, responseDelhivery, updatedAt } = order;
   return (
     <div className="absolute top-[20%] w-full max-w-lg rounded overflow-hidden shadow-lg p-6 bg-white z-20 border right-8">
       <div className="font-bold text-xl mb-4 flex items-center justify-between">
         Order Details <X onClick={() => close(null)} className="cursor-pointer" />
       </div>
       <div className="mb-4">
         <h2 className="font-bold text-lg">Shipping Address</h2>
         <p className="text-gray-700"><strong>Name:</strong> {shipping_address.name}</p>
         <p className="text-gray-700"><strong>Phone:</strong>+{shipping_address.phone.slice(0, 2)} {shipping_address.phone.slice(2, 7)} {shipping_address.phone.slice(7)}</p>
         <p className="text-gray-700"><strong>Country:</strong> {shipping_address.country}</p>
         <p className="text-gray-700"><strong>Address:</strong> {shipping_address.address}</p>
         <p className="text-gray-700"><strong>State:</strong> {shipping_address.state}</p>
         <p className="text-gray-700"><strong>City:</strong> {shipping_address.city}</p>
         <p className="text-gray-700"><strong>ZIP:</strong> {shipping_address.zip}</p>
         {shipping_address.otherInformation && (
           <p className="text-gray-700"><strong>Other Information:</strong> {shipping_address.otherInformation}</p>
         )}
       </div>
       <div className="mb-4">
         <h2 className="font-bold text-lg">Order Information</h2>
         <p className="text-gray-700"><strong>Carrier:</strong> {carrier}</p>
         <p className="text-gray-700"><strong>Tracking Number:</strong> {tracking_number_waybill}</p>
         <p className="text-gray-700"><strong>Shipping Status:</strong> {shipping_status}</p>
         <p className="text-gray-700"><strong>Delivery Charge:</strong> {delivery_charge}</p>
         <p className="text-gray-700"><strong>Estimated Delivery:</strong> {new Date(estimated_delivery).toLocaleString()}</p>
         <p className="text-gray-700"><strong>Last Updated:</strong> {new Date(updatedAt).toLocaleString()}</p>
       </div>
       <div className="mb-4">
         <h2 className="font-bold text-lg">Response Delhivery</h2>
         <p className="text-gray-700"><strong>Upload WBN:</strong> {responseDelhivery.upload_wbn}</p>
         <p className="text-gray-700"><strong>COD Amount:</strong> {responseDelhivery.cod_amount}</p>
         <p className="text-gray-700"><strong>Success:</strong> {responseDelhivery.success ? 'Yes' : 'No'}</p>
       </div>
     </div>
   );
 };

 const CartDataCard: React.FC<{ cart: CartCard[], close: (v: string | null) => void }> = ({ cart, close }) => {
   const calculateDiscountedPrice = (price: number, discount: string) => {
      const discountPercentage = parseFloat(discount) / 100;
      return price - (price * discountPercentage);
    };

    const Total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const TotalAfterDiscount = cart.reduce((acc, item) => {
      const discountedPrice = calculateDiscountedPrice(item.price, item.discount);
      return acc + discountedPrice * item.quantity;
    }, 0);

    const TotalSavings = cart.reduce((acc, item) => {
      const discountAmount = item.price - calculateDiscountedPrice(item.price, item.discount);
      return acc + discountAmount * item.quantity;
    }, 0);
   return (
      <div className="absolute top-[20%] w-full max-w-lg rounded overflow-hidden shadow-lg p-6 bg-white z-20 border right-8">
         <X onClick={() => close(null)} className="cursor-pointer absolute right-2 top-1" />
      {cart.map(item => (
        <div key={item.id} className="flex items-center p-4 bg-white shadow-md rounded-lg mb-4">
          <div className="relative w-24 h-24">
            <Image
              src={item.image}
              alt={item.name}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="flex flex- gap-4 flex-wrap flex-grow ml-4">
            <h3 className="text-sm font-semibold">{item.name}</h3>
            <p className="text-gray-500">₹ {item.price.toFixed(2)}</p>
            {/* <p className="text-gray-500">{item.description}</p> */}
            <p className="text-gray-500">Discount: {item.discount}</p>
            <p className="text-gray-500">Rating: {item.rating}</p>
            <p className="text-gray-500">Category: {item.category}</p>
            <p className="text-gray-900">Quantity: {item.quantity}</p>
          </div>
        </div>
      ))}
       <p><span className="font-medium">Total :  ₹</span>{Total}</p>
       <p className="text-red-500"><span className="font-medium text-red-500">Discount :  ₹</span>{TotalSavings}</p>
       <p><span className="font-medium">Billed :  ₹</span>{TotalAfterDiscount}</p>
       <p className="text-xs">price is without the delivery charge!</p>
    </div>
   );
 };

 const OrderIdSearch: React.FC<{onSearch : (v: string)=>void,  close: (v: boolean) => void }> = ({ onSearch, close }) => {
   const [orderId, setOrderId] = useState('');
   const router = useRouter()
   const handleSearch = () => {
   close(false);
   onSearch(orderId);
   };
   const handleClear = () => {
      // router.back()
      router.push('/admin');
      close(false);
   }
 
   return (
     <div className="absolute left-14 top-14 bg-white z-50 mb-4 p-2 gap-4 border border-gray-300 rounded flex flex-col items-center">
      <div className="flex items-center gap-2">
       <input
         type="text"
         value={orderId}
         onChange={(e) => setOrderId(e.target.value)}
         placeholder="Enter Order ID"
         className="p-2 border border-gray-300 rounded mr-2"
       />
       <X onClick={() => close(false)} className="cursor-pointer right-2 top-1" />
      </div >
      <div className="flex items-center w-full gap-4">
        <button onClick={handleSearch} className="p-2 bg-gold w-full text-white rounded box-border">
          Search
        </button>
        <button onClick={handleClear} className="p-2 border border-gold w-full text-gold rounded box-border">
          Clear Filter
        </button>
      </div>
     </div>
   );
 };

const DeleteOrder: React.FC<{ onDelete: ()=>void, close: (v: string | null) => void }> = ({ onDelete, close }) => {
   const handleDelete = async () => {
      await onDelete();
      close(null);
   };
 
   return (
     <div className="absolute top-[20%] w-full max-w-lg rounded overflow-hidden shadow-lg p-6 bg-white z-20 border right-8">
       <div className="font-bold text-xl mb-4 flex items-center justify-between">
         Delete Order <X onClick={() => close(null)} className="cursor-pointer" />
       </div>
       <p className="text-lg">Are you sure you want to delete this order?</p>
         <p>This action cannot be undone.</p>
       <div className="flex gap-4 mt-4">
         <Button onClick={handleDelete} className="bg-red-500" variant={'default'}>
           Delete
         </Button>
         <Button onClick={() => close(null)} className="bg-gold" variant={'default'}>
           Cancel
         </Button>
       </div>
     </div>
   );
 }


export const OrdersList = ({ page, pageSize, orderIdFilter }: { page : number, pageSize : number, orderIdFilter :{ order_id?: string }}) => {

   const [showShippingAddress, setShowShippingAddress] = useState<string | null>(null);
   const [showOrderDetail, setShowOrderDetail] = useState<string | null>(null);
   const [shorCart, setShowCart] = useState<string | null>(null);
   const [openSearch, setOpenSearch] = useState<boolean>(false);
   const [deleteOrder, setDeleteOrder] = useState<string | null>(null);
   const [currentPage, setCurrentPage] = useState<number>(1);
   const [totalPages, setTotalPages] = useState<number>(1);
   const router = useRouter();
   const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
   const [loading, setLoading] = useState<boolean>(true);
   
    useEffect(() => {
      setLoading(true);
      const fetchData = async () => {
        const data = await getAllOrders(page, pageSize, orderIdFilter);
        setFilteredOrders(data.orders);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
        setLoading(false);
      };
  
      fetchData(); 
    }, [page, pageSize, orderIdFilter]);


   const handleToggleShippingAddress = (orderId: string | null) => {
      setShowShippingAddress((prev) => (prev === orderId ? null : orderId));
    };
    
   const handleToggleOrderData = (orderId: string | null) => {
      setShowOrderDetail((prev) => (prev === orderId ? null : orderId));
    };
   const handleToggleSetShowCart = (orderId: string | null) => {
      setShowCart((prev) => (prev === orderId ? null : orderId));
    };
   const handleSearch = (orderId: string) => {
     router.push(`?orderId=${orderId}`);
   };
   const handleDelete = async () => {
      if(!deleteOrder) return;
      const success = await deleteOrderById(deleteOrder);
      if (success) {
        setFilteredOrders((prevOrders) => prevOrders.filter(order => order.order_id !== deleteOrder));
        setDeleteOrder(null);
      }
   };
   
  return (
    <div className='w-[95%] mx-auto px-8 relative rounded-md'>
      {openSearch && <OrderIdSearch onSearch={handleSearch} close={setOpenSearch}/>}
      {!loading && filteredOrders.length === 0 && (
        <div className="w-full h-full flex items-center justify-center py-4">
          <p className="text-red-500">
            No orders found
          </p>
        </div>
      )}
      {loading && (<ClipLoader  loading={true} color="#b88e2f" />)}
      <Table className="w-full min-h-screen">
        <TableHeader className=" ">
          <TableRow className="sticky top-0 backdrop-blur-lg bg-goldLight z-10 bg-opacity-100 text-neutral-900">
            <TableHead className='text-nowrap border-r'>Sr.No.</TableHead>
            <TableHead className='text-nowrap border-r flex items-center pr-1 justify-between cursor-pointer' onClick={()=>setOpenSearch(true)}>Order ID <FilterIcon/></TableHead>
            <TableHead className='text-nowrap border-r'>Name </TableHead>
            <TableHead className='text-nowrap border-r'>Order Status</TableHead>
            <TableHead className='text-nowrap border-r'>Total Price</TableHead>
            <TableHead className='text-nowrap border-r'>Shipping Address</TableHead>
            <TableHead className='text-nowrap border-r'>Order Date</TableHead>
            <TableHead className='text-nowrap border-r'>Payment Method</TableHead>
            <TableHead className='text-nowrap border-r'>Cart Items</TableHead>
            <TableHead className='text-nowrap border-r'>Shipping</TableHead>
            <TableHead className='text-nowrap border-r flex items-center justify-center'><TriangleAlert color="red"/></TableHead>
          </TableRow>
        </TableHeader>
        
        <TableBody className="">
          {filteredOrders.map((order, index) => (
            <TableRow key={order.order_id} className='relative'>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{order.order_id}</TableCell>
              <TableCell className="text-nowrap">{order.userId}</TableCell>
              <TableCell>{order.order_status}</TableCell>
              <TableCell>₹{order.total_price}</TableCell>
              <TableCell>{showShippingAddress === order.order_id && <ShippingAddressCard address={order.shipping_address as ShippingAddress} close={setShowShippingAddress}/>  }<Button onClick={()=>handleToggleShippingAddress(order.order_id)} className="border border-gold " variant={'outline'} >View Address</Button></TableCell>
              <TableCell className="text-nowrap">{formatDate(order.order_date)}</TableCell>
              <TableCell>{order.payment_method}</TableCell>
              <TableCell>{shorCart === order.order_id && <CartDataCard cart={order.cart_items} close={handleToggleSetShowCart}/>}<Button onClick={()=>handleToggleSetShowCart(order.order_id)} className="border border-gold " variant={'outline'}>View Order Items</Button></TableCell>
              <TableCell>{showOrderDetail === order.order_id && <OrderCard order={order.shipping[0] as OrderCardData} close={handleToggleOrderData}/>}<Button onClick={()=>handleToggleOrderData(order.order_id)} className="border border-gold " variant={'outline'}>View Shipping</Button></TableCell>
              <TableCell>{deleteOrder === order.order_id && <DeleteOrder onDelete={handleDelete} close={setDeleteOrder}/>}<Button onClick={()=>setDeleteOrder(order.order_id)} className="border-2 border-red-500 " variant={'outline'}>Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

         <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
         />
    </div>
  );
};