import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Uploader() {
  return (
    <form action="">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Upload a Video</CardTitle>
          <CardDescription>
            Add a new video to your collection. You can upload from your local
            device, cloud storage, or by recording your screen.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex justify-between items-center">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="My Awesome Video" />
            </div>
            <div className="flex justify-between items-center">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your video..."
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="file">Video file</Label>
              <label
                htmlFor="file"
                className="flex flex-col items-center justify-center space-y-2 py-10 border-2 border-dashed rounded-md border-gray-300 dark:border-gray-700 cursor-pointer"
              >
                {/* <UploadIcon className="h-8 w-8 text-gray-400" /> */}
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Drag and drop a video file or click to select
                </p>
                <Input
                  id="file"
                  type="file"
                  className="hidden"
                  accept="video/*"
                />
              </label>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Upload Video</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
