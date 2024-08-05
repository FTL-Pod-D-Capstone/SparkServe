import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Popover,
} from "@mui/material";
import { DateRangePicker } from "react-date-range";
import { format } from "date-fns";
import { enUS } from 'date-fns/locale';
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import axios from "axios";
import { Link } from "react-router-dom";
import LinearGradientLoading from "./LinearGradientLoading";
import "./CustomStyles.css";


const VolOppContainer = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nameFilter, setNameFilter] = useState("");
  const [organizationFilter, setOrganizationFilter] = useState("");
  const [causeFilter, setCauseFilter] = useState("");
  const [dateRangeFilter, setDateRangeFilter] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);
  const [ageRangeFilter, setAgeRangeFilter] = useState("");
  const [organizations, setOrganizations] = useState([]);
  const [causes, setCauses] = useState([]);
  const [ageRanges, setAgeRanges] = useState([]);
  const [opportunitiesByDate, setOpportunitiesByDate] = useState({});
  const [dateAnchorEl, setDateAnchorEl] = useState(null);
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const getOpportunities = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/opps`);
        const opportunitiesData = response.data;
        // console.log('Fetched opportunities:', opportunitiesData);

        setOpportunities(opportunitiesData);
        setFilteredOpportunities(opportunitiesData);

        const oppsByDate = opportunitiesData.reduce((acc, opp) => {
          const date = new Date(opp.dateTime).toDateString();
          if (!acc[date]) {
            acc[date] = 0;
          }
          acc[date]++;
          return acc;
        }, {});
        setOpportunitiesByDate(oppsByDate);

        const uniqueOrganizations = [
          ...new Set(
            opportunitiesData
              .map((opp) => opp.organization?.name)
              .filter(Boolean)
          ),
        ];
        const uniqueCauses = [
          ...new Set(
            opportunitiesData.map((opp) => opp.relatedCause).filter(Boolean)
          ),
        ];
        const uniqueAgeRanges = [
          ...new Set(
            opportunitiesData.map((opp) => opp.ageRange).filter(Boolean)
          ),
        ];

        // Sort age ranges
        const ageRangeOrder = ["All", "12+", "16+", "18+", "21+", "All ages"];
        const sortedAgeRanges = uniqueAgeRanges
          .filter(range => ageRangeOrder.includes(range))
          .sort((a, b) => ageRangeOrder.indexOf(a) - ageRangeOrder.indexOf(b));

        setOrganizations(uniqueOrganizations);
        setCauses(uniqueCauses);
        setAgeRanges(["All", ...sortedAgeRanges]);

        setIsLoading(false);
      } catch (err) {
        console.error("Error getting opportunities:", err);
        setError("Failed to load opportunities.");
        setIsLoading(false);
      }
    };

    getOpportunities();
  }, []);

  useEffect(() => {
    const filtered = opportunities.filter((opp) => {
      const oppDate = new Date(opp.dateTime);
      const startDate = dateRangeFilter[0].startDate;
      const endDate = dateRangeFilter[0].endDate;
      
      return (
        opp.title.toLowerCase().includes(nameFilter.toLowerCase()) &&
        (organizationFilter === "" || opp.organization?.name === organizationFilter) &&
        (causeFilter === "" || opp.relatedCause === causeFilter) &&
        ((!startDate && !endDate) || (oppDate >= startDate && oppDate <= endDate)) &&
        (ageRangeFilter === "" || opp.ageRange === ageRangeFilter)
      );
    });
    setFilteredOpportunities(filtered);
  }, [
    nameFilter,
    organizationFilter,
    causeFilter,
    dateRangeFilter,
    ageRangeFilter,
    opportunities,
  ]);

  const handleDateClick = (event) => {
    setDateAnchorEl(event.currentTarget);
  };

  const handleDateClose = () => {
    setDateAnchorEl(null);
  };

  const handleDateRangeChange = (item) => {
    setDateRangeFilter([item.selection]);
  };

  const handleClearDateRange = () => {
    setDateRangeFilter([
      {
        startDate: null,
        endDate: null,
        key: "selection",
      },
    ]);
    setDateAnchorEl(null);
  };

  const dateRangeOpen = Boolean(dateAnchorEl);
  const dateRangeId = dateRangeOpen ? "date-range-popover" : undefined;

  const PosterCard = ({ opportunity }) => (
    <Paper
      component={Link}
      to={`/opportunity/${opportunity.opportunityId}`}
      sx={{
        textDecoration: "none",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-10px)",
          boxShadow: "0 12px 20px rgba(0,0,0,0.2)",
        },
        position: "relative",
      }}
    >
      <Box
        sx={{
          backgroundImage: `url(${opportunity.pictureUrl || "https://via.placeholder.com/300x200"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "200px",
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))",
          },
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: "bold",
            color: "#ffffff", 
            textShadow: "1px 1px 2px rgba(0,0,0,0.8)", 
            position: "absolute",
            bottom: 16,
            left: 16,
            right: 16,
            maxHeight: "4.5em",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            zIndex: 1, 
          }}
        >
          {opportunity.title}
        </Typography>
      </Box>
      <Box sx={{ p: 2, flexGrow: 1 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          <strong>Organization:</strong> {opportunity.organization?.name}
        </Typography>
        {opportunity.dateTime && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            <strong>Date:</strong> {new Date(opportunity.dateTime).toLocaleString([], {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          <strong>Cause:</strong> {opportunity.relatedCause}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Spots:</strong> {opportunity.spotsAvailable}
        </Typography>
      </Box>
    </Paper>
  );

  if (isLoading) return <LinearGradientLoading />;
  if (error) return <div>{error}</div>;

  return (
    <Box sx={{ width: "100%", mt: 4 }}>
      <Box sx={{ mb: 4, display: "flex", flexWrap: "wrap", gap: 2 }}>
        <TextField
          label="Search opportunities"
          variant="outlined"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          sx={{
            flexGrow: 1,
            minWidth: "200px",
            "& .MuiOutlinedInput-root": {
              backgroundColor: "white",
            },
          }}
        />
        <FormControl variant="outlined" sx={{ minWidth: "150px" }}>
          <InputLabel>Organization</InputLabel>
          <Select
            value={organizationFilter}
            onChange={(e) => setOrganizationFilter(e.target.value)}
            label="Organization"
            sx={{ backgroundColor: "white" }}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {organizations.map((org) => (
              <MenuItem key={org} value={org}>
                {org}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" sx={{ minWidth: "150px" }}>
          <InputLabel>Cause</InputLabel>
          <Select
            value={causeFilter}
            onChange={(e) => setCauseFilter(e.target.value)}
            label="Cause"
            sx={{ backgroundColor: "white" }}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {causes.map((cause) => (
              <MenuItem key={cause} value={cause}>
                {cause}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          onClick={handleDateClick}
          startIcon={<CalendarTodayIcon />}
          sx={{ backgroundColor: "white" }}
        >
          {dateRangeFilter[0].startDate && dateRangeFilter[0].endDate
            ? `${format(dateRangeFilter[0].startDate, "MMM d, yyyy")} - ${format(dateRangeFilter[0].endDate, "MMM d, yyyy")}`
            : "Select Date Range"}
        </Button>
        <Popover
          id={dateRangeId}
          open={dateRangeOpen}
          anchorEl={dateAnchorEl}
          onClose={handleDateClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Paper sx={{ p: 2, width: 'auto' }}>
            <DateRangePicker
              onChange={handleDateRangeChange}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={1}
              ranges={dateRangeFilter}
              direction="horizontal"
              minDate={new Date()}
              locale={enUS}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button onClick={handleClearDateRange} sx={{ mr: 1 }}>
                Clear
              </Button>
              <Button onClick={handleDateClose} variant="contained">
                Apply
              </Button>
            </Box>
          </Paper>
        </Popover>
        <FormControl variant="outlined" sx={{ minWidth: "150px" }}>
          <InputLabel>Age Range</InputLabel>
          <Select
            value={ageRangeFilter}
            onChange={(e) => setAgeRangeFilter(e.target.value)}
            label="Age Range"
            sx={{ backgroundColor: "white" }}
          >
            {ageRanges.map((range) => (
              <MenuItem key={range} value={range === "All" ? "" : range}>
                {range}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {filteredOpportunities.map((opportunity) => (
          <Grid item xs={12} sm={6} md={4} key={opportunity.opportunityId}>
            <PosterCard opportunity={opportunity} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default VolOppContainer;