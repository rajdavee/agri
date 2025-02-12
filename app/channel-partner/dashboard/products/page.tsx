import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ChannelPartnerProducts() {
  const products = [
    { id: 1, name: "HD-master-maximo", description: "Advanced precision farming system" },
    { id: 2, name: "DM Dhanus", description: "Integrated farm management and analytics platform" },
    { id: 3, name: "Kenchua", description: "Smart irrigation and soil management solution" },
    { id: 4, name: "AgriSync Pro", description: "Complete farm synchronization and planning tool" },
    { id: 5, name: "FarmGuard Elite", description: "Advanced farm security and monitoring system" },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Product Catalog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{product.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

