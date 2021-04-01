export default function Moon({ isDark }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={`${isDark() ? "white" : "none"}`}
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-4 h-4 cursor-pointer"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  );
}
