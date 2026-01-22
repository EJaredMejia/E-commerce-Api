import { createFileRoute } from '@tanstack/react-router'
import Login from '../Components/Login'

export const Route = createFileRoute('/login')({
  component: Login,
})
