import { TriangleAlert } from 'lucide-react';
import Link from 'next/link';

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-gold mb-4">Oops!</h1>
        <TriangleAlert className="w-16 h-16 text-gold mx-auto mb-4" />
        <p className="text-gray-700 mb-8">Something went wrong. Please try again later.</p>
        <Link href="/login"
          className="inline-block bg-gold text-white py-2 px-4 rounded hover:bg-gold-600 transition duration-300">
          Back to Login
 
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;