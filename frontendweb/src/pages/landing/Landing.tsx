import { motion } from 'framer-motion';
import { Scan } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { AvailableRoutes } from '@/utils/router/availableRoutes';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6 max-w-2xl mx-auto"
      >
        <motion.div 
          className="flex items-center justify-center gap-4 mb-8"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-primary p-3 rounded-xl">
            <Scan className="h-12 w-12 text-primary-foreground" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold">ScanSplit</h1>
        </motion.div>

        <motion.p 
          className="text-xl text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Split bills effortlessly with friends. Scan receipts, track expenses, and settle up with ease.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button asChild size="lg" className="text-lg">
            <Link to={AvailableRoutes.LOGIN}>Log In</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg">
            <Link to={AvailableRoutes.REGISTER}>Create Account</Link>
          </Button>
        </motion.div>
      </motion.div>

      <motion.div 
        className="absolute bottom-8 text-center text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p>Split bills with confidence. Join ScanSplit today.</p>
      </motion.div>
    </div>
  );
}