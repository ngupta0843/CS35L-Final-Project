import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

const StatCard = ({ title, fetchValue, color }) => {
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (typeof fetchValue === "function") {
        const result = await fetchValue();
        setValue(result.value);
        setDescription(result.description);
      }
    };
    fetchData();
  }, [fetchValue]);

  return (
    <Card
      sx={{
        backgroundColor: "background.paper",
        borderRadius: 4,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        padding: "20px",
        height: "280px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Box sx={{ position: "absolute", top: 16, right: 16, color: color }}>
        <LocalFireDepartmentIcon fontSize="large" />
      </Box>
      <CardContent
        sx={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "7px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold" color="primary">
            {title}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "baseline",
            gap: "10px",
          }}
        >
          <Typography variant="h4" fontWeight="bold" color="textPrimary">
            {value}
          </Typography>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{
              color: description.toLowerCase().includes("decrease")
                ? "red"
                : "#90ee90", // Light green shade
            }}
          >
            {description}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ marginTop: "2px" }}
        >
          Total calories burned today
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatCard;
