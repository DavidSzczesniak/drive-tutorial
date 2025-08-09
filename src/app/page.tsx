"use client"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Card, CardContent } from "~/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"
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
} from "lucide-react"

interface FileItem {
  id: string
  name: string
  type: "folder" | "document" | "image" | "video" | "audio" | "archive" | "other"
  size?: string
  modified: string
  url?: string
  children?: FileItem[]
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
]

export default function GoogleDriveClone() {
  const [currentFolder, setCurrentFolder] = useState<FileItem[]>(mockData)
  const [breadcrumbs, setBreadcrumbs] = useState<{ name: string; items: FileItem[] }[]>([
    { name: "My Drive", items: mockData },
  ])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const getFileIcon = (type: string) => {
    switch (type) {
      case "folder":
        return <Folder className="w-8 h-8 text-blue-500" />
      case "document":
        return <FileText className="w-8 h-8 text-blue-600" />
      case "image":
        return <ImageIcon className="w-8 h-8 text-green-500" />
      case "video":
        return <Video className="w-8 h-8 text-red-500" />
      case "audio":
        return <Music className="w-8 h-8 text-purple-500" />
      case "archive":
        return <Archive className="w-8 h-8 text-orange-500" />
      default:
        return <FileText className="w-8 h-8 text-gray-500" />
    }
  }

  const handleItemClick = (item: FileItem) => {
    if (item.type === "folder" && item.children) {
      setCurrentFolder(item.children)
      setBreadcrumbs([...breadcrumbs, { name: item.name, items: item.children }])
    } else if (item.url) {
      window.open(item.url, "_blank")
    }
  }

  const handleBreadcrumbClick = (index: number) => {
    const newBreadcrumbs = breadcrumbs.slice(0, index + 1)
    setBreadcrumbs(newBreadcrumbs)
    setCurrentFolder(newBreadcrumbs[newBreadcrumbs.length - 1].items)
  }

  const handleUpload = () => {
    alert("Upload functionality would be implemented here!")
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                <HardDrive className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-medium text-gray-700">Drive</span>
            </div>
            <div className="relative max-w-2xl w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input placeholder="Search in Drive" className="pl-10 bg-gray-50 border-gray-200 focus:bg-white" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={handleUpload} className="bg-blue-600 hover:bg-blue-700">
              <Upload className="w-4 h-4 mr-2" />
              New
            </Button>
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder-user.jpg" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-gray-200 min-h-screen p-4">
          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start text-blue-600 bg-blue-50">
              <HardDrive className="w-4 h-4 mr-3" />
              My Drive
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Users className="w-4 h-4 mr-3" />
              Shared with me
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Clock className="w-4 h-4 mr-3" />
              Recent
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Star className="w-4 h-4 mr-3" />
              Starred
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Trash2 className="w-4 h-4 mr-3" />
              Trash
            </Button>
          </nav>

          <div className="mt-8 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-600 mb-2">Storage</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: "45%" }}></div>
            </div>
            <div className="text-xs text-gray-500">6.8 GB of 15 GB used</div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 mb-6">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                <button
                  onClick={() => handleBreadcrumbClick(index)}
                  className="text-gray-600 hover:text-gray-900 hover:underline"
                >
                  {crumb.name}
                </button>
                {index < breadcrumbs.length - 1 && <span className="text-gray-400">/</span>}
              </div>
            ))}
          </div>

          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Button variant={viewMode === "grid" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("grid")}>
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")}>
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Files and Folders */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {currentFolder.map((item) => (
                <Card
                  key={item.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleItemClick(item)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="flex justify-center mb-3">{getFileIcon(item.type)}</div>
                    <div className="text-sm font-medium text-gray-900 truncate mb-1">{item.name}</div>
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
                  className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer group"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="flex-shrink-0">{getFileIcon(item.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">{item.name}</div>
                  </div>
                  <div className="text-sm text-gray-500 w-20 text-right">{item.size}</div>
                  <div className="text-sm text-gray-500 w-24 text-right">{item.modified}</div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Star className="w-4 h-4 mr-2" />
                        Add to starred
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          )}

          {currentFolder.length === 0 && (
            <div className="text-center py-12">
              <HardDrive className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">This folder is empty</h3>
              <p className="text-gray-500 mb-4">Upload files or create folders to get started</p>
              <Button onClick={handleUpload}>
                <Upload className="w-4 h-4 mr-2" />
                Upload files
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
