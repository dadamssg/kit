import { info } from "kit-bridge/esm/util"

let { formatDistanceToNowStrict, format, compareAsc } =
  await npm("date-fns")

let { schedule } = await global.getSchedule()

let choices = (
  await Promise.all(
    schedule.map(async ({ filePath, date }) => {
      let script = await info(filePath)
      let d = new Date(date)
      return {
        date,
        name: script?.menu || script.command,
        description: `Next ${formatDistanceToNowStrict(
          d
        )} - ${format(d, "MMM eo, h:mm:ssa ")} - ${
          script.schedule
        }`,
        value: filePath,
      }
    })
  )
).sort(({ date: a }, { date: b }) =>
  compareAsc(new Date(a), new Date(b))
)

let filePath = await arg(
  "Which script do you want to edit?",
  choices
)

edit(filePath, kenvPath())

export {}
