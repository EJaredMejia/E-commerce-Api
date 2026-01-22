import { createFileRoute } from '@tanstack/react-router'
import Purchases from '../Components/Purchases'

export const Route = createFileRoute('/purchases')({
  component: Purchases,
})
