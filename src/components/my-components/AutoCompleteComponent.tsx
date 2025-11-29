import { getTokenFromLocalStorage } from "@/helpers/authentication"
import links from "@/helpers/links"
import useDebounce from "@/hooks/useDebounce"
import { useQuery } from "@tanstack/react-query"
import { Loader2, Search } from "lucide-react"
import { useMemo, useState } from "react"

const fetchSuggestions = async (searchTerm: string, teamId: string) => {
  // If the term is empty, return an empty array without fetching
  let token = getTokenFromLocalStorage()
  if (!token) {
    return []
  }
  if (!searchTerm) {
    return []
  }

  const url = `${
    links.backendbaseUrlRemote
  }/api/admin/get-members?q=${encodeURIComponent(
    searchTerm
  )}&teamId=${encodeURIComponent(teamId)}`
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response.json()
}

const AutoCompleteComponent: React.FC<{
  teamId: string
  setSelectedMember: any
}> = ({ teamId, setSelectedMember }) => {
  const [searchTerm, setSearchTerm] = useState<string>("")

  // 1. Debounce the user's input
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  // 2. Use TanStack Query for data fetching
  const { data, isLoading, isFetching, error, refetch } = useQuery({
    // Query key changes when the debounced term changes, triggering a fetch
    queryKey: ["memberSearch", debouncedSearchTerm],
    queryFn: () => fetchSuggestions(debouncedSearchTerm, teamId),
    // Only fetch if the debounced search term is not empty
    enabled: !!debouncedSearchTerm,
    // Stale data is better than no data, but let's keep it simple for a search box
    staleTime: 0,
  })

  // Combine isLoading and isFetching for a visual loading state
  const isQuerying = isLoading || isFetching

  if (data) {
    console.log("search data---", data)
  }

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // Handle clicking a suggestion
  const handleSuggestionClick = (item: any) => {
    // When a suggestion is clicked, set the input value, clear suggestions, and stop any pending queries.
    // setSearchTerm(item.fullName)
    setSelectedMember(item)
    setSearchTerm("")
    // Note: We don't need to manually clear suggestions state as the next render
    // won't match the criteria for showing the list (since searchTerm is now the full result name).
  }

  const showSuggestionsList = useMemo(() => {
    // Show the list if we have results, are querying, or have an error, AND the input is not empty
    return (
      searchTerm.trim().length > 0 &&
      data &&
      (data.membersFound.length > 0 || isQuerying || error)
    )
  }, [searchTerm, data, isQuerying, error])

  return (
    <div className="relative">
      {/* Input Field and Search Icon */}
      <div className="flex items-center bg-white border border-gray-300 rounded-xl shadow-lg focus-within:ring-4 focus-within:ring-indigo-200 transition duration-300">
        <div className="p-3 text-gray-400">
          <Search className="w-5 h-5" /> {/* Lucide Search Icon */}
        </div>
        <input
          type="text"
          className="w-full p-3 pr-4 text-lg text-gray-800 bg-transparent outline-none rounded-r-xl"
          placeholder="Start searching for an employee"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestionsList && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden max-h-80">
          {error ? (
            // Error State
            <div className="p-4 text-sm text-red-600 bg-red-50 border-t-4 border-red-500">
              <p>
                Failed to fetch suggestions. Ensure your backend is running.
              </p>
              <p className="font-mono text-xs mt-1">Error: {error.message}</p>
            </div>
          ) : isQuerying && debouncedSearchTerm.trim().length > 0 ? (
            // Loading State (Only show if there is an active search term)
            <div className="flex items-center justify-center p-4">
              <Loader2 className="animate-spin h-5 w-5 text-indigo-500" />{" "}
              {/* Lucide Loader Icon */}
              <span className="ml-3 text-gray-600">Searching...</span>
            </div>
          ) : data.membersFound.length === 0 &&
            debouncedSearchTerm.trim().length > 0 ? (
            // No Results State (Only show after fetching, when term is not empty, and no results returned)
            <div className="p-4 text-gray-500">
              No products found matching "
              <span className="font-semibold">{debouncedSearchTerm}</span>"
            </div>
          ) : (
            // Results List
            <ul className="divide-y divide-gray-100">
              {data.membersFound.map((item: any, index: any) => (
                <li
                  key={index}
                  className="p-4 cursor-pointer hover:bg-indigo-50 transition duration-150"
                  onClick={() => handleSuggestionClick(item)}
                >
                  <div className="font-medium text-gray-800">
                    {item.fullName}
                  </div>
                  <div className="text-sm text-indigo-600 font-semibold">
                    {item.email}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export default AutoCompleteComponent
