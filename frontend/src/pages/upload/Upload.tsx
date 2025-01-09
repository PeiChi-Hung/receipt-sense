import { useState } from "react";
import Preview from "./Preview";

const Upload = () => {
  const [previewData, setPreviewData] = useState<any>(null);
  return (
    <>
      {/* {previewData ? (
        <div className="grid grid-cols-2 p-4">
          <div className="p-4">
            <h5>Upload</h5>
          </div>
          <div className="rounded-xl bg-muted/50 p-4">
            <h5>Preview</h5>
          </div>
        </div>
      ) : (
        <div className="p-4">
          <h5>Upload</h5>
        </div>
      )} */}
      <div className="grid grid-cols-2 p-4">
        <div className="p-4">
          <h5>Upload</h5>
        </div>
        <div className="rounded-xl bg-muted/50 p-4">
          <h5>Preview</h5>
          <Preview />
        </div>
      </div>
    </>
  );
};

export default Upload;
