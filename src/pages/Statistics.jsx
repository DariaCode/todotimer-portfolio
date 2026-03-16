/* ----------------------------------------------------
React.js / Statistics page component

Updated: 03/2026 (MUI v6)
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

import React, { useState, useEffect } from "react";
import { today } from "../utils/dateUtils";
import Overview from "../components/Statistics/Overview";
import BarChart from "../components/Statistics/BarChart";
import AreaChart from "../components/Statistics/AreaChart";

// (http://recharts.org/).
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

// Material-UI components (https://mui.com/).
import CircularProgress from "@mui/material/CircularProgress";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const COLORS = ["#82b5f2", "#fd76a2"];

const StatisticsPage = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({
    complete: 0,
    incomplete: 0,
    overdue: 0,
    total: 0
  });

  useEffect(() => {
    const fetchTasks = () => {
      setIsLoading(true);
      const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      
      const processedTasks = savedTasks.map(task => {
        if (task.date === "1970-01-01T00:00:00.000Z") {
          task.date = null;
        } else if (task.date) {
          task.date = new Date(task.date).toISOString();
        }
        return task;
      });

      const total = processedTasks.length;
      const complete = processedTasks.filter(task => task.complete === true).length;
      const incomplete = total - complete;
      const overdue = processedTasks.filter(
        task => task.date && task.date < today && task.complete === false
      ).length;

      setTasks(processedTasks);
      setStats({
        complete,
        incomplete,
        overdue,
        total
      });
      setIsLoading(false);
    };

    fetchTasks();
  }, []);

  const pieData = [
    { name: "Complete", value: stats.complete },
    { name: "Incomplete", value: stats.incomplete }
  ];

  return (
    <Box sx={{ 
        display: "flex", 
        paddingTop: { xs: "1px", md: "84px" }, 
        paddingLeft: { xs: "1px", md: "220px" }, 
        flexDirection: "column" 
    }}>
      <CssBaseline />
      <Container maxWidth="md">
        <Typography component="h1" variant="h4" color="primary" gutterBottom>
          Statistics
        </Typography>
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: 10 }}>
            <CircularProgress color="secondary" />
          </Box>
        ) : (
          <Grid container spacing={3}>
            <Grid size={12}>
              <Paper sx={{ padding: 1.5 }}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                  Overview
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6, lg: 6 }}>
                    <Overview
                      complete={stats.complete}
                      incomplete={stats.incomplete}
                      overdue={stats.overdue}
                      total={stats.total}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6, lg: 6 }}>
                    <ResponsiveContainer width="100%" height={240}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          label
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 6 }}>
              <Paper sx={{ padding: 1.5 }}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                  Week Completion Rate
                </Typography>
                <BarChart tasks={tasks} />
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 6 }}>
              <Paper sx={{ padding: 1.5 }}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                  Week Completion Curve
                </Typography>
                <AreaChart tasks={tasks} />
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default StatisticsPage;
