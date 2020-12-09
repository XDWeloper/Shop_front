export interface FbResponse {
  name: string
}

export interface color {
  color_name?: String
  color_number?: String
}


export interface Product {
  id?: number
  subcategoryid?: number
  title?: string
  photo?: string
  info?: string
  price?: string
  colors?: color[]
  sizes?: string[]
  articul?: string
  date?: Date
}

export interface SubCategory {
  id?: number
  categoryId?: number
  name?: string
}

export interface Category {
  id?: number
  name?: number
  subcategoryid?: SubCategory[]
}
