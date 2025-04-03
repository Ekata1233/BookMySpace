"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useAuth } from "../context/authContext";

const Auth = () => {
   const { user } = useAuth();
   console.log("auth :", user);
   
  return (
    <div className="flex items-center justify-center py-45 mt-10">
      <Tabs defaultValue="signup" className="w-[800px] rounded-none">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
          <TabsTrigger value="login">Log In</TabsTrigger>
        </TabsList>
        <TabsContent value="signup" className="rounded-none">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Create a new account by filling in the details below.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex flex-col md:flex-row gap-4 my-6">
                <div className="space-y-1 w-full">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter your name" className="rounded-none" />
                </div>
                <div className="space-y-1 w-full">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" className="rounded-none" />
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 my-6">
                <div className="space-y-1 w-full">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="Enter your phone number" className="rounded-none" />
                </div>
                <div className="space-y-1 w-full">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="Enter your address" className="rounded-none" />
                </div>
              </div>
              
              {/* Role Dropdown */}
             
              
              <div className="flex flex-col md:flex-row gap-4 my-6">
                <div className="space-y-1 w-full">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Enter your password" className="rounded-none" />
                </div>
                <div className="space-y-1 w-full">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" placeholder="Confirm your password" className="rounded-none" />
                </div>
              </div>
              <div className="space-y-1 my-6">
                <Label htmlFor="role">Select Role</Label>
                <select
                  id="role"
                  className="w-full p-2 border rounded-none focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="user">User</option>
                  <option value="vendor">Vendor</option>
                </select>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="text-white hover:text-[#6BB7BE] border border-[#6BB7BE] px-5 py-2 bg-[#6BB7BE] hover:bg-[#FAFAFA] font-medium rounded-none w-full">Create Account</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Log In</CardTitle>
              <CardDescription>
                Enter your credentials to access your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1 my-6">
                <Label htmlFor="email-login">Email</Label>
                <Input id="email-login" type="email" placeholder="Enter your email" className="rounded-none" />
              </div>
              <div className="space-y-1 my-6">
                <Label htmlFor="password-login">Password</Label>
                <Input id="password-login" type="password" placeholder="Enter your password" className="rounded-none" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="text-white hover:text-[#6BB7BE] border border-[#6BB7BE] px-5 py-2 bg-[#6BB7BE] hover:bg-[#FAFAFA] font-medium rounded-none w-full">Log In</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;