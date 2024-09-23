import React, { useEffect, useRef, useState } from "react";
import { products } from "@/products/data";
import { Product } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import { Input } from "./ui/input";

export const Search = ({clickOutside}:{clickOutside : React.RefObject<HTMLDivElement>}) => {
  const [query, setQuery] = useState("");

  const filteredProducts = products.filter((product: Product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );



  return (
    <div ref={clickOutside} className="fixed top-16 md:top-24 left-0 right-0 flex flex-col bg-white lg:bg-transparent items-center justify-center w-full p-4 z-50">
      <h6 className="text-lg font-medium my-4">Search Your Product</h6>
      <div  className="w-full max-w-md bg-white p-4 rounded-md" onClick={(e) => e.stopPropagation()}>
        <Input
          type="text"
          className="w-full p-2 border border-gold rounded-md fo"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <div className="mt-2 bg-white border border-goldLight rounded-md shadow-lg shadow-goldLight">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product: Product) => (
               <Link href={`/shop/${product.id}`} key={product.id}>
                <div
                  key={product.id}
                  className="p-2 cursor-pointer hover:bg-goldLight hover:bg-opacity-20"
                >
                  <div className="flex items-center">
                     <div className="relative w-10 h-10">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          style={{
                           objectFit: "cover",
                          }}
                        />
                     </div>
                    <div className="ml-2">
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-gold">₹ {product.price}</p>
                    </div>
                  </div>
                </div>
                </Link>
              ))
            ) : (
              <p className="p-2 text-sm text-gray-500">No products found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};