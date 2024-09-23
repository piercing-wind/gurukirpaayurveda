import React from 'react';
import Image from 'next/image';
import { Plus, Minus, Trash2Icon } from 'lucide-react';
import { Product } from '@/types/type';
import { X } from 'lucide-react';


interface CartCardProps {
  item: Product;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
}

const CartCard: React.FC<CartCardProps> = ({ item, onIncrease, onDecrease, onRemove  }) => {
  return (
    <div className="flex items-center p-4 bg-white shadow-md rounded-lg mb-4">
      <div className="relative w-24 h-24">
        <Image
          src={item.image}
          alt={item.name}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-col flex-grow ml-4">
        <h3 className="text-sm font-semibold">{item.name}</h3>
        <p className="text-gray-500">₹ {item.price.toFixed(2)}</p>
        <div className="flex items-center mt-2">
          <button
            className="p-1  text-gold rounded-full hover:bg-gray-300"
            onClick={() => onDecrease(item.id)}
          >
            <Minus size={16} />
          </button>
          <span className="mx-2">{item.quantity}</span>
          <button
            className="p-1  text-gold rounded-full hover:bg-gray-300"
            onClick={() => onIncrease(item.id)}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
      <button
        className="ml-4 p-2 text-red-500 rounded-full hover:scale-105"
        onClick={() => onRemove(item.id)}
      >
        <Trash2Icon size={16} />
      </button>
    </div>
  );
};

export default CartCard;



