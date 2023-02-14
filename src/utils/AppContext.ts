import { createContext, useContext } from "react"
export type GlobalContent = {
    formState: string
    setFormState:(c: string) => void
    isFormValidIdentification: boolean
    setIsFormValidIdentification:(c: boolean) => void
    isFormValidBank: boolean
    setIsFormValidBank:(c: boolean) => void
    isFormValidManagement: boolean
    setIsFormValidManagement:(c: boolean) => void
}
export const AppContext = createContext<GlobalContent>({
    formState: 'supplier pending',
    setFormState: () => {},
    isFormValidIdentification: false,
    setIsFormValidIdentification:() => {},
    isFormValidBank: false,
    setIsFormValidBank:() => {},
    isFormValidManagement: false,
    setIsFormValidManagement:() => {}
})
export const useGlobalContext = () => useContext(AppContext)