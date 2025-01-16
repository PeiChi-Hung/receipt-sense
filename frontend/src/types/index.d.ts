import { z } from "zod";

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
  subtotal: z.number(),
});

type FormValues = z.infer<typeof formSchema>;
