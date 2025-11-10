import React, { FC, useEffect, useState } from "react";
import UserAnalytics from "../Analytics/UserAnalytics";
import { BiBorderLeft } from "react-icons/bi";
import { PiUsersFourLight } from "react-icons/pi";
import { Box, CircularProgress } from "@mui/material";
import AllInvoices from "../Order/AllInvoices";
import {
  useGetOrdersAnalyticsQuery,
  useGetUsersAnalyticsQuery,
} from "../../../../redux/features/analytics/analyticApi";
import OrderAnalytics from "../Analytics/OrderAnalytics";

type Props = {
  open?: boolean;
  value?: number;
};

const CircularProgressWithLabel: FC<Props> = ({ open, value }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        color={value && value > 99 ? "info" : "error"}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Box>
    </Box>
  );
};

const DashboardWidgets: FC<Props> = ({ open }) => {
  const [ordersComparePercentage, setOrdersComparePercentage] = useState<any>();
  const [userComparePercentage, setuserComparePercentage] = useState<any>();

  const { data, isLoading } = useGetUsersAnalyticsQuery({});
  const { data: ordersData, isLoading: ordersLoading } =
    useGetOrdersAnalyticsQuery({});

  useEffect(() => {
    if (isLoading && ordersLoading) {
      return;
    } else {
      if (data && ordersData) {
        const usersLastTwoMonths = data.users.last12Months.slice(-2);
        const ordersLastTwoMonths = ordersData.orders.last12Months.slice(-2);

        if (
          usersLastTwoMonths.length === 2 &&
          ordersLastTwoMonths.length === 2
        ) {
          const usersCurrentMonth = usersLastTwoMonths[1].count;
          const usersPreviousMonth = usersLastTwoMonths[0].count;
          const ordersCurrentMonth = ordersLastTwoMonths[1].count;
          const ordersPreviousMonth = ordersLastTwoMonths[0].count;

          const usersPercentChange =
            usersPreviousMonth !== 0
              ? ((usersCurrentMonth - usersPreviousMonth) /
                  usersPreviousMonth) *
                100
              : 100;

          const ordersPercentChange =
            ordersPreviousMonth !== 0
              ? ((ordersCurrentMonth - ordersPreviousMonth) /
                  ordersPreviousMonth) *
                100
              : 100;

          setuserComparePercentage({
            currentMonth: usersCurrentMonth,
            previousMonth: usersPreviousMonth,
            percentChange: usersPercentChange,
          });

          setOrdersComparePercentage({
            currentMonth: ordersCurrentMonth,
            previousMonth: ordersPreviousMonth,
            percentChange: ordersPercentChange,
          });
        }
      }
    }
  }, [isLoading, ordersLoading, data, ordersData]);

  return (
    <div className="space-y-6">
      {/* Top Section - Analytics and Stats */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* User Analytics - Takes 3 columns on xl screens */}
        <div className="xl:col-span-3">
          <div className="bg-white dark:bg-[#111C43] rounded-lg shadow-lg p-6 h-full">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              User Analytics
            </h3>
            <UserAnalytics isDashboard={true} />
          </div>
        </div>

        {/* Stats Cards - Takes 1 column on xl screens, stacks on smaller screens */}
        <div className="xl:col-span-1 space-y-4">
          {/* Sales Card */}
          <div className="bg-white dark:bg-[#111C43] rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <BiBorderLeft className="dark:text-[#45CBA0] text-gray-700 text-2xl mr-2" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Sales
                  </span>
                </div>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {ordersComparePercentage?.currentMonth || 0}
                </h4>
                <p className="text-sm text-gray-600 dark:text-[#45CBA0]">
                  Sales Obtained
                </p>
              </div>
              <div className="flex flex-col items-center">
                <CircularProgressWithLabel
                  value={ordersComparePercentage?.percentChange > 0 ? 100 : 0}
                  open={open}
                />
                <span className="text-xs font-medium mt-2 text-gray-600 dark:text-white">
                  {ordersComparePercentage?.percentChange > 0
                    ? "+" + ordersComparePercentage?.percentChange.toFixed(2)
                    : ordersComparePercentage?.percentChange?.toFixed(2) ||
                      "0"}{" "}
                  %
                </span>
              </div>
            </div>
          </div>

          {/* Users Card */}
          <div className="bg-white dark:bg-[#111C43] rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <PiUsersFourLight className="dark:text-[#45CBA0] text-gray-700 text-2xl mr-2" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Users
                  </span>
                </div>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userComparePercentage?.currentMonth || 0}
                </h4>
                <p className="text-sm text-gray-600 dark:text-[#45CBA0]">
                  New Users
                </p>
              </div>
              <div className="flex flex-col items-center">
                <CircularProgressWithLabel
                  value={userComparePercentage?.percentChange > 0 ? 100 : 0}
                  open={open}
                />
                <span className="text-xs font-medium mt-2 text-gray-600 dark:text-white">
                  {userComparePercentage?.percentChange > 0
                    ? "+" + userComparePercentage?.percentChange.toFixed(2)
                    : userComparePercentage?.percentChange?.toFixed(2) ||
                      "0"}{" "}
                  %
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Order Analytics and Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Analytics - Takes 2 columns on lg screens */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-[#111c43] rounded-lg shadow-lg p-6 h-full">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Order Analytics
            </h3>
            <div className="h-80">
              <OrderAnalytics isDashboard={true} />
            </div>
          </div>
        </div>

        {/* Recent Transactions - Takes 1 column on lg screens */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-[#111c43] rounded-lg shadow-lg p-6 h-full">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Transactions
            </h3>
            <div className="overflow-y-auto max-h-80">
              <AllInvoices isDashboard={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;
