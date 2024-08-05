import { BaseLink } from "@components/link/base-link"
import { VCenterCol } from "@components/v-center-col"
import type { IElementProps } from "@interfaces/element-props"
import { cn } from "@lib/class-names"
import { HEADER_LINKS } from "@menus"

export const LINK_CLS = cn(
  "relative",
  "font-medium",
  "text-sm",
  "h-11",
  "justify-center",
  "whitespace-nowrap",
  "trans-300",
  "transition-colors",
  "whitespace-nowrap",
)

export const LIGHT_CLS = cn(
  "text-gray-500",
  "hover:text-gray-900",
  "active:text-blue-500",
  "dark:text-white/60",
  "dark:hover:text-white",
)

interface ILink {
  name: string
  url: string
}

interface IHeaderLinkProps {
  link: ILink
  selected: boolean
}

export function HeaderLink({ link, selected }: IHeaderLinkProps) {
  // const ref = useRef(null)
  // const [hover, setHover] = useState(false)
  //const [down, setDown] = useState(false)

  // const isFirstRun = useRef(true)
  // const t1 = useRef(null)
  // const t2 = useRef(null)

  // useEffect(() => {
  //   // @ts-ignore
  //   t1.current = gsap
  //     .timeline({ paused: true })
  //     .to(
  //       ref.current,
  //       {
  //         x: "-100%",
  //         width: "100%",
  //         duration: 0,
  //       },
  //       0
  //     )
  //     .to(
  //       ref.current,
  //       {
  //         x: 0,
  //         duration: DURATION,
  //         ease: "power3.out",
  //       },
  //       0
  //     )
  //     .to(
  //       ref.current,
  //       {
  //         x: 10,
  //         duration: DURATION,
  //         ease: "power3.out",
  //       },
  //       0.2
  //     )

  //     .to(
  //       ref.current,
  //       {
  //         x: 0,
  //         duration: DURATION,
  //         ease: "power3.out",
  //       },
  //       0.4
  //     )
  //     .to(
  //       ref.current,
  //       {
  //         width: "95%",
  //         duration: DURATION,
  //         ease: "power3.out",
  //       },
  //       0.5
  //     )
  //     .to(
  //       ref.current,
  //       {
  //         width: "100%",
  //         duration: DURATION,
  //         ease: "power3.out",
  //       },
  //       0.7
  //     )

  //   // @ts-ignore
  //   t2.current = gsap.timeline({ paused: true }).to(
  //     ref.current,
  //     {
  //       x: "110%",
  //       duration: DURATION,
  //       ease: "power3.out",
  //     },
  //     0
  //   )
  // }, [])

  // useEffect(() => {
  //   if (!isFirstRun.current) {
  //     if (hover) {
  //       // @ts-ignore
  //       t2.current.pause()
  //       // @ts-ignore
  //       t1.current.restart()
  //     } else {
  //       // @ts-ignore
  //       t1.current.pause()
  //       // @ts-ignore
  //       t2.current.restart()
  //     }
  //   }

  //   isFirstRun.current = false
  // }, [hover])

  return (
    <BaseLink
      href={link.url}
      aria-label={`View ${link.name}`}
      // onMouseEnter={onMouseEnter}
      // onMouseLeave={onMouseLeave}
      // onMouseDown={() => setDown(true)}
      // onMouseUp={() => setDown(false)}
    >
      <VCenterCol
        className={cn(LINK_CLS, [
          selected,
          "text-blue-600 dark:text-white",
          LIGHT_CLS,
        ])}
      >
        {link.name}

        <div
          className={cn(
            "trans-300 absolute bottom-0 w-full h-2px",

            [selected, "bg-blue-600 dark:bg-transparent"],
          )}
        />
      </VCenterCol>
    </BaseLink>
  )
}

export interface IHeaderProps extends IElementProps {
  tab?: string
  headerMode?: string
  navLightBg?: string
}

export default function HeaderLinks({
  title,
  tab = "",

  className,
}: IHeaderProps) {
  if (!tab) {
    tab = title ?? ""
  }

  tab = tab.toLowerCase()

  return (
    <ul
      className={cn(
        "flex flex-row flex-nowrap items-center gap-x-6 h-full",
        className,
      )}
    >
      {HEADER_LINKS.map((link: ILink, index: number) => {
        const selected = link.name.toLowerCase() === tab

        return (
          <li key={index}>
            <HeaderLink link={link} selected={selected} />
          </li>
        )
      })}
    </ul>
  )
}
