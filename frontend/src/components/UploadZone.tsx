import { useMemo } from "react";
import { useDropzone } from "react-dropzone-esm";
import { useAttchStore } from "@/store/AttchStore";
import { CloudArrowUpIcon } from "@heroicons/react/24/solid";

const ERRORS = {
  invalid_file_type: "Archivo no permitido",
  too_many_files: "Solo es posible subir 20 archivos a la vez",
  file_too_large: "Max size = 100MB",
  file_not_found: "No file found",
  upload_failed: "Upload failed",
};

const typesAccepted = ["jpg", "jpeg", "png"];

export function UploadZone() {
  const { addImg, err } = useAttchStore((state) => state);

  const validateFiles = (file: File) => {
    if (file === undefined || file.name === undefined)
      return {
        code: "no-file-found",
        message: ERRORS.file_not_found,
      };

    const ext = file.name.split(".").pop() || "";

    if (!typesAccepted.includes(ext))
      return {
        code: "type-incorrect",
        message: ERRORS.invalid_file_type,
      };

    if (file.size > 1024 * 1024 * 100) {
      console.log("file too large");
      return {
        code: "file-too-large",
        message: ERRORS.file_too_large,
      };
    }

    return null;
  };

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDropAccepted: (aceeptedFiles) => {
      aceeptedFiles.forEach((file) => {
        addImg(file);
      });
    },
    validator: validateFiles,
    maxFiles: 20,
  });

  const errorsMessage = useMemo(() => {
    if (fileRejections[0]) {
      const { errors } = fileRejections[0];
      if (errors[0].code === "file-too-large") {
        return ERRORS.file_too_large;
      } else if (errors[0].code === "type-incorrect") {
        return ERRORS.invalid_file_type;
      } else if (errors[0].code === "too-many-files") {
        return ERRORS.too_many_files;
      } else {
        return ERRORS.upload_failed;
      }
    }
    return undefined;
  }, [fileRejections]);

  return (
    <div className="flex flex-col items-center justify-center w-full px-4 sm:px-36 lg:px-36 md:px-20">
      <div className="bg-gradient-to-r to-emerald-600 from-sky-400 p-3 rounded-lg w-full">
        <div
          {...getRootProps()}
          className="flex flex-col items-center justify-center pt-5 pb-6 w-full px-4 h-28 border-2 border-white border-dashed rounded-lg cursor-pointer bg-gray-300 bg-opacity-25 border-opacity-25 text-opacity-100 hover:bg-opacity-25 hover:bg-bray-800 hover:bg-gray-600 hover:border-white"
        >
          <CloudArrowUpIcon
            className={`h-8 w-8 ${err ? "text-red-600" : "text-white"}`}
          />
          {errorsMessage ? (
            <p className="text-red-500">{errorsMessage}</p>
          ) : (
            <p
              className={`text-sm ${
                err ? "text-red-600" : "text-white"
              } text-center`}
            >
              <span className="font-semibold text-sm mt-2">
                Click para seleccionar un archivo
              </span>{" "}
              o arrastralo aquí
            </p>
          )}
          <input {...getInputProps()} />
        </div>
      </div>
    </div>
  );
}
