import { Navbar } from '@/components/layout/Navbar';
import { Box } from '@mui/material';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ flex: 1, pt: { xs: 7, md: 8 } }}>
        {children}
      </Box>
    </Box>
  );
}
