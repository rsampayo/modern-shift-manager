import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface LoginFormProps {
  onLogin: (userId: string, password: string, remember: boolean) => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
      <Card className="w-full max-w-md p-8 space-y-6 glass-card fade-in shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-200">
        <div className="space-y-4 text-center">
          <div className="relative">
            <img 
              src="/lovable-uploads/bbe8f7c8-d3b5-46c9-ba98-f98d35334f7d.png" 
              alt="STX Underground LLC" 
              className="relative h-16 w-auto mx-auto hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-blue-800">
              STX Underground LLC
            </h1>
            <p className="text-blue-600">Clock-In & Tracking System</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="userId">User ID</Label>
            <Input
              id="userId"
              placeholder="Enter your user ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="border-blue-200 focus:border-blue-400 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-blue-200 focus:border-blue-400 transition-colors"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={remember}
              onCheckedChange={(checked) => setRemember(checked as boolean)}
              className="border-blue-200 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
            />
            <label
              htmlFor="remember"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-blue-700"
            >
              Remember me
            </label>
          </div>

          <Button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300"
            onClick={() => onLogin(userId, password, remember)}
          >
            Login
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;