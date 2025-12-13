"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { type EditUserFormData, editUserSchema } from "@/lib/validation"
import type { User } from "@/lib/store"

interface UserFormProps {
  user: User
  onSubmit: (data: EditUserFormData) => void
  isLoading?: boolean
}

export function UserForm({ user, onSubmit, isLoading }: UserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditUserFormData>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: user.name,
      username: user.username,
      email: user.email,
      city: user.address.city,
      phone: user.phone,
      company: user.company.name,
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Avatar */}
      <div className="mb-6">
        <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/50 rounded-full flex items-center justify-center text-white font-semibold text-3xl">
          {user.name.charAt(0)}
        </div>
      </div>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Name</label>
        <input
          {...register("name")}
          type="text"
          className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Enter name"
        />
        {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
      </div>

      {/* Username */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Username</label>
        <input
          {...register("username")}
          type="text"
          className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Enter username"
        />
        {errors.username && <p className="text-sm text-destructive mt-1">{errors.username.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Email</label>
        <input
          {...register("email")}
          type="email"
          className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Enter email"
        />
        {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
      </div>

      {/* City */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">City</label>
        <input
          {...register("city")}
          type="text"
          className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Enter city"
        />
        {errors.city && <p className="text-sm text-destructive mt-1">{errors.city.message}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Phone</label>
        <input
          {...register("phone")}
          type="text"
          className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Enter phone"
        />
        {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>}
      </div>

      {/* Company */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Company Name</label>
        <input
          {...register("company")}
          type="text"
          className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Enter company name"
        />
        {errors.company && <p className="text-sm text-destructive mt-1">{errors.company.message}</p>}
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary text-primary-foreground rounded-md py-2 px-4 font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
      >
        {isLoading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  )
}
