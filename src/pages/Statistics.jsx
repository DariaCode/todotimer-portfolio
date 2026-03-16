/* ----------------------------------------------------
React.js / Statistics page component

Updated: 03/2026
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */

import React, { useState, useEffect } from "react";
import { today } from "../dateHelpers/dateHelpers";
import Overview from "../components/Statistics/Overview";
import BarChart from "../components/Statistics/BarChart";
import AreaChart from "../components/Statistics/AreaChart";

// (http://recharts.org/).
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

// Material-UI components (https://material-ui.com/).
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

// Style for Material-UI components
const styles = theme => ({
  root: {
    display: "flex",
    paddingTop: "84px",
    paddingLeft: "220px",
    flexDirection: "column",
    [theme.breakpoints.down("md")]: {
      paddingTop: "1px",
      paddingLeft: "1px"
    }
  },
  paper: {
    padding: theme.spacing(1.5)
  },
  spinner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: theme.spacing(10)
  }
});

const COLORS = ["#82b5f2", "#fd76a2"];

const StatisticsPage = (props) => {
  const { classes } = props;
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
      
      // Using localStorage instead of GraphQL fetch for the "local" standalone mode
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
    {
      name: "Complete",
      value: stats.complete
    },
    {
      name: "Incomplete",
      value: stats.incomplete
    }
  ];

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container maxWidth="md">
        <Typography component="h1" variant="h4" color="primary" gutterBottom>
          Statistics
        </Typography>
        {isLoading ? (
          <div className={classes.spinner}>
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom
                >
                  Overview
                </Typography>
                <Grid container spacing={3}>
                  <Grid md={6} item xs={12} lg={6}>
                    <Overview
                      complete={stats.complete}
                      incomplete={stats.incomplete}
                      overdue={stats.overdue}
                      total={stats.total}
                    />
                  </Grid>
                  <Grid md={6} item xs={12} lg={6}>
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
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={classes.paper}>
                <Typography
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom
                >
                  Week Completion Rate
                </Typography>
                <BarChart tasks={tasks} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={classes.paper}>
                <Typography
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom
                >
                  Week Completion Curve
                </Typography>
                <AreaChart tasks={tasks} />
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default withStyles(styles)(StatisticsPage);
