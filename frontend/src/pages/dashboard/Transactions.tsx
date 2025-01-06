import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Clapperboard,
  Pill,
  ShoppingBag,
  ShoppingCart,
  Train,
  Utensils,
} from "lucide-react";

const Transactions = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-8 w-8 items-center justify-center">
              <Pill />
            </Avatar>
            <div>
              <h6 className="leading-none">Company</h6>
              <p className="text-sm text-muted-foreground">Health and Care</p>
            </div>
          </div>
          <h6 className="justify-end">-$ 75.96</h6>
        </div>
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-8 w-8 items-center justify-center">
              <Utensils />
            </Avatar>
            <div>
              <h6 className="leading-none">Company</h6>
              <p className="text-sm text-muted-foreground">Food and Drink</p>
            </div>
          </div>
          <h6 className="justify-end">-$ 75.96</h6>
        </div>
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-8 w-8 items-center justify-center">
              <ShoppingCart />
            </Avatar>
            <div>
              <h6 className="leading-none">Company</h6>
              <p className="text-sm text-muted-foreground">Grocery</p>
            </div>
          </div>
          <h6 className="justify-end">-$ 75.96</h6>
        </div>
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-8 w-8 items-center justify-center">
              <Clapperboard />
            </Avatar>
            <div>
              <h6 className="leading-none">Company</h6>
              <p className="text-sm text-muted-foreground">Entertainment</p>
            </div>
          </div>
          <h6 className="justify-end">-$ 75.96</h6>
        </div>
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-8 w-8 items-center justify-center">
              <Train />
            </Avatar>
            <div>
              <h6 className="leading-none">Company</h6>
              <p className="text-sm text-muted-foreground">Travel</p>
            </div>
          </div>
          <h6 className="justify-end">-$ 75.96</h6>
        </div>
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-8 w-8 items-center justify-center">
              <ShoppingBag />
            </Avatar>
            <div>
              <h6 className="leading-none">Company</h6>
              <p className="text-sm text-muted-foreground">Shopping</p>
            </div>
          </div>
          <h6 className="justify-end">-$ 75.96</h6>
        </div>
      </CardContent>
    </Card>
  );
};

export default Transactions;
