import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } }).onUploadComplete(
    async ({ metadata, file }) => {
      console.log("Upload complete", metadata);
      console.log("File url: ", file.url);
      return { uploadedBy: metadata };
    }
  ),
};
export default ourFileRouter;
