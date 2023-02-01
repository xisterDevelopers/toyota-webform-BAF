import { createContext, useContext } from "react"
export type GlobalContent = {
    formState: string
    setFormState:(c: string) => void
}
export const AppContext = createContext<GlobalContent>({
    formState: 'Supplier Pending',
    setFormState: () => {},
})
export const useGlobalContext = () => useContext(AppContext)