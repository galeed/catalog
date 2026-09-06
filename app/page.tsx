type Product = {
  id: number
  name: string
  price: number
  description?: string
}

async function getProducts(): Promise<Product[]> {
  const response = await fetch('http://localhost:3000/api/products', {
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error('Failed to load products')
  }

  return response.json()
}

export default async function Page() {
  const products = await getProducts()

  return (
    <main className="min-h-screen bg-[#f7f7f5] px-6 py-12 text-[#1d1d1b] sm:px-10">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12 max-w-2xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[#6b6b63]">Next.js API route</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Fetch products through your own endpoint.</h1>
          <p className="mt-5 text-lg leading-8 text-[#6b6b63]">
            The page calls <code className="rounded bg-white px-1.5 py-1 font-mono text-sm text-[#1d1d1b]">/api/products</code>. That route fetches data from the Vercel Products API and returns it as JSON.
          </p>
        </header>

        <section aria-labelledby="products-heading">
          <div className="mb-4 flex items-baseline justify-between border-b border-[#d9d9d2] pb-3">
            <h2 id="products-heading" className="text-sm font-semibold uppercase tracking-[0.16em]">Products</h2>
            <span className="font-mono text-xs text-[#6b6b63]">{products.length} results</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {products.map((product) => (
              <article key={product.id} className="rounded-xl border border-[#deded7] bg-white p-5 shadow-[0_4px_20px_rgba(29,29,27,0.04)]">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="font-mono text-sm text-[#6b6b63]">${product.price}</p>
                </div>
                {product.description && <p className="mt-3 text-sm leading-6 text-[#6b6b63]">{product.description}</p>}
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14" aria-labelledby="code-heading">
          <h2 id="code-heading" className="mb-3 text-sm font-semibold uppercase tracking-[0.16em]">The route</h2>
          <pre className="overflow-x-auto rounded-xl bg-[#1d1d1b] p-5 text-sm leading-7 text-[#f7f7f5]"><code>{`export async function GET(request: Request) {
  const response = await fetch('https://api.vercel.app/products')
  const products = await response.json()
  return Response.json(products)
}`}</code></pre>
        </section>
      </div>
    </main>
  )
}
