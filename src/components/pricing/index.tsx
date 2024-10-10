import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';

const Pricing = () => {
  return (
    <Container>
      <Grid container spacing={4}>
        {['Free', 'Pro', 'Enterprise'].map((plan) => (
          <Grid item xs={12} sm={6} md={4} key={plan}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {plan} Plan
                </Typography>
                <Typography variant="h6" component="div">
                  ${plan === 'Free' ? '0' : plan === 'Pro' ? '15' : '30'}/mo
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {plan === 'Free'
                    ? '10 users included\n2 GB of storage\nHelp center access\nEmail support'
                    : plan === 'Pro'
                    ? '20 users included\n10 GB of storage\nPriority email support'
                    : '50 users included\n30 GB of storage\nPhone & email support'}
                </Typography>
              </CardContent>
              <Button size="large" color="primary">
                {plan === 'Free' ? 'Sign Up for Free' : plan === 'Pro' ? 'Get Started' : 'Contact Us'}
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Pricing;
