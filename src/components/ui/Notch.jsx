/** Pearl's section divider: plum rule with a triangle and a thin diagonal. */
export default function Notch({ className = "" }) {
  return (
    <div className={`wrap ${className}`}>
      <div className="notch" aria-hidden="true" />
    </div>
  );
}
