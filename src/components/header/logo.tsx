export function Logo() {
  //const [hover, setHover] = useState(false)
  //const [down, setDown] = useState(false)

  return (
    <a href="/" className="inline-flex gap-x-1 items-center " aria-label="Home">
      <span className="flex w-8 h-8 bg-white/30 flex-row items-center justify-center rounded font-semibold shadow hover:shadow-none hover:bg-white/40 text-white trans-all">
        ah
      </span>
      <span className="text-white/80">.dev</span>
    </a>
  )
}
