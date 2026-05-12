"use client";

import React, { useState } from "react";

import {
  Button,
  TextField,
} from "@mui/material";

import StudentForm from "@/components/firstAid/StudentForm";

import StudentTable from "@/components/firstAid/StudentTable";

const FirstAidPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B1120] p-4 text-white md:p-8">

      {/* Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row">
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
        >
          Add New Student
        </Button>

        <TextField
          placeholder="Search..."
          size="small"
          sx={{
            input: {
              color: "white",
            },

            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#475569",
              },

              "&:hover fieldset": {
                borderColor: "#06b6d4",
              },
            },
          }}
        />
      </div>

      {/* Students Table */}
      <StudentTable />

      {/* Student Form */}
      <StudentForm
        open={open}
        handleClose={() => setOpen(false)}
      />
    </div>
  );
};

export default FirstAidPage;