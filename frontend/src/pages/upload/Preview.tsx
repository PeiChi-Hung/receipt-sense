import InputForm from "@/components/Forms/InputForm";
import { FormValues } from "@/types";

const Preview = ({ previewData }: { previewData: Partial<FormValues> }) => {
  return (
    <div>
      <InputForm previewValues={previewData} />
    </div>
  );
};

export default Preview;
