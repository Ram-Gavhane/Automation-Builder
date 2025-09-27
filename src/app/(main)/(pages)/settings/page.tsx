import ProfileForm from '@/components/forms/profile-form'
import React from 'react'
import ProfilePicture from './_components/profile-picture'
import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs/server'

type Props = {}

const Settings = async (props: Props) => {
  const authUser = await currentUser()
  if (!authUser) return null

  let user: any = null
  let dbError: string | null = null
  try {
    user = await db.user.findUnique({ where: { clerkId: authUser.id } })
  } catch (error: any) {
    dbError = 'Database is currently unreachable. Some settings are temporarily unavailable.'
  }
  const removeProfileImage = async () => {
    'use server'
    try {
      const response = await db.user.update({
        where: {
          clerkId: authUser.id,
        },
        data: {
          profileImage: '',
        },
      })
      return response
    } catch (error) {
      return null
    }
  }

  const uploadProfileImage = async (image: string) => {
    'use server'
    const id = authUser.id
    try {
      const response = await db.user.update({
        where: {
          clerkId: id,
        },
        data: {
          profileImage: image,
        },
      })
  
      return response
    } catch (error) {
      return null
    }
  }

  const updateUserInfo = async (name: string) => {
    'use server'

    try {
      const updateUser = await db.user.update({
        where: {
          clerkId: authUser.id,
        },
        data: {
          name,
        },
      })
      return updateUser
    } catch (error) {
      return null
    }
  }

  console.log(user?.profileImage);
  return (
    <div className="flex flex-col gap-4">
      <h1 className="sticky top-0 z-[10] flex items-center justify-between border-b bg-background/50 p-6 text-4xl backdrop-blur-lg">
        <span>Settings</span>
      </h1>
      <div className="flex flex-col gap-10 p-6">
        {dbError && (
          <div className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
            {dbError}
          </div>
        )}
        <div>
          <h2 className="text-2xl font-bold">User Profile</h2>
          <p className="text-base text-white/50">
            Add or update your information
          </p>
        </div>
        {user ? (
          <>
            <ProfilePicture
              onDelete={removeProfileImage}
              userImage={user?.profileImage || ''}
              onUpload={uploadProfileImage}
            />
            <ProfileForm
              user={user}
              onUpdate={updateUserInfo}
            />
          </>
        ) : (
          <div className="text-sm text-white/60">
            {dbError
              ? 'We cannot load your profile right now due to a connection issue.'
              : 'No user profile found.'}
          </div>
        )}
      </div>
    </div>
  )
}

export default Settings