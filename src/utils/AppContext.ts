import { createContext, useContext } from "react"
export type GlobalContent = {
    formState: string
    setFormState:(c: string) => void
    isFormValid: boolean
    setIsFormValid:(c: boolean) => void
}
export const AppContext = createContext<GlobalContent>({
    formState: 'supplier pending',
    setFormState: () => {},
    isFormValid: true,
    setIsFormValid:() => {}
})
export const useGlobalContext = () => useContext(AppContext)