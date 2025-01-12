import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/FileUploader";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { CloudUpload } from "lucide-react";
import { useState } from "react";
import { DropzoneOptions } from "react-dropzone";
import Preview from "./Preview";
import { apiEndpoint } from "@/config";

const Upload = () => {
  const [previewData, setPreviewData] = useState<any>(null);
  const [files, setFiles] = useState<File[] | null>([]);

  const dropzone = {
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
    multiple: true,
    maxFiles: 2,
    maxSize: 1 * 1024 * 1024,
  } satisfies DropzoneOptions;

  const processFileMutation = useMutation({
    mutationFn: async (files: File[]) => {
      const formData = new FormData();
      formData.append("file", files[0]);

      const { data } = await axios.post(`${apiEndpoint}/process`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Data:", data);
      return data;
    },
    onSuccess: (data) => {
      setPreviewData(data);
    },
    onError: (error: AxiosError) => {
      console.error("Error processing files:", error.message);
    },
  });

  const onsubmit = () => {
    if (files) {
      processFileMutation.mutate(files);
    }
  };
  return (
    <>
      <div className="grid grid-cols-2 p-4">
        <div className="space-y-4 p-4">
          <h5>Upload</h5>
          <FileUploader
            value={files}
            onValueChange={setFiles}
            dropzoneOptions={dropzone}
            reSelect={true}
          >
            <FileInput>
              <div className="flex aspect-video w-full flex-col items-center justify-center rounded-md border bg-background">
                <CloudUpload width={60} height={60} />
                <p className="text-gray-400">
                  Drag & Drop or browse your image here
                </p>
              </div>
            </FileInput>
            <FileUploaderContent className="flex flex-row items-center gap-2">
              {files?.map((file, i) => (
                <FileUploaderItem
                  key={i}
                  index={i}
                  className="size-20 overflow-hidden rounded-md p-0"
                  aria-roledescription={`file ${i + 1} containing ${file.name}`}
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    height={80}
                    width={80}
                    className="size-20 p-0"
                  />
                </FileUploaderItem>
              ))}
            </FileUploaderContent>
          </FileUploader>
          <Button
            type="submit"
            className="h-8 w-fit"
            onClick={onsubmit}
            disabled={processFileMutation.isPending || files === null}
          >
            {processFileMutation.isPending ? "Processing..." : "Preview"}
          </Button>
        </div>
        {previewData && (
          <div className="rounded-xl bg-muted/50 p-4">
            <h5>Preview</h5>
            <Preview />
          </div>
        )}
      </div>
    </>
  );
};

export default Upload;
