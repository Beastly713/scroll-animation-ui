import Image from "next/image";

type CloudLayerProps = {
  src: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  alt?: string;
};

export default function CloudLayer({
  src,
  className = "",
  imageClassName = "",
  priority = false,
  alt = "",
}: CloudLayerProps) {
  return (
    <div aria-hidden={alt === ""} className={`cloud-drift absolute ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        className={`object-cover opacity-70 ${imageClassName}`}
      />
    </div>
  );
}
