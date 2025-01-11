import { useState } from "react";
import Preview from "./Preview";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/FileUploader";
import { Button } from "@/components/ui/button";
import { DropzoneOptions } from "react-dropzone";
import { CloudUpload } from "lucide-react";

const Upload = () => {
  const [previewData, setPreviewData] = useState<any>(null);
  const [files, setFiles] = useState<File[] | null>([]);

  const dropzone = {
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
    multiple: true,
    maxFiles: 1,
    maxSize: 1 * 1024 * 1024,
  } satisfies DropzoneOptions;
  return (
    <>
      {previewData ? (
        <div className="grid grid-cols-2 p-4">
          <div className="p-4">
            <h5>Upload</h5>
          </div>
          <div className="rounded-xl bg-muted/50 p-4">
            <h5>Preview</h5>
            <Preview />
          </div>
        </div>
      ) : (
        <div className="space-y-4 p-4">
          <h5>Upload</h5>
          <FileUploader
            value={files}
            onValueChange={setFiles}
            dropzoneOptions={dropzone}
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
        </div>
      )}
    </>
  );
};

export default Upload;
