export default function AmbientBlobs() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      <div className="absolute -top-[10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-secondary/5 blur-[100px]" />
    </div>
  );
}
