export function Card({ children, className }: any) {
  return <div className={`bg-white shadow rounded ${className}`}>{children}</div>;
}