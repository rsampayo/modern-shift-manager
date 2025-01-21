import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Clock, History, Box, Camera, Bell } from "lucide-react";
import LoginForm from "@/components/LoginForm";
import StatsCard from "@/components/StatsCard";
import SessionTab from "@/components/SessionTab";
import HistoryTab from "@/components/HistoryTab";
import EquipmentTab from "@/components/EquipmentTab";
import MediaTab from "@/components/MediaTab";
import NotificationsTab from "@/components/NotificationsTab";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toast } = useToast();

  const handleLogin = (userId: string, password: string, remember: boolean) => {
    if (userId && password) {
      setIsLoggedIn(true);
      toast({
        title: "Logged in successfully",
        description: "Welcome back!",
      });
    }
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img 
              src="/lovable-uploads/bbe8f7c8-d3b5-46c9-ba98-f98d35334f7d.png" 
              alt="STX Underground LLC" 
              className="h-12 w-auto"
            />
            <h1 className="text-3xl font-bold text-primary">Clock-In & Tracking</h1>
          </div>
          {isLoggedIn && (
            <Button 
              variant="outline"
              onClick={() => {
                setIsLoggedIn(false);
                toast({
                  title: "Logged out successfully",
                  description: "See you next time!",
                });
              }}
            >
              Logout
            </Button>
          )}
        </div>

        <StatsCard />

        <Card className="p-6">
          <Tabs defaultValue="session" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="session" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="hidden sm:inline">Session</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                <span className="hidden sm:inline">History</span>
              </TabsTrigger>
              <TabsTrigger value="equipment" className="flex items-center gap-2">
                <Box className="h-4 w-4" />
                <span className="hidden sm:inline">Equipment</span>
              </TabsTrigger>
              <TabsTrigger value="media" className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                <span className="hidden sm:inline">Media</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="session">
              <SessionTab />
            </TabsContent>
            <TabsContent value="history">
              <HistoryTab />
            </TabsContent>
            <TabsContent value="equipment">
              <EquipmentTab />
            </TabsContent>
            <TabsContent value="media">
              <MediaTab />
            </TabsContent>
            <TabsContent value="notifications">
              <NotificationsTab />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Index;