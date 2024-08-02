import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Popover,
  Paper,
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

        const ageRangeOrder = ["All", "12+", "16+", "18+", "21+", "All ages"];
        const sortedAgeRanges = uniqueAgeRanges
          .filter((range) => ageRangeOrder.includes(range))
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
            
          <div className="custom-date-range-picker">
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
</div>
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
            <Card
              component={Link}
              to={`/opportunity/${opportunity.opportunityId}`}
              sx={{
                textDecoration: "none",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                border: "none",
                boxShadow: "none",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.03)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={
                  opportunity.pictureUrl ||
                  "https://via.placeholder.com/300x200"
                }
                alt={opportunity.title}
                sx={{ borderRadius: "8px" }}
              />
              <CardContent sx={{ flexGrow: 1, p: 1, pt: 2 }}>
                <Typography
                  variant="subtitle1"
                  component="div"
                  noWrap
                  fontWeight="bold"
                >
                  {opportunity.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {opportunity.organization?.name}
                </Typography>
                {opportunity.dateTime && (
                  <Typography variant="body2" color="text.secondary">
                    {new Date(opportunity.dateTime).toLocaleString([], {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Typography>
                )}
                <Box
                  sx={{
                    mt: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    {opportunity.relatedCause}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {opportunity.spotsAvailable} spots
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default VolOppContainer;