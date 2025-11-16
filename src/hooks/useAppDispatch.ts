import type { AppDispatch } from "@/store/store"
import { useDispatch } from "react-redux"

const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export default useAppDispatch