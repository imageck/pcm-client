export default function Empty() {
  return (
    <figure className="figure d-flex gap-2 flex-column justify-content-center align-items-center h-75 text-secondary">
      <svg xmlns="http://www.w3.org/2000/svg"
           width={128}
           height={128}
           fill="currentColor"
           className="bi bi-0-circle"
           viewBox="0 0 16 16">
        <path d="M7.988 12.158c-1.851 0-2.941-1.57-2.941-3.99V7.84c0-2.408 1.101-3.996 2.965-3.996 1.857 0 2.935 1.57 2.935 3.996v.328c0 2.408-1.101 3.99-2.959 3.99ZM8 4.951c-1.008 0-1.629 1.09-1.629 2.895v.31c0 1.81.627 2.895 1.629 2.895s1.623-1.09 1.623-2.895v-.31c0-1.8-.621-2.895-1.623-2.895Z" />
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8Z" />
      </svg>
      <figcaption className="figure-caption text-center fs-3">
        No items.
      </figcaption>
    </figure>
  );
}