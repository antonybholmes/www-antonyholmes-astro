const SPLIT_REGEX = /\s+/

// export function clean(cn: string) {
//   // replace multi spaces globally and ignore new lines
//   return cn.replace(/(\s+|\r\n|\n|\r)/gm, " ").trim()
// }

type CSSClass =
  | string
  | number
  | object
  | undefined
  | null
  | boolean
  | CSSClass[]
  | [boolean, CSSClass]
  | [boolean, CSSClass, CSSClass]

function _cn(args: CSSClass, classes: Set<String>) {
  if (!args) {
    return
  }

  switch (typeof args) {
    case "object":
      if (Array.isArray(args)) {
        switch (typeof args[0]) {
          case "boolean":
            switch (args.length) {
              case 2:
                // only run if first element is true
                args[0] && _cn(args[1], classes)
                break
              case 3:
                args[0] ? _cn(args[1], classes) : _cn(args[2], classes)
                break
              default:
                break
            }
            break
          default:
            args.forEach(arg => _cn(arg, classes))
            break
        }
      } else {
        // add keys whose values evaluate to true
        for (const [key, value] of Object.entries(args)) {
          if (value) {
            _cn(key, classes)
          }
        }
      }
      break
    default:
      args
        .toString()
        .split(SPLIT_REGEX)
        .filter(c => c.length > 0)
        .forEach(c => classes.add(c))
      break
  }
}

/**
 * Concatenates strings of class names together to form a class name string.
 * Useful for breaking up long tailwind class strings.
 * Also adds conditional rendering. [condition, 'classes'] will only add the
 * classes if condition is true. [condition, 'classes1', 'classes2'] adds
 * classes1 or classes2 conditionally. Also supports recursive conditionals.
 * [condition1, [condition2, 'classes1', 'classes2'], 'classes3'].
 *
 * @param args string or array of strings of classnames. Also supports condition c
 * @returns a space separated string of class names.
 */
export function cn(...args: CSSClass[]): string | undefined {
  const used = new Set<string>()
  const classes: Set<String> = new Set()

  _cn(args, classes)

  // join all the pieces into one then split on space
  // and remove duplicates
  const ret = Array.from(classes).sort().join(" ")

  if (ret.length > 0) {
    return ret
  } else {
    return undefined
  }
  // .split(" ")
  // .filter(c => {
  //   // keep track of tokens already seen
  //   const ret = !used.has(c)
  //   used.add(c)
  //   return ret
  // })
  // .join(" ")
}
