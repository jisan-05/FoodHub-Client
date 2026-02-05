import { userService } from '@/services/user.service';
import React from 'react';
import { UserRole } from './../../../../FoodHub-Server/generated/prisma/enums';

const DashboardLayout =async ({admin,provider,customer}:{admin:React.ReactNode;provider:React.ReactNode,customer:React.ReactNode}) => {
    const user = await userService.getSession()
    const userRole = user.data.user.role;
    console.log(userRole)
    return (
        <div>
           {userRole==="CUSTOMER"&& customer}
           {userRole==="PROVIDER"&& provider}
           {userRole==="ADMIN"&& admin}
        </div>
    );
};

export default DashboardLayout;