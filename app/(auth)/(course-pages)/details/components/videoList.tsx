import { useState, useEffect } from "react";
import Image from "next/image";

interface VideoData {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
}

export default function VideoList({ videos }: { videos: string }) {
  const [videoList, setVideoList] = useState<VideoData[]>([]);

  // Function to extract YouTube video ID from URL
  const extractVideoId = (url: string): string | null => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Function to fetch video title from YouTube
  const fetchVideoTitle = async (videoId: string): Promise<string> => {
    try {
      // Using YouTube oEmbed API to get video title
      const response = await fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
      );
      const data = await response.json();
      return data.title || `Video ${videoId}`;
    } catch {
      return `Video ${videoId}`;
    }
  };

  useEffect(() => {
    const processVideos = async () => {
      if (!videos || videos.trim() === "") {
        setVideoList([]);
        return;
      }

      const videoUrls = videos
        .split(",")
        .map((url) => url.trim())
        .filter((url) => url.length > 0);
      const processedVideos: VideoData[] = [];

      for (const url of videoUrls) {
        const videoId = extractVideoId(url);
        if (videoId) {
          const title = await fetchVideoTitle(videoId);
          processedVideos.push({
            id: videoId,
            url: url,
            thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
            title: title,
          });
        }
      }

      setVideoList(processedVideos);
    };

    processVideos();
  }, [videos]);

  const handleVideoClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (videoList.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">No videos available</div>
    );
  }

  return (
    <div className="w-full p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videoList.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform duration-200 hover:scale-105 hover:shadow-lg"
            onClick={() => handleVideoClick(video.url)}
          >
            <div className="relative aspect-video">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                onError={(e) => {
                  // Fallback to default thumbnail if maxresdefault doesn't exist
                  const target = e.target as HTMLImageElement;
                  target.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                  <svg
                    className="w-8 h-8 text-white ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-tight">
                {video.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
