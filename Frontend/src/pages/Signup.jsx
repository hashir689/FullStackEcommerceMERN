import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [showpassword, setshowpassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setformData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex justify-center items-center bg-pink-100 min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create to your account</CardTitle>
          <CardDescription>
            Enter details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstname">First Name</Label>
                <Input
                  id="firstname"
                  name="firstname"
                  type="text"
                  placeholder="John"
                  onChange={handleChange}
                  value={formData.firstname}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastname">Last Name</Label>
                <Input
                  id="lastname"
                  name="lastname"
                  type="text"
                  placeholder="Doe"
                  onChange={handleChange}
                  value={formData.lastname}
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                onChange={handleChange}
                value={formData.email}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <div className="relative">
                <Input
                  className="pr-9"
                  id="password"
                  name="password"
                  type={showpassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <div className="absolute right-1 top-1 text-gray-700">
                  {showpassword ? (
                    <EyeOff
                      onClick={() => {
                        setshowpassword(false);
                      }}
                    />
                  ) : (
                    <Eye
                      onClick={() => {
                        setshowpassword(true);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button onClick={submitHandler} type="submit" className="w-full">
            SignUp
          </Button>
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-pink-700 ">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
