import { CheckCircle2, TriangleAlert } from 'lucide-react';

export const FormError = ({ message }: {message?: string}) => {
   if (!message || message === "") return null;
   return (
      <div className="bg-destructive/15 p-2 flex items-center gap-x-2 text-sm  text-red-500 rounded-md">
         <TriangleAlert size={18} />
         <p>{message}</p>
      </div>
   )
};


export const FormSuccess = ({ message }: { message?: string }) => {
   if (!message || message === "") return null;
   return (
     <div className="bg-green-100  p-2 flex items-center gap-x-2 text-sm text-green-500 rounded-md">
       <CheckCircle2 size={18} />
       <p>{message}</p>
     </div>
   );
 };
