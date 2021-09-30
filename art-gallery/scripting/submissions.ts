export interface Submissions {
  amount: string
  subs: {
    name: string
    url: string
    type?: string
  }[]
}

export function parseSubs({ amount, subs }: Submissions) {
  // console.log(subs.length)

  const cols = 4

  const sectionLen = Math.floor(subs.length / cols)
  const finalSubs = []

  // @ts-ignore
  for (let i = 0; i < cols; i++) finalSubs.push([])

  for (let col = 0; col < cols; col++) {
    for (let ln = 0; ln < sectionLen; ln++) {
      // console.log(ln, col + cols * ln)
      finalSubs[col].push(subs[col + cols * ln] as any as never)
    }
  }

  // old algorithm
  // for (let col = 0; col < cols; col++) {
  //   finalSubs[col] = subs.slice(
  //     col * sectionLen,
  //     col * sectionLen + sectionLen,
  //   )-
  // }

  {
    // fix-up
    let lastIdx = sectionLen * cols - 1

    finalSubs.reverse().forEach(val => {
      if (lastIdx === subs.length - 1) return
      val.push(subs[++lastIdx] as any as never)
    })

    finalSubs.reverse()
  }

  // console.log(finalSubs)
  return { finalSubs, amount, sectionLen }
}
