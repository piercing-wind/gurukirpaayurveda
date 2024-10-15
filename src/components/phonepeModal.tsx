'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { initiatePayment } from '@/actions/phonepe';
import { UserData } from './paymentOptions';
import * as z from 'zod';
import { AddressSchema } from '@/schemas';
import { toast } from "sonner";

const PhonePePage = ({amount, orderId, user, formData}:{ amount : number, orderId : string,  user: UserData['user'], formData : z.infer<typeof AddressSchema>}) => {
  const [paymentUrl, setPaymentUrl] = useState('');
  const [opned, setOpened] = useState(false);

  const handlePayment = async () => {
   if(opned) return;

    const url = await initiatePayment(amount, orderId,user?.id!, formData.phone, "https://vaidgurmeetsingh.com/api/phonepe");

    if (url) {
      setPaymentUrl(url);
      setOpened(true);
   } else {
      toast.error('Failed to initiate payment, Please Retry',
         {
            duration: 20000,
            closeButton: true,
         }
      );
    }
  };
  useEffect(() => {
      handlePayment();
   }, []);

  return (
      <div className="bg-white p-4 rounded shadow-lg w-full h-[40rem] mt-14">
        <iframe src={paymentUrl} width="100%" height="100%"></iframe>
      </div>
  );
};

export default PhonePePage;