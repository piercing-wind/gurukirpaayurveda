import { CheckCircleIcon } from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';

export const SuccessPayment = () => {
  return (
    <div className="w-[36rem] mx-auto flex flex-col items-center justify-center my-10 p-6 border border-gold rounded-lg shadow-lg">
      <CheckCircleIcon size={38} className="text-green-500 text-6xl mb-4" />
      <h1 className="text-3xl font-bold mb-2 text-gold">Payment Successful!</h1>
      <p className=" mb-4 text-center">
        Congratulations! Your order has been placed successfully.
      </p>
      <p className=" text-sm mt-8 text-center">
       Your order and shipping details have been created! You'll receive an <b className='text-gold'>email</b> shortly with all the info. Your order is on its way!
      </p>
      <p className="my-4 text-sm text-center">
          Thank you for choosing us! We truly value your support.
      </p>
      <p className="mb-4 text-center text-sm">
      You can track your order anytime in your account. Simply log in to view the latest updates on your shipment!</p>

      <div className="w-full flex flex-col items-center justify-center gap-4">
        <Link href="/myaccount">
        <Button className="bg-gold text-white px-4 py-2 rounded-lg">
          Track Order
        </Button>
         </Link>
      </div>

    </div>
  );
};