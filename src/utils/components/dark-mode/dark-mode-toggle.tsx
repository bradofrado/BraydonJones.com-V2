import { ToggleSwitch } from "../base/toggle-switch"
import { useDarkMode } from "./dark-mode-context";

export type DarkModeToggleProps = {}
export const DarkModelToggle = ({}: DarkModeToggleProps) => {
    const [darkMode, setDarkMode] = useDarkMode();
    return <>
        <ToggleSwitch value={darkMode} onChange={setDarkMode}/>
    </>
}