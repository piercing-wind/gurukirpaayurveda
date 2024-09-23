'use client';
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Truck, Search as SearchIcon, ShoppingCartIcon, User, Menu, X, LogOutIcon, CircleUser } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/use-current-user";
import { logout } from "@/actions/logout";
import { useCart } from "@/components/cartContext";
import { ShoppingCart } from "@/components/shoppingCartCard";
import { Search } from "@/components/search";
import {TrackOrder} from "./trackOrder";

export const Header = () => {
  const user = useCurrentUser()
  const ref = useRef(null);
  const {cart} = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [openTrackOrder, setOpenTrackOrder] = useState(false);
  const clickOutside = useRef<HTMLDivElement>(null);



  const handleClickOutside = (event: MouseEvent) => {
   if (clickOutside.current && !clickOutside.current.contains(event.target as Node)) {
     setIsUserPopupOpen(false);
     setOpenCart(false);
     setOpenSearch(false);
     setOpenTrackOrder(false);
   }
 };

 useEffect(() => {
   document.addEventListener('mousedown', handleClickOutside);
   return () => {
     document.removeEventListener('mousedown', handleClickOutside);
   };
 }, []);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const toggleUserPopup = () => {
   setIsUserPopupOpen(!isUserPopupOpen);
 };
  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
 
    <nav className="flex p-4 items-center justify-between relative">
      <Link href='/' className="relative w-56 h-10 mr-8 sm:ml-8 mb-4">
        <Image
          src="/GurukirpaAyurveda.svg"
          alt="logo"
          fill
          style={{
            objectFit: "contain",
          }}
        />
      </Link>
      <ul className="hidden sm:flex gap-x-20">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/shop">Shop</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
      <ul className="hidden sm:flex gap-x-10 mr-20">
         {!user || user === undefined ? (<Link href='/login'>Log In</Link>) : (
            <li onClick={toggleUserPopup} className="cursor-pointer">
               <User />
            </li>
         )}
         {isUserPopupOpen && (
         <motion.div
           ref={clickOutside}
           initial="hidden"
           animate="visible"
           variants={menuVariants}
           transition={{ duration: 0.3 }}
           className="absolute top-16 right-[10%] bg-white shadow-lg rounded-lg p-4 w-48 z-50 text-sm"
         >
            <Link href='/myaccount' className="w-full flex justify-between items-center text-left px-4 py-2 rounded-md hover:bg-goldLight hover:bg-opacity-50">
               My Account <CircleUser size={16} className="text-gold"/>
            </Link>
           <button onClick={()=>{logout();}} className="w-full flex justify-between items-center text-left px-4 py-2 rounded-md hover:bg-goldLight hover:bg-opacity-50">
             Log Out <LogOutIcon size={16} className="text-gold"/>
           </button>
         </motion.div>
       )}   
         {!user || user === undefined ? (<Link href='/register'>Register</Link>) : null}
        <li onClick={()=>setOpenSearch(!openSearch)} className="cursor-pointer"><SearchIcon /></li>
        {openSearch && <Search clickOutside={clickOutside}/>}
        {user && 
          <>
            <li onClick={()=>setOpenTrackOrder(true)} className="relative cursor-pointer">
               <Truck />
              { openTrackOrder && <TrackOrder  clickOutside={clickOutside}  setOpenTrackOrder={setOpenTrackOrder}/>}
            </li>
            <li onClick={()=>setOpenCart(!openCart)} className="cursor-pointer relative">
               <ShoppingCartIcon />
               {cart.length > 0 && 
                  <span className="absolute -top-2 left-3 z-20 text-xs text-gold">{cart.length}</span>
                }
            </li>
               {openCart && (
                  <ShoppingCart clickOutside={clickOutside} setOpenCart={setOpenCart}/>
               )}
          </> 
       }
      </ul>

      {/* Mobile Menu */}
      
      <span onClick={toggleMenu} className="cursor-pointer sm:hidden">
        {isMenuOpen ? <X size={32} className="text-gold" /> : <Menu size={32} className="text-gold" />}
      </span>
      {isMenuOpen && (
        <motion.div
          ref={ref}
          initial="hidden"
          animate="visible"
          variants={menuVariants}
          transition={{ duration: 0.3 }}
          className="absolute top-16 right-0 bg-white shadow-lg rounded-lg p-4 w-64 z-50"
        >
         <div className="relative">
          <ul className="flex flex-col gap-y-4">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/shop">Shop</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
          <ul className="flex mt-14 mb-4 justify-between relative">
          {!user || user === undefined ? (<Link href='/login'>Login</Link>) : (
            <li onClick={toggleUserPopup} className="cursor-pointer">
               <User />
            </li>
          )}
            {isUserPopupOpen && (
              <motion.div
                ref={clickOutside}
                initial="hidden"
                animate="visible"
                variants={menuVariants}
                transition={{ duration: 0.3 }}
                className="absolute -bottom-[60%] left-0 bg-white shadow-lg rounded-lg p-4 w-48 z-50 text-sm"
              >
                 <Link href='/myaccount' className="w-full flex justify-between items-center text-left px-4 py-2 rounded-md hover:bg-goldLight hover:bg-opacity-50">
                    My Account <CircleUser size={16} className="text-gold"/>
                 </Link>
                <button onClick={()=>{logout();}} className="w-full flex justify-between items-center text-left px-4 py-2 rounded-md hover:bg-goldLight hover:bg-opacity-50">
                  Log Out <LogOutIcon size={16} className="text-gold"/>
                </button>
              </motion.div>
            )}   
            <li onClick={()=>setOpenSearch(true)} className="cursor-pointer"><SearchIcon /></li>
            {openSearch && <Search clickOutside={clickOutside}/>}
            {user && 
               <>
                  <li onClick={()=>setOpenTrackOrder(true)} className="relative cursor-pointer">
                   <Truck />
                 { openTrackOrder && <TrackOrder  clickOutside={clickOutside}  setOpenTrackOrder={setOpenTrackOrder}/>}
                </li>
                 <li onClick={()=>setOpenCart(!openCart)} className="cursor-pointer relative">
                    <ShoppingCartIcon />
                    {cart.length > 0 && 
                       <span className="absolute -top-2 left-3 z-20 text-xs text-gold">{cart.length}</span>
                     }
                 </li>
                    {openCart && (
                       <ShoppingCart clickOutside={clickOutside} setOpenCart={setOpenCart}/>
                    )}
               </> 
            }
          </ul>    
          </div> 
        </motion.div>
       )}
    </nav>
  );
};