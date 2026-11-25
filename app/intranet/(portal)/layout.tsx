import GuardiaDemo from '../../_componentes/GuardiaDemo';
import MenuIntranet from '../../_componentes/MenuIntranet';

// Las páginas de la intranet se muestran solo después de comprobar la sesión en el navegador,
// así que no pueden tener una vista instantánea prerenderizada.
export const instant = false;

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
