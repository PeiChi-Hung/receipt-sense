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
import { FormValues } from "@/types";

const Upload = () => {
  return (
    <div className="grid grid-cols-2 p-4">
      <div className="p-4">
        <h5>Upload</h5>
      </div>
      <div className="rounded-xl bg-muted/50 p-4">
        <h5>Preview</h5>
      </div>
    </div>
  );
};

export default Upload;
