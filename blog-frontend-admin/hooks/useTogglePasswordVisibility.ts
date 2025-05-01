import { useState } from "react"

export default function useTogglePasswordVisibility() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  return {
    isVisible, toggleVisibility
  }
}
