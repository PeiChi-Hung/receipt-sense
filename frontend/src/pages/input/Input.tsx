import InputForm from "@/components/InputForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Input = () => {
  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>New Invoice</CardTitle>
        </CardHeader>
        <CardContent>
          <InputForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default Input;
