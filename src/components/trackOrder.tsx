import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { intransitShipmentTracking } from "@/lib/example"
import CSS from "@/app/checkout/checkout.module.css" 
import { trackShipment } from "@/actions/delhivery"
import { toast } from "sonner"
import { X } from "lucide-react"



const formatDate = (isoString: string): string => {
   const date = new Date(isoString);
   return date.toLocaleString('en-US', {
     weekday: 'long',
     year: 'numeric',
     month: 'long',
     day: 'numeric',
     hour: 'numeric',
     minute: 'numeric',
     second: 'numeric',
     hour12: true
   });
 };

export const TrackOrder = ({ clickOutside,setOpenTrackOrder }: {clickOutside:React.RefObject<HTMLDivElement>,setOpenTrackOrder: (v:boolean)=> void} ) => {
   const [orderNumber, setOrderNumber] = useState('')
   const [showDetails, setShowDetails] = useState(false)
   const [order, setOrder] = useState<any>(null)


   const scans : any[] = order?.ShipmentData?.[0]?.Shipment?.Scans ?? [];
   const shipment  : any = order?.ShipmentData?.[0]?.Shipment ?? {};
   const status = order?.ShipmentData?.[0]?.Shipment?.Status ?? ''

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if(!orderNumber){
         toast.error('Please enter the order number',{
            duration: 20000,
            closeButton: true
         })
         return;
      }
      if(orderNumber == ''){
         toast.error('Please enter the order number',{
            duration: 20000,
            closeButton: true
         })
         return;
      }

      const response = await trackShipment(orderNumber)
      if(response.Error){
         toast.error(`Order id is Wrong ${response.Error}`,{
            duration: 20000,
            closeButton: true
         })
         return;
      }
      
      setOrder(response)
   }
   const handleClose = () => {
      setOpenTrackOrder(false);
   };
   
   return (
      <div ref={clickOutside} className="w-[24rem] lg:w-[28rem] py-8 absolute top-[3rem] -right-6 lg:right-[10%] backdrop-blur-md z-50 rounded-md ">
      <div className="relative px-8 flex flex-col items-center justify-center ">
        {/* <span onClick={handleClose} className="absolute -top-4 bg-goldLight bg-opacity-20 rounded-full right-2 text-gold cursor-pointer"> <X size={24}  /></span> */}
         <h1 className="text-2xl font-bold">Track Your Order</h1>
         <p className="text-sm text-gray-500 mt-2">Enter your order number to track your order</p>
         <form className="mt-4 w-full" onSubmit={handleSubmit}>
            <Input type="text"  name="orderNumber" placeholder="Tracking Id" value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)} className="w-full border border-gray-300 p-2 rounded-md" />
            <Button type="submit" className="w-full bg-gold hover:bg-goldLight hover:bg-opacity-70 hover:text-gold text-white mt-2 p-2 rounded-md">Track Order</Button>
         </form>

     {order && <div className="w-full border mt-4 p-2 rounded-md shadow-md bg-white">
         <div className="flex justify-between items-start my-2">
            <h2>Order status</h2>
            <span className={`border h-5 flex items-center justify-center text-center ${status.Status == "Delivered" ? 'border-green-500 text-green-600' : 'border-gold'} rounded-lg px-1 backdrop-blur-3xl shadow-md text-xs`}>{status.Status}</span>
         </div>
            <p className="text-xs my-2"><span className="text-gold font-medium">Name : </span> {shipment.Consignee.Name}</p>
            <div className="w-full border-t border-dashed border-gold mb-1"/>

            <p className="text-xs my-1"><span className="text-gold font-medium">Package is at : </span> {status.StatusLocation}</p>
            <p className="text-xs my-1"><span className="text-gold font-medium">On Date : </span>{formatDate(status.StatusDateTime)}</p>
            <p className="text-xs my-1"><span className="text-gold font-medium">Message : </span>{status.Instructions}</p>
            <p className="text-xs my-1"><span className="text-gold font-medium">Payment : </span>{shipment.OrderType}</p>
            {status.Status != 'Delivered'  ? <p className="text-xs my-1"><span className="font-medium text-green-600">Expected Delivery : </span>{formatDate(shipment.ExpectedDeliveryDate)}</p> :
            <p className="text-xs my-1"><span className="font-medium text-green-600">Delivered on : </span>{formatDate(status.StatusDateTime)}</p>}
            <div className="w-full border-t border-dashed border-gold mb-1"/>
            <div className="w-full text-xs justify-between font-semibold text-gold flex items-center">
               <span>From</span>
               <span>Destination</span>
            </div>
            <div className="w-full flex items-center justify-between relative">
               <span className="text-wrap text-xs w-50%">{shipment.Origin}</span>
               <span className="text-xs">{shipment.Destination}</span>
            </div>
      </div>}
         {order && <Button onClick={()=>setShowDetails(!showDetails)} className="w-full bg-gold hover:bg-goldLight hover:bg-opacity-70 hover:text-gold text-white mt-2 p-2 rounded-md">{showDetails ? 'Hide' : 'Show'} Detailed</Button>}

      {showDetails  && 
      <div className={`max-h-[30rem] w-full overflow-y-auto ${CSS.scrollbar}`}>
      {scans.map(({ScanDetail}, index) => (
         <div key={index} className="flex flex-col text-xs bg-white bg-opacity-95 items-start justify-center mt-4 border border-gold p-4 rounded-md shadow-md">
            <p className="text-gray-500"><span className="text-gold font-medium">Package is at : </span>{ScanDetail.ScannedLocation}</p>
            <p className="text-gray-500"><span className="text-gold font-medium">Received on : </span>{formatDate(ScanDetail.ScanDateTime)}</p>
            <p className="text-gray-500"><span className="text-gold font-medium">Status : </span>{ScanDetail.Instructions}</p>
         </div>
      ))}
      </div>}
      </div>
      </div>
   )
}