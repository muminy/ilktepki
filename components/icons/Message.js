export default function MessageIcon({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512">
      <path
        fill={color ?? "#212121"}
        d="M341.3 266.7a33 33 0 0 1-34.1 32H128L89.6 337A15 15 0 0 1 64 326.6V117.3a33 33 0 0 1 34.1-32h209.1a33 33 0 0 1 34.1 32v149.4zM192 341.3h138.7A53.3 53.3 0 0 0 384 288v-74.6h29.9a33 33 0 0 1 34.1 32v187.9a15 15 0 0 1-25.6 10.5L384 405.4H226.1a33 33 0 0 1-34.1-32v-32z"
      ></path>
    </svg>
  );
}
