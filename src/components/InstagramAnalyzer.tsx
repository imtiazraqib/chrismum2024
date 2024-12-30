"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface InstagramMetrics {
  followingSince: string;
  likedPosts: number;
  comments: number;
  recentInteractions: string[];
}

const InstagramAnalyzer = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [metrics, setMetrics] = useState<InstagramMetrics | null>(null);
  const [message, setMessage] = useState("");

  const analyzeProfile = async () => {
    setLoading(true);
    try {
      // This would be replaced with your actual API calls
      const mockData: InstagramMetrics = {
        followingSince: "2022-03-15",
        likedPosts: 42,
        comments: 15,
        recentInteractions: ["Liked your holiday post", "Commented on your travel photo"],
      };

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMetrics(mockData);

      // This would be your Gemini API call
      const personalizedMessage = `Dear ${username}, Merry Christmas! 🎄 It's been wonderful having you as a friend since March 2022. Your consistent support through ${mockData.likedPosts} likes and ${mockData.comments} thoughtful comments means the world to me. Here's to many more years of friendship! 🎁✨`;
      setMessage(personalizedMessage);
    } catch (error) {
      console.error("Error analyzing profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold text-center">Instagram Friend Analyzer</h1>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex gap-4">
              <Input
                placeholder="Enter Instagram username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="flex-1"
              />
              <Button onClick={analyzeProfile} disabled={!username || loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing
                  </>
                ) : (
                  "Analyze"
                )}
              </Button>
            </div>

            {metrics && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="font-semibold">Following Since</h3>
                    <p>{new Date(metrics.followingSince).toLocaleDateString()}</p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="font-semibold">Posts Liked</h3>
                    <p>{metrics.likedPosts}</p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="font-semibold">Comments</h3>
                    <p>{metrics.comments}</p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="font-semibold">Recent Activity</h3>
                    <ul className="text-sm">
                      {metrics.recentInteractions.map((interaction, index) => (
                        <li key={index}>{interaction}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {message && (
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="font-semibold mb-2">Your Personalized Christmas Message</h3>
                    <p className="text-gray-700">{message}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstagramAnalyzer;
