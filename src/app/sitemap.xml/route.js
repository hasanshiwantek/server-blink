export async function GET() {
//   const res = await fetch('https://backend.sparemicro.com/xmlsitemap')
  const res = await fetch('https://backend.sparemicro.com/xmlsitemap')
  const xml = await res.text()

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}