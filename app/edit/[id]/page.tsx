"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { useUserQuery } from "@/lib/api"
import { UserForm } from "@/components/user-form"
import { SuccessModal } from "@/components/success-modal"
import { LoadingSpinner } from "@/components/loading-spinner"
import type { EditUserFormData } from "@/lib/validation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function EditUserPage() {
  const params = useParams()
  const userId = Number(params.id)
  const { data: user, isLoading } = useUserQuery(userId)
  const [showModal, setShowModal] = useState(false)

  const handleSubmit = (data: EditUserFormData) => {
    // Simulate saving - data would be sent to API in real app
    console.log("User data to save:", data)
    setShowModal(true)
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground">User not found</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Users
        </Link>

        <h1 className="text-4xl font-bold text-foreground mb-8">Edit User</h1>

        {/* Form */}
        <div className="bg-card border border-border rounded-lg p-8">
          <UserForm user={user} onSubmit={handleSubmit} />
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </main>
  )
}
