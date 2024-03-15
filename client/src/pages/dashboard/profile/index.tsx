import { Layout, LayoutBody, LayoutHeader } from "../ui/layout";
import { UserNav } from "../sidebar/user-nav";
import ThemeSwitch from "../theme-switch";
import ProfileForm from "./profile-form";

export default function SettingsProfile() {
  return (
    <Layout className="h-screen">
      <LayoutHeader>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <UserNav />
        </div>
      </LayoutHeader>
      <LayoutBody className="space-y-6">
        <ProfileForm />
      </LayoutBody>
    </Layout>
    // <div className="h-screen">
    //   <div className="space-y-6 mx-10">
    //     <ProfileForm />
    //   </div>
    // </div>
  );
}
