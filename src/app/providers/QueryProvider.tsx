import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const defaultQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (gc)
      refetchOnWindowFocus: false
    }
  }
})
export function QueryProvider({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={defaultQueryClient}>{children}</QueryClientProvider>
}

export default QueryProvider
