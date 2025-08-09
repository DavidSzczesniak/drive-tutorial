"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Card, CardContent } from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Search,
  Upload,
  Grid3X3,
  List,
  Folder,
  FileText,
  ImageIcon,
  Video,
  Music,
  Archive,
  MoreVertical,
  Star,
  Clock,
  Trash2,
  HardDrive,
  Users,
} from "lucide-react";

interface FileItem {
  id: string;
  name: string;
  type:
    | "folder"
    | "document"
    | "image"
    | "video"
    | "audio"
    | "archive"
    | "other";
  size?: string;
  modified: string;
  url?: string;
  children?: FileItem[];
}

const mockData: FileItem[] = [
  {
    id: "1",
    name: "Work Documents",
    type: "folder",
    modified: "2 days ago",
    children: [
      {
        id: "1-1",
        name: "Project Proposal.docx",
        type: "document",
        size: "2.4 MB",
        modified: "1 day ago",
        url: "#",
      },
      {
        id: "1-2",
        name: "Budget Spreadsheet.xlsx",
        type: "document",
        size: "1.8 MB",
        modified: "3 days ago",
        url: "#",
      },
      {
        id: "1-3",
        name: "Meeting Notes",
        type: "folder",
        modified: "1 week ago",
        children: [
          {
            id: "1-3-1",
            name: "Q1 Planning.txt",
            type: "document",
            size: "45 KB",
            modified: "1 week ago",
            url: "#",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Photos",
    type: "folder",
    modified: "1 week ago",
    children: [
      {
        id: "2-1",
        name: "vacation-beach.jpg",
        type: "image",
        size: "4.2 MB",
        modified: "1 week ago",
        url: "#",
      },
      {
        id: "2-2",
        name: "family-dinner.png",
        type: "image",
        size: "3.1 MB",
        modified: "2 weeks ago",
        url: "#",
      },
    ],
  },
  {
    id: "3",
    name: "Presentation.pptx",
    type: "document",
    size: "15.7 MB",
    modified: "3 days ago",
    url: "#",
  },
  {
    id: "4",
    name: "Demo Video.mp4",
    type: "video",
    size: "125 MB",
    modified: "1 week ago",
    url: "#",
  },
  {
    id: "5",
    name: "Music Collection",
    type: "folder",
    modified: "2 weeks ago",
    children: [
      {
        id: "5-1",
        name: "favorite-song.mp3",
        type: "audio",
        size: "5.2 MB",
        modified: "2 weeks ago",
        url: "#",
      },
    ],
  },
  {
    id: "6",
    name: "Archive.zip",
    type: "archive",
    size: "45.3 MB",
    modified: "1 month ago",
    url: "#",
  },
];

export default function GoogleDriveClone() {
  const [currentFolder, setCurrentFolder] = useState<FileItem[]>(mockData);
  const [breadcrumbs, setBreadcrumbs] = useState<
    { name: string; items: FileItem[] }[]
  >([{ name: "My Drive", items: mockData }]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const getFileIcon = (type: string) => {
    switch (type) {
      case "folder":
        return <Folder className="h-8 w-8 text-blue-500" />;
      case "document":
        return <FileText className="h-8 w-8 text-blue-600" />;
      case "image":
        return <ImageIcon className="h-8 w-8 text-green-500" />;
      case "video":
        return <Video className="h-8 w-8 text-red-500" />;
      case "audio":
        return <Music className="h-8 w-8 text-purple-500" />;
      case "archive":
        return <Archive className="h-8 w-8 text-orange-500" />;
      default:
        return <FileText className="h-8 w-8 text-gray-500" />;
    }
  };

  const handleItemClick = (item: FileItem) => {
    if (item.type === "folder" && item.children) {
      setCurrentFolder(item.children);
      setBreadcrumbs([
        ...breadcrumbs,
        { name: item.name, items: item.children },
      ]);
    } else if (item.url) {
      window.open(item.url, "_blank");
    }
  };

  const handleBreadcrumbClick = (index: number) => {
    const newBreadcrumbs = breadcrumbs.slice(0, index + 1);
    setBreadcrumbs(newBreadcrumbs);

    const lastCrumb = newBreadcrumbs[newBreadcrumbs.length - 1];
    if (lastCrumb) {
      setCurrentFolder(lastCrumb.items);
    }
  };

  const handleUpload = () => {
    alert("Upload functionality would be implemented here!");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-500">
                <HardDrive className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-medium text-gray-700">Drive</span>
            </div>
            <div className="relative w-96 max-w-2xl">
              <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
              <Input
                placeholder="Search in Drive"
                className="border-gray-200 bg-gray-50 pl-10 focus:bg-white"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={handleUpload}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Upload className="mr-2 h-4 w-4" />
              New
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-user.jpg" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="min-h-screen w-64 border-r border-gray-200 p-4">
          <nav className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start bg-blue-50 text-blue-600"
            >
              <HardDrive className="mr-3 h-4 w-4" />
              My Drive
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Users className="mr-3 h-4 w-4" />
              Shared with me
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Clock className="mr-3 h-4 w-4" />
              Recent
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Star className="mr-3 h-4 w-4" />
              Starred
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Trash2 className="mr-3 h-4 w-4" />
              Trash
            </Button>
          </nav>

          <div className="mt-8 border-t border-gray-200 pt-4">
            <div className="mb-2 text-sm text-gray-600">Storage</div>
            <div className="mb-2 h-2 w-full rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-blue-600"
                style={{ width: "45%" }}
              ></div>
            </div>
            <div className="text-xs text-gray-500">6.8 GB of 15 GB used</div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Breadcrumbs */}
          <div className="mb-6 flex items-center gap-2">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                <button
                  onClick={() => handleBreadcrumbClick(index)}
                  className="text-gray-600 hover:text-gray-900 hover:underline"
                >
                  {crumb.name}
                </button>
                {index < breadcrumbs.length - 1 && (
                  <span className="text-gray-400">/</span>
                )}
              </div>
            ))}
          </div>

          {/* Toolbar */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Files and Folders */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {currentFolder.map((item) => (
                <Card
                  key={item.id}
                  className="cursor-pointer transition-shadow hover:shadow-md"
                  onClick={() => handleItemClick(item)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="mb-3 flex justify-center">
                      {getFileIcon(item.type)}
                    </div>
                    <div className="mb-1 truncate text-sm font-medium text-gray-900">
                      {item.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {item.size && `${item.size} • `}
                      {item.modified}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              {currentFolder.map((item) => (
                <div
                  key={item.id}
                  className="group flex cursor-pointer items-center gap-4 rounded-lg p-3 hover:bg-gray-50"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="flex-shrink-0">{getFileIcon(item.type)}</div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-gray-900">
                      {item.name}
                    </div>
                  </div>
                  <div className="w-20 text-right text-sm text-gray-500">
                    {item.size}
                  </div>
                  <div className="w-24 text-right text-sm text-gray-500">
                    {item.modified}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Star className="mr-2 h-4 w-4" />
                        Add to starred
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          )}

          {currentFolder.length === 0 && (
            <div className="py-12 text-center">
              <HardDrive className="mx-auto mb-4 h-12 w-12 text-gray-400" />
              <h3 className="mb-2 text-lg font-medium text-gray-900">
                This folder is empty
              </h3>
              <p className="mb-4 text-gray-500">
                Upload files or create folders to get started
              </p>
              <Button onClick={handleUpload}>
                <Upload className="mr-2 h-4 w-4" />
                Upload files
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
