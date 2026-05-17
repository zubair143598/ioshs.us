"use client";

import React, { useState } from "react";

import { Box, IconButton, Tooltip } from "@mui/material";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import { useQuery,  useMutation, useQueryClient } from "@tanstack/react-query";

import axios from "axios";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";

import DownloadCertificate from "./DownloadCertificate";

const StudentTable = ({ handleEdit }) => {
  // Fetch Students
  const { data, isLoading } = useQuery({
    queryKey: ["students"],

    queryFn: async () => {
      const response = await axios.get("/api/students");

      return response.data.data;
    },
  });

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
  mutationFn: async (id) => {
    const response = await axios.delete(`/api/students/${id}`);
    return response.data;
  },

  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["students"] });
  },

  onError: (error) => {
    console.log(error);
    alert(error?.response?.data?.message || "Delete failed");
  },
});

  // Convert MongoDB data for DataGrid
  const rows =
    data?.map((student, index) => ({
      id: student._id,

      serialNo: index + 1,
      originalData: student,

      studentName: student.studentName,

      email: student.email,

      registrationNo: student.registrationNo,

      courseName: student.courseName,

      courseTitle: student.courseTitle,

      certificateDescription: student.certificateDescription,

      result: student.result,

      issuingBody: student.issuingBody,

      completionDate: new Date(student.completionDate).toLocaleDateString(),

      grade: student.grade,
    })) || [];

  const columns = [
    {
      field: "serialNo",
      headerName: "S.No",
      width: 50,
    },

    {
      field: "studentName",
      headerName: "Student Name",
      minWidth: 190,
      flex: 1,
    },

    {
      field: "email",
      headerName: "Email",
      minWidth: 220,
      flex: 1,
    },

    {
      field: "registrationNo",
      headerName: "Registration No",
      minWidth: 150,
      flex: 1,
    },

    {
      field: "courseName",
      headerName: "Course Title",
      minWidth: 220,
      flex: 1,
    },

    {
      field: "courseTitle",
      headerName: "Course Title",
      minWidth: 220,
      flex: 1,
    },

    {
      field: "issuingBody",
      headerName: "Issuing Body",
      minWidth: 150,
      flex: 1,
    },

    {
      field: "completionDate",
      headerName: "Completion Date",
      minWidth: 150,
      flex: 1,
    },

    {
      field: "grade",
      headerName: "Grade",
      width: 100,
    },

    {
      field: "result",

      headerName: "Result",

      minWidth: 160,

      renderCell: (params) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold
        
        ${
          params.value === "PASS"
            ? "bg-green-500/20 text-green-400"
            : params.value === "FAIL"
              ? "bg-red-500/20 text-red-400"
              : params.value === "PENDING"
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-blue-500/20 text-blue-400"
        }`}
        >
          {params.value}
        </span>
      ),
    },

    {
      field: "actions",

      headerName: "Action",

      minWidth: 190,

      sortable: false,

      renderCell: (params) => (
        <div className="flex items-center gap-2">
          {/* Edit */}
          <Tooltip title="Edit">
            <IconButton onClick={() => handleEdit(params.row.originalData)}>
              <EditIcon sx={{ color: "#06b6d4" }} />
            </IconButton>
          </Tooltip>

          {/* Delete */}
         <Tooltip title="Delete">
  <IconButton
    onClick={() => {
      if (confirm("Are you sure you want to delete this student?")) {
        deleteMutation.mutate(params.row.id);
      }
    }}
  >
    <DeleteIcon sx={{ color: "#ef4444" }} />
  </IconButton>
</Tooltip>
          {/* Download */}
          <Tooltip title="Download Certificate">
            <IconButton
              onClick={() => DownloadCertificate(params.row.originalData)}
            >
              <DownloadIcon
                sx={{
                  color: "#facc15",
                }}
              />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div
      className="
        w-full 
        rounded-2xl 
        overflow-hidden
        bg-[#121416]
        text-white
      "
    >
      <DataGrid
        rows={rows}
        columns={columns}
        loading={isLoading}
        disableRowSelectionOnClick
        slots={{
          toolbar: GridToolbar,
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
        pageSizeOptions={[20, 30, 50]}
        sx={{
          backgroundColor: "#111827",

          color: "white",

          borderRadius: "1rem",

          border: "none",

          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#1F2937",
            color: "white",
            borderBottom: "1px solid #374151",
          },

          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #1F2937",
          },

          "& .MuiDataGrid-row:hover": {
            backgroundColor: "rgba(6, 182, 212, 0.15) !important",

            color: "#22d3ee",
          },

          "& .MuiTablePagination-root": {
            color: "white",
          },

          "& .MuiSvgIcon-root": {
            color: "white",
          },

          "& .MuiDataGrid-toolbarContainer": {
            padding: "10px",
            borderBottom: "1px solid #1F2937",
          },

          "& .MuiButton-text": {
            color: "#22d3ee",
          },
          "& .MuiDataGrid-sortButton": {
            background: "#1F2937 !important",
          },
        }}
      />
    </div>
  );
};

export default StudentTable;
