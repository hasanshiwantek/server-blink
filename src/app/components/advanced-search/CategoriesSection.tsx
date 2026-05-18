import Link from 'next/link'
import React from 'react'

const CategoriesSection = ({ categories }: { categories: any[] }) => {
  const categoryPairs: { parent: any; child: any }[] = []
  categories?.forEach((category: any) => {
    if (category?.subcategories?.length > 0) {
      category.subcategories.slice(0, 3).forEach((sub: any) => {
        categoryPairs.push({ parent: category, child: sub })
      })
    }
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-3 text-sm">
      {categoryPairs?.map((pair, index) => (
        <div key={index} className="text-[15px]">
          <Link
            href={`/category/${pair.parent.slug}`}
            className="text-[#d42020] underline "
          >
            {pair.parent.name}
          </Link>
          <span className="text-gray-500 mx-1">&gt;</span>
          <Link
            href={`/category/${pair.child.slug}`}
            className="text-[#d42020] underline"
          >
            {pair.child.name}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default CategoriesSection