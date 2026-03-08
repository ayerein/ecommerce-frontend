import { useState } from "react"

export const useModal = () => {
    const [ isOpen, setIsOpen ] = useState(false)
    const [ selected, setSelected ] = useState(null)

    const openModal = (option) => {
        setSelected(option)
        setIsOpen(true)
    }

    const closeModal = () => {
        setSelected(null)
        setIsOpen(false)
    }

    return {
        isOpen,
        selected,
        openModal,
        closeModal
    }
}