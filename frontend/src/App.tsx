import { MonthlyExp } from "@/components/dashboard/MonthlyExp"
import Transactions from "./components/dashboard/Transactions"

export default function App() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-5 ">
        <div className="rounded-xl col-span-3">
          <MonthlyExp />
        </div>
        <div className="rounded-xl bg-muted/50 col-span-2">
          <Transactions />
        </div>
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>
  )
}
