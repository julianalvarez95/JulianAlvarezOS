const WIZARD_SEEN_KEY = "wizardSeen"
const WIZARD_PERSONA_KEY = "wizardPersona"
const LEGACY_VISITED_KEY = "portfolio-os-visited"

export function useWizard() {
  const wizardSeen =
    typeof window !== "undefined" ? localStorage.getItem(WIZARD_SEEN_KEY) : null
  const wizardPersona =
    typeof window !== "undefined" ? localStorage.getItem(WIZARD_PERSONA_KEY) : null

  const completeWizard = (persona: "recruiter" | "explorer") => {
    localStorage.setItem(WIZARD_SEEN_KEY, "1")
    localStorage.setItem(WIZARD_PERSONA_KEY, persona)
    localStorage.setItem(LEGACY_VISITED_KEY, "1")
  }

  const skipWizard = () => {
    localStorage.setItem(WIZARD_SEEN_KEY, "1")
    localStorage.setItem(LEGACY_VISITED_KEY, "1")
  }

  const resetWizard = () => {
    localStorage.removeItem(WIZARD_SEEN_KEY)
    localStorage.removeItem(WIZARD_PERSONA_KEY)
    localStorage.removeItem(LEGACY_VISITED_KEY)
    localStorage.removeItem("wizardAutoOpened")
  }

  return { wizardSeen, wizardPersona, completeWizard, skipWizard, resetWizard }
}
