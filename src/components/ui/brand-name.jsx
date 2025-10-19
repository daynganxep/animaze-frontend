import useIsDark from "@/hooks/use-is-dark";
import { Box, Typography, useTheme } from "@/mui/material";

function BrandName() {
  const theme = useTheme();
  const isDark = useIsDark();

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1
      }}
    >
      <Typography
        variant="h4"
        component="span"
        sx={{
          fontWeight: 700,
          fontSize: { xs: '24px', sm: '32px', md: '40px' },
          background: isDark
            ? 'linear-gradient(to right, #64B5F6, #81C784)'
            : 'linear-gradient(to right,rgb(0, 0, 0),rgb(0, 18, 76))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-1px'
        }}
      >
        work.erp
      </Typography>
      <Typography
        component="span"
        sx={{
          color: theme.palette.primary.main,
          fontWeight: 700,
          fontSize: { xs: '24px', sm: '32px', md: '40px' }
        }}
      >
      </Typography>
    </Box>
  );
}

export default BrandName;