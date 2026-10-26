export default function ImageAsset({ src, alt, className = '', loading = 'lazy', width, height, fetchPriority }) {
  return <img className={`image-asset ${className}`} src={src} alt={alt} loading={loading} decoding="async" width={width} height={height} fetchPriority={fetchPriority} />
}
