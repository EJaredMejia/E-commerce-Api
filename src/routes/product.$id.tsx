import { createFileRoute } from '@tanstack/react-router'
import ProductDetail from '../Components/ProductDetail'

export const Route = createFileRoute('/product/$id')({
  component: ProductDetail,
})
