export function Badge({ children, className }: any) {
  return <span className={`inline-block px-2 py-1 rounded text-white text-sm ${className}`}>{children}</span>;
}