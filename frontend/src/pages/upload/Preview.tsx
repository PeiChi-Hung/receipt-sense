import InputForm from "@/components/InputForm";

const Preview = () => {
  const sampleData = {
    store_name: "TAXINVOICE",
    date: new Date("2024-12-23"),
    subtotal: 5.69,
    total: 5.69,
    line_items: [
      {
        item_name: "LKK FISH BALL SAUCE 230G",
        item_value: 5.69,
        item_quantity: 1,
      },
    ],
  };

  return (
    <div>
      <InputForm previewValues={sampleData} />
    </div>
  );
};

export default Preview;
