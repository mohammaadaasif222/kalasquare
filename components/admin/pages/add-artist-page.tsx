"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreateUserForm } from "@/components/admin/forms/create-user-form"
import { CreateProfileForm } from "@/components/admin/forms/create-profile-form"
import { CreateTalentForm } from "@/components/admin/forms/create-talent-form"

export function AddArtistPage() {
  const [userId, setUserId] = useState<string>("")

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Add New Artist</h2>
        <p className="text-muted-foreground mt-2">Complete all three sections to register a new artist</p>
      </div>

      <Tabs defaultValue="user" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="user">Create User</TabsTrigger>
          <TabsTrigger value="profile">Create Profile</TabsTrigger>
          <TabsTrigger value="talent">Create Talent</TabsTrigger>
        </TabsList>

        <TabsContent value="user" className="space-y-4">
          <CreateUserForm onUserCreated={setUserId} />
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <CreateProfileForm userId={userId} />
        </TabsContent>

        <TabsContent value="talent" className="space-y-4">
          <CreateTalentForm userId={userId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
