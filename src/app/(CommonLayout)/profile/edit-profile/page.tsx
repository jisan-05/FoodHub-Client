import { userService } from "@/services/user.service";
import EditProfileForm from "./EditProfileForm";
 // client component

 export const dynamic = "force-dynamic";


const EditProfilePage = async () => {
  const session = await userService.getSession();
  const user = session.data?.user;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">User not logged in</p>
      </div>
    );
  }

  return <EditProfileForm user={user} />;
};

export default EditProfilePage;
