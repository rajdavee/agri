import { MainNav } from "@/components/ui/main-nav"
import { navigationLinks } from "@/config/distributor-nav"

export default function DistributorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav items={navigationLinks} />
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
}
