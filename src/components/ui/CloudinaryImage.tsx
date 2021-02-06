import { Image } from "cloudinary-react";
import { FC } from "react";

interface ICloudinaryImage {
  publicId: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

const CloudinaryImage: FC<ICloudinaryImage> = ({
  publicId,
  alt,
  width = 900,
  height = Math.floor((9 / 16) * 900),
  className,
}) => {
  return (
    <Image
      className={`object-cover w-full ${className}`}
      cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
      publicId={publicId}
      alt={alt}
      secure
      width={width}
      height={height}
      dpr="auto"
      quality="auto"
      crop="fill"
      gravity="auto"
    />
  );
};

export default CloudinaryImage;
