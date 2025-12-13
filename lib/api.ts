import { useQuery } from "@tanstack/react-query"

const API_BASE_URL = "https://jsonplaceholder.typicode.com"

export const useUsersQuery = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/users?`)
      if (!response.ok) throw new Error("Failed to fetch users")
      return response.json()
    },
    retryOnMount: false,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })
}

export const useUserQuery = (userId: number) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`)
      if (!response.ok) throw new Error("Failed to fetch user")
      return response.json()
    },
    retryOnMount: false,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })
}
