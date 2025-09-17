'use client'

import { useRouter } from "next/navigation"
import { useDraftModeEnvironment } from "next-sanity/hooks"

function DisableDraftMode() {
    const environment = useDraftModeEnvironment()
    const router = useRouter()

    if (environment !== "live" && environment !== "unknown") {
        return null
    }
    const handleClick = async () => {
        await fetch("/draft-mode/disable")
        router.refresh()
    }

    return (
        <button className="fixed bottom-4 right-4 bg-gray-50 px-4 py-2 z-50"
            onClick={handleClick}
        >
            Disable Draft Mode
        </button>
    )
}

export default DisableDraftMode
