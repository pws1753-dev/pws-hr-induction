
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, IndentIcon, DicesIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';

const EmployeeProfileCard = () => {
  const { user } = useAuth();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return names[0][0].toUpperCase();
  };
  
  const profileItems = [
    { icon: User, label: 'Name', value: user?.name },
    { icon: Mail, label: 'Email', value: user?.email },
    { icon: IndentIcon, label: 'Employee Id', value: user?.employeeId  },
    { icon: DicesIcon, label: 'Designation', value: user?.designation  },
  ];

  return (
    <motion.div variants={cardVariants} initial="hidden" animate="visible">
      <Card>
        <CardHeader className="text-center">
          <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/20">
            <AvatarImage src={`https://i.pravatar.cc/150?u=${user?.email}`} alt={user?.name} />
            <AvatarFallback className="text-3xl">{getInitials(user?.name)}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl">{user?.name || 'User'}</CardTitle>
          <p className="text-muted-foreground">{user?.email}</p>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="space-y-3">
            {profileItems.map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <item.icon className="w-4 h-4 text-muted-foreground mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="font-medium text-sm">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EmployeeProfileCard;
