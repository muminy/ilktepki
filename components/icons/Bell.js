export default function BellIcon({ size, color }) {
  return (
    <svg viewBox="0 0 512 512" width={size} height={size}>
      <path
        fill={color ?? "#212121"}
        d="M256 469.3a42.8 42.8 0 0 0 42.7-42.6h-85.4a42.7 42.7 0 0 0 42.7 42.6zM384 320v-74.7c0-65.5-35-120.3-96-134.8V96a32 32 0 1 0-64 0v14.5c-61.2 14.5-96 69.1-96 134.8V320l-27.5 27.5a21.3 21.3 0 0 0 15 36.5h280.9a21.4 21.4 0 0 0 15.1-36.5L384 320z"
      ></path>
    </svg>
  );
}
