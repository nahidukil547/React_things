import { Play } from "lucide-react";

export default function HeroHeader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="flex flex-col items-center gap-4 text-white">

        <div className="w-20 h-20 rounded-full bg-gray-600 flex items-center justify-center">
          <Play size={40} className="text-black ml-1" />
        </div>
      </div>
    </div>
  );
}