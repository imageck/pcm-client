import { useEffect, useRef } from "react";

export default function UploadWidget() {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: "du1j7kxao",
      uploadPreset: "mrebtnan"
    }, function(error, result) {
      console.log(result);
    });
  }, []);
  return (
    <button type="button"
            onClick={() => widgetRef.current.open()}
            className="btn btn-outline-primary">
     Add an image
    </button>
  );
}
