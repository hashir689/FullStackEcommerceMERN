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
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const Signup = () => {
  const [showpassword, setshowpassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setformData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (res.data.success) {
        navigate("/verify");
        toast.success(res.data.Message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.Message);
    } finally {
      setLoading(false);
    }
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
          <Button
            onClick={submitHandler}
            type="submit"
            className="w-full cursor-pointer bg-pink-600 hover:bg-pink-500"
          >
            {loading ? (
              <>
                <Loader2 /> Please Wait...{" "}
              </>
            ) : (
              "Signup"
            )}
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
