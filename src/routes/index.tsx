import { createFileRoute } from '@tanstack/react-router'
import Home from '../Components/Home'

export const Route = createFileRoute('/')({
  component: Home,
})
