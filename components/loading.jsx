import FadeLoader from "react-spinners/FadeLoader";

export default function Loading() {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2">
      <FadeLoader color="var(--color-text)" />
    </div>
  );
}
