"use client"

import type { User } from "@/lib/store"
import Link from "next/link"
import { Archive, Edit, Eye } from "lucide-react"

interface UserCardProps {
  user: User
  onArchive: () => void
  onHide: () => void
}

export function UserCard({ user, onArchive, onHide }: UserCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
      {/* Avatar */}
      <div className="mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/50 rounded-full flex items-center justify-center text-white font-semibold text-lg">
          {user.name.charAt(0)}
        </div>
      </div>

      {/* User info */}
      <h3 className="text-lg font-semibold text-foreground mb-1">{user.name}</h3>
      <p className="text-sm text-muted-foreground mb-1">@{user.username}</p>
      <p className="text-sm text-muted-foreground mb-3">{user.address.city}</p>
      <p className="text-sm font-medium text-foreground mb-4">{user.company.name}</p>

      {/* Actions */}
      <div className="flex gap-3">
        <Link
          href={`/edit/${user.id}`}
          className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-md py-2 px-3 text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Edit className="w-4 h-4" />
          Edit
        </Link>
        <button
          onClick={onArchive}
          className="flex-1 flex items-center justify-center gap-2 bg-muted text-muted-foreground rounded-md py-2 px-3 text-sm font-medium hover:bg-muted/80 transition-colors"
        >
          <Archive className="w-4 h-4" />
          Archive
        </button>
        <button
          onClick={onHide}
          className="flex items-center justify-center gap-2 bg-muted text-muted-foreground rounded-md py-2 px-3 text-sm font-medium hover:bg-muted/80 transition-colors"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
