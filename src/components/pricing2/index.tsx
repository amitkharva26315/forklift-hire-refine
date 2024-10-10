import React from "react";
import { Grid, Card, CardContent, Typography, Button, List, ListItem } from "@mui/material";

const pricingPlans = [
  {
    title: "Free",
    price: "$0",
    duration: "/month",
    features: [
      "1 user",
      "Basic API access",
      "Limited support",
    ],
    buttonText: "Get Started",
  },
  {
    title: "Basic",
    price: "$12",
    duration: "/month",
    features: [
      "5 users",
      "Extended API access",
      "Email support",
    ],
    buttonText: "Buy Now",
  },
  {
    title: "Pro",
    price: "$24",
    duration: "/month",
    features: [
      "Unlimited users",
      "Priority API access",
      "24/7 support",
    ],
    buttonText: "Start Free Trial",
  },
];

const Pricing2 = () => {
  return (
    <Grid container spacing={4} justifyContent="center">
      {pricingPlans.map((plan) => (
        <Grid item xs={12} sm={6} md={4} key={plan.title}>
          <Card elevation={3} sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h5" align="center" gutterBottom>
                {plan.title}
              </Typography>
              <Typography variant="h4" align="center" gutterBottom>
                {plan.price}{" "}
                <Typography variant="body1" component="span">
                  {plan.duration}
                </Typography>
              </Typography>
              <List>
                {plan.features.map((feature, index) => (
                  <ListItem key={index}>
                    <Typography variant="body2">{feature}</Typography>
                  </ListItem>
                ))}
              </List>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  mt: 2,
                  bgcolor: "primary.main",
                  color: "white",
                }}
              >
                {plan.buttonText}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Pricing2;
