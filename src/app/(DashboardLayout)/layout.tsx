import { userService } from '@/services/user.service';
import React from 'react';

import { Roles } from './../../constants/roles';

 export const dynamic = "force-dynamic";


const DashboardLayout =async ({admin,provider,customer}:{admin:React.ReactNode;provider:React.ReactNode,customer:React.ReactNode}) => {
    const user = await userService.getSession()
    const Roles = user.data.user.role;
    return (
        <div>
           {Roles==="CUSTOMER"&& customer}
           {Roles==="PROVIDER"&& provider}
           {Roles==="ADMIN"&& admin}
        </div>
    );
};

export default DashboardLayout;