"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { SlidersHorizontal } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { products } from "@/products/data"

// Extract unique categories from products
const uniqueCategories = Array.from(new Set(products.map(product => product.category)));

// Map unique categories to the desired format
const items = uniqueCategories.map(category => ({
  id: category,
  label: category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ')
}));

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
})

export function CheckboxReactHookFormMultiple({filter}:{filter : (value:string[])=>void}) {
  
   const [isOpen, setIsOpen] = useState(false);
   const clickOutside = useRef<HTMLFormElement>(null);

   const form = useForm<z.infer<typeof FormSchema>>({
     resolver: zodResolver(FormSchema),
     defaultValues: {
       items: items.map(item => item.id),
     },
   })

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (clickOutside.current && !clickOutside.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);


   function onSubmit(data: z.infer<typeof FormSchema>) {
    filter(data.items);
    const selectedFilters = data.items
       .map((id) => items.find((filter) => filter.id === id)?.label)
       .filter(Boolean)
       .join(', ');
    toast("Filter is applied on Products", {
       description:(<p>Selected filters: &nbsp; <span className="text-gold font-medium">{selectedFilters}</span></p> ),
       closeButton: true,
 
     })
 
   }


  return (
   <div className="relative">
         <span className="flex items-center gap-4 cursor-pointer hover:text-gold hover:scale-105 transition-all duration-500" onClick={()=>setIsOpen(!isOpen)}>
            <SlidersHorizontal size={20}/>
               Filter
         </span>
   {isOpen && (
    <Form {...form}>
      <form ref={clickOutside} onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-[#FCF8F3] bg-opacity-70 backdrop-blur-md rounded-md p-4 z-50 absolute w-[14rem] top-14 left-[10%]">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <div className="mb-6 flex flex-col gap-2">
                <FormLabel className="text-base mb-2">Ayurveda Category</FormLabel>
                <FormDescription className="text-xs">
                 Filter the items you want to see in the Products.
                </FormDescription>
              </div>
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            color="#B88E2F"
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-gold h-8 text-sm w-full hover:bg-gold hover:bg-opacity-80 ">Apply</Button>
      </form>
    </Form>
    ) }
    </div>
  )
}
