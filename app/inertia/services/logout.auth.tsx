import { router } from '@inertiajs/react'

export const logout = async () => {
  router.post('/auth/logout')
}
