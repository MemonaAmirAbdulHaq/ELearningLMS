import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { useTheme } from "next-themes";
import { useGetAllCoursesQuery } from "../../../../redux/features/course/courseApi";
import Loader from "../../Common/Loader/Loader";
import { format } from "timeago.js";
import { useGetAllOrdersQuery } from "../../../../redux/features/orders/ordersApi";
import { useGetAllUsersQuery } from "../../../../redux/features/user/userApi";
import { AiOutlineMail } from "react-icons/ai";

type Props = {
  isDashboard?: boolean;
};

const AllInvoices = ({ isDashboard }: Props) => {
  const { theme, setTheme } = useTheme();
  const { isLoading, data } = useGetAllOrdersQuery({});
  const { data: usersData } = useGetAllUsersQuery({});
  const { data: coursesData } = useGetAllCoursesQuery({});

  const [orderData, setOrderData] = useState<any>([]);

  useEffect(() => {
    if (data) {
      const temp = data.orders.map((item: any) => {
        const user = usersData?.users.find(
          (user: any) => user._id === item.userId
        );
        const course = coursesData?.courses.find(
          (course: any) => course._id === item.courseId
        );
        return {
          ...item,
          userName: user?.name,
          userEmail: user?.email,
          title: course?.name,
          price: "$" + course?.price,
        };
      });
      setOrderData(temp);
    }
  }, [data, usersData, coursesData]);

  const columns: any = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "userName", headerName: "Name", flex: isDashboard ? 0.6 : 0.5 },
    ...(isDashboard
      ? []
      : [
          { field: "userEmail", headerName: "Email", flex: 1 },
          { field: "title", headerName: "Course Title", flex: 1 },
        ]),
    { field: "price", headerName: "Price", flex: 0.5 },
    ...(isDashboard
      ? [{ field: "created_at", headerName: "Created At", flex: 0.5 }]
      : [
          {
            field: " ",
            headerName: "Email",
            flex: 0.2,
            renderCell: (params: any) => {
              return (
                <Button>
                  <a
                    target="_blank"
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                      params.row.userEmail
                    )}`}
                  >
                    <AiOutlineMail
                      className="dark:text-white text-black"
                      size={20}
                    />
                  </a>
                </Button>
              );
            },
          },
        ]),
  ];

  const rows: any = [];

  orderData &&
    orderData.forEach((item: any) => {
      rows.push({
        id: item._id,
        userName: item.userName,
        userEmail: item.userEmail,
        title: item.title,
        price: item.price,
        created_at: format(item.createdAt),
      });
    });

  return (
    <div className={!isDashboard ? "mt-[120px]" : "mt-[0px]"}>
      {isLoading ? (
        <Loader />
      ) : (
        <Box m={isDashboard ? "0" : "40px"}>
          <Box
            m={isDashboard ? "0" : "40px 0 0 0"}
            height={isDashboard ? "35vh" : "90vh"}
            overflow={"hidden"}
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
                borderRadius: "12px",
                overflow: "hidden",
              },
              "& .MuiDataGrid-sortIcon": {
                color: "#fff",
              },
              "& .MuiDataGrid-row": {
                color:
                  theme === "dark" ? "#fff !important" : "#1a1a1a !important",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                "&:hover": {
                  backgroundColor: "rgba(100, 116, 139, 0.1) !important",
                },
                "&.Mui-selected": {
                  backgroundColor: "rgba(59, 130, 246, 0.15) !important",
                  "&:hover": {
                    backgroundColor: "rgba(59, 130, 246, 0.25) !important",
                  },
                },
              },
              "& .MuiTablePagination-root": {
                color: "#fff",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
                fontSize: "14px",
              },
              // Unified blue header theme
              // "& .MuiDataGrid-columnHeaders": {
              //   backgroundColor: "#3b82f6",
              //   borderBottom: "none",
              //   color: "#fff",
              //   fontSize: "15px",
              //   fontWeight: "600",
              // },
              // "& .MuiDataGrid-columnHeadersInner": {
              //   backgroundColor: "#3b82f6",
              // },
              // "& .MuiDataGrid-columnHeader": {
              //   backgroundColor: "#3b82f6",
              //   color: "#fff",
              // },
              // "& .MuiDataGrid-columnHeaderCheckbox": {
              //   backgroundColor: "#3b82f6",
              // },
              // Purple–Indigo Gradient Header Theme
"& .MuiDataGrid-columnHeaders": {
  background: "linear-gradient(90deg, #6d28d9, #4f46e5)", // purple → indigo
  borderBottom: "none",
  color: "#fff",
  fontSize: "15px",
  fontWeight: "600",
},
"& .MuiDataGrid-columnHeadersInner": {
  background: "linear-gradient(90deg, #6d28d9, #4f46e5)",
},
"& .MuiDataGrid-columnHeader": {
  background: "linear-gradient(90deg, #6d28d9, #4f46e5)",
  color: "#fff",
},
"& .MuiDataGrid-columnHeaderCheckbox": {
  background: "linear-gradient(90deg, #6d28d9, #4f46e5)",
},

              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: "600",
                color: "#fff",
              },
              // Body background adapts to theme
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor:
                  theme === "dark"
                    ? "#1e293b !important"
                    : "#f8fafc !important",
              },
              // Footer matches header
              // "& .MuiDataGrid-footerContainer": {
              //   color: "#fff",
              //   borderTop: "none",
              //   backgroundColor: "#3b82f6",
              //   borderBottomLeftRadius: "12px",
              //   borderBottomRightRadius: "12px",
              // },
                           "& .MuiDataGrid-footerContainer": {
  color: "#fff",
  borderTop: "none",
  background: "linear-gradient(90deg, #6d28d9, #4f46e5)", // purple → indigo
  borderBottomLeftRadius: "12px",
  borderBottomRightRadius: "12px",
},
              "& .MuiCheckbox-root": {
                color: "#fff !important",
              },
              "& .MuiDataGrid-toolbarContainer": {
                backgroundColor: "#3b82f6",
                color: "#fff",
                borderTopLeftRadius: "12px",
                borderTopRightRadius: "12px",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: "#fff !important",
              },
              "& .MuiDataGrid-columnSeparator": {
                color: "rgba(255,255,255,0.3)",
              },
              // Menu and panel styling
              "& .MuiDataGrid-panelHeader": {
                backgroundColor: "#3b82f6",
                color: "#fff",
              },
              "& .MuiMenu-paper": {
                backgroundColor:
                  theme === "dark"
                    ? "#334155 !important"
                    : "#ffffff !important",
                color:
                  theme === "dark" ? "#fff !important" : "#1a1a1a !important",
                boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                borderRadius: "8px",
              },
              // Icon colors
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: "#fff",
              },
              "& .MuiDataGrid-menuIconButton": {
                color: "#fff",
              },
              "& .MuiDataGrid-filterIcon": {
                color: "#fff",
              },
            }}
          >
            <DataGrid
              checkboxSelection={isDashboard ? false : true}
              rows={rows}
              columns={columns}
              slots={isDashboard ? {} : { toolbar: GridToolbar }}
            />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AllInvoices;
