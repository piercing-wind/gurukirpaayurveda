'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    router.push(`?page=${page}`);
  };

  return (
    <div className="flex justify-center mt-4">
      <button 
        onClick={() => handlePageChange(currentPage - 1)} 
        disabled={currentPage === 1}
        className="px-4 py-2 mx-1 bg-gold rounded border border-gold  text-white disabled:opacity-50"
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button 
          key={index} 
          onClick={() => handlePageChange(index + 1)} 
          className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? 'bg-gold text-white' : 'bg-goldLight'}`}
        >
          {index + 1}
        </button>
      ))}
      <button 
        onClick={() => handlePageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
        className="px-4 py-2 mx-1 border bg-gold border-gold rounded text-white disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;