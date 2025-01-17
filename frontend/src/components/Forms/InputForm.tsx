import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  storeName: z.string().nonempty({ message: "Store name is required" }),
  date: z.date(),
  category: z.string().optional(),
  line_items: z.array(
    z.object({
      item_name: z.string(),
      item_value: z.number(),
      item_quantity: z.number(),
    }),
  ),
  total: z.number(),
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: Partial<FormValues> = {
  storeName: "",
  line_items: [
    {
      item_name: "",
      item_value: 0,
      item_quantity: 0,
    },
  ],
};

export default function InputForm({
  previewValues,
}: {
  previewValues?: Partial<FormValues>;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: previewValues ? previewValues : defaultValues,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const {
    fields: itemFields,
    append: itemAppend,
    remove: itemRemove,
  } = useFieldArray({
    control: form.control,
    name: "line_items",
  });

  useEffect(() => {
    form.reset(previewValues);
  }, [previewValues]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-3 gap-4">
          {/* Store Name */}
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="storeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Date */}
          <div>
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purchase Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        {/* Category */}
        <div className="flex flex-col space-y-1.5">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="category">Category</FormLabel>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="health">Health and Care</SelectItem>
                    <SelectItem value="food">Food and Drink</SelectItem>
                    <SelectItem value="grocery">Grocery</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="travel">Travel</SelectItem>
                    <SelectItem value="shopping">Shopping</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        {itemFields.map((field, index, array) => (
          <div key={field.id} className="grid grid-cols-4 gap-4">
            <div className="col-span-2">
              <FormField
                control={form.control}
                name={`line_items.${index}.item_name`}
                render={({ field }) => (
                  <FormItem>
                    {/* Item Name */}
                    <FormLabel>Item Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name={`line_items.${index}.item_value`}
                render={({ field }) => (
                  <FormItem>
                    {/* Item Value */}
                    <FormLabel>Item Value</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name={`line_items.${index}.item_quantity`}
                render={({ field }) => (
                  <FormItem>
                    {/* Item Quantity */}
                    <FormLabel>Item Quantity</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className={array.length === 1 ? "hidden" : "mt-2 block w-full"}
              onClick={() => itemRemove(index)}
            >
              Remove Item
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={() =>
            itemAppend({
              item_name: "",
              item_value: 0,
              item_quantity: 0,
            })
          }
        >
          Add Item
        </Button>
        <Separator />
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h6>Total</h6>
            <div className="w-1/5">
              <FormField
                control={form.control}
                name="total"
                render={({ field }) => (
                  <FormItem className="">
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
