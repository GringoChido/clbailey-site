export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        header, footer, .ai-concierge { display: none !important; }
        main { padding-top: 0 !important; padding-bottom: 0 !important; }
      `}</style>
      {children}
    </>
  );
}
