import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(2).max(50),
});

const Preview = () => {
  return <div>Preview</div>;
};

export default Preview;
