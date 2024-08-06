import { CloseIcon } from "@components/icons/close-icon"
import { SearchIcon } from "@components/icons/search-icon"
import { VCenterRow } from "@components/v-center-row"
import type { IElementProps } from "@interfaces/element-props"
import { cn } from "@lib/class-names"
import { useEffect, useState } from "react"

interface ISearchButtonProps {
  globalHover: boolean
  onClick: any
}

function SearchButton({ onClick }: ISearchButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label="Search"
      className="trans-300 flex h-7 w-7 min-w-7 grow-0 flex-row items-center justify-center "
    >
      <SearchIcon />
    </button>
  )
}

interface ClearButtonProps {
  onClick: any
  visible: boolean
}

function ClearButton({ onClick, visible }: ClearButtonProps) {
  return (
    <button
      className={cn(
        "trans-300 flex h-7 w-7 min-w-7 grow-0 flex-row items-center justify-center  ",
        [visible, "visible", "invisible"],
      )}
      style={{ strokeWidth: "3px" }}
      onClick={onClick}
    >
      <CloseIcon className=" stroke-2" />
    </button>
  )
}

interface SearchBarProps extends IElementProps {
  text?: string
  placeholder?: string
  onSearch?: (text: string, clicked: boolean) => void
}

export function SearchBar({
  text = "",
  placeholder = "Search items...",
  className,
  onSearch,
}: SearchBarProps) {
  const [_, setHover] = useState(false)
  const [value, setValue] = useState("")

  useEffect(() => {
    setValue(text)
  }, [])

  useEffect(() => {
    setValue(text)
  }, [text])

  function onMouseEnter() {
    setHover(true)
  }

  function onMouseLeave() {
    setHover(false)
  }

  function onKeyDown(e: any) {
    if (e.key === "Enter") {
      if (onSearch) {
        console.group("ssss0", e.target.value)
        onSearch(e.target.value, true)
      }
    }
  }

  function onChange(e: any) {
    setValue(e.target.value)

    if (onSearch) {
      onSearch(e.target.value, e.target.value === "")
    }
  }

  function onClick() {
    if (onSearch) {
      onSearch(value, true)
    }
  }

  function onClear() {
    setValue("")

    if (onSearch) {
      onSearch("", true)
    }
  }

  return (
    <VCenterRow
      className={cn(
        "trans-300 m-0 gap-x-2 overflow-hidden rounded-lg border border-gray-100 bg-gray-100 py-1 pl-3 pr-2 transition hover:border-border hover:bg-white",
        className,
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <input
        type="text"
        aria-label="Search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="grow bg-transparent text-sm outline-none"
      />

      <ClearButton onClick={onClear} visible={value !== ""} />
      <span
        className={cn("h-6 border-l border-border", [
          value !== "",
          "visible",
          "invisible",
        ])}
      />

      <SearchButton globalHover={value !== ""} onClick={onClick} />
    </VCenterRow>
  )
}
