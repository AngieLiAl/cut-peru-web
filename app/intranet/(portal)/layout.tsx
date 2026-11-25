import GuardiaDemo from '../../_componentes/GuardiaDemo';
import MenuIntranet from '../../_componentes/MenuIntranet';

export default function LayoutPortal({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen md:flex">
      <MenuIntranet />
      <main className="min-w-0 grow">
        <GuardiaDemo>{children}</GuardiaDemo>
      </main>
    </div>
  );
}
