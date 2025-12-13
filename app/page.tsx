"use client"

import { useEffect } from "react"
import { useUsersQuery } from "@/lib/api"
import { useUserStore } from "@/lib/store"
import { UserCard } from "@/components/user-card"
import { LoadingSpinner } from "@/components/loading-spinner"

export default function UsersPage() {
  const { data: users, isLoading } = useUsersQuery()
  const { activeUsers, archivedUsers, setUsers, archiveUser, unarchiveUser, hideUser } = useUserStore()

  useEffect(() => {
    if (users) {
      setUsers(users)
    }
  }, [users, setUsers])

  if (isLoading) return <LoadingSpinner />

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-foreground mb-12">User Management</h1>

        {/* Active Users Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Active Users</h2>
          {activeUsers.length === 0 ? (
            <p className="text-muted-foreground">No active users</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeUsers.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onArchive={() => archiveUser(user)}
                  onHide={() => hideUser(user.id)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Archived Users Section */}
        {archivedUsers.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-6">Archive</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {archivedUsers.map((user) => (
                <div key={user.id} className="bg-card border border-border rounded-lg p-5 shadow-sm opacity-60">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/50 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {user.name.charAt(0)}
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-1">{user.name}</h3>
                  <p className="text-sm text-muted-foreground mb-1">@{user.username}</p>
                  <p className="text-sm text-muted-foreground mb-3">{user.address.city}</p>
                  <p className="text-sm font-medium text-foreground mb-4">{user.company.name}</p>

                  <button
                    onClick={() => unarchiveUser(user)}
                    className="w-full bg-primary text-primary-foreground rounded-md py-2 px-3 text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    Restore
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
