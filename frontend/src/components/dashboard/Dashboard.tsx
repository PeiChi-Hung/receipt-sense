import React from "react";
import { MonthlyExp } from "./MonthlyExp";
import Transactions from "./Transactions";

const Dashboard = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-5">
        <div className="col-span-3 rounded-xl">
          <MonthlyExp />
        </div>
        <div className="col-span-2 rounded-xl bg-muted/50">
          <Transactions />
        </div>
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>
  );
};

export default Dashboard;
