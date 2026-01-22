import { createFileRoute } from '@tanstack/react-router'
import SignUp from '../Components/SignUp'

export const Route = createFileRoute('/signup')({
  component: SignUp,
})
