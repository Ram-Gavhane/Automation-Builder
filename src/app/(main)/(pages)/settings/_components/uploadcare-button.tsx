'use client'
import React, { useEffect, useRef } from 'react'
import * as LR from '@uploadcare/blocks'
import { useRouter } from 'next/navigation'
import "@uploadcare/blocks/web/lr-file-uploader-regular.min.css";


// Type declarations for Uploadcare custom elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lr-config': any
      'lr-file-uploader-regular': any
      'lr-upload-ctx-provider': any
    }
  }
}

type Props = {
  onUpload: (e: string) => any
}

LR.registerBlocks(LR)

const UploadCareButton = ({ onUpload }: Props) => {
  const router = useRouter()
  const ctxProviderRef = useRef<
    typeof LR.UploadCtxProvider.prototype & LR.UploadCtxProvider
  >(null)

  useEffect(() => {
    const handleUpload = async (e: any) => {
      const file = await onUpload(e.detail.cdnUrl)
      if (file) {
        router.refresh()
      }
    }
    ctxProviderRef.current?.addEventListener('file-upload-success', handleUpload)
  }, [])

  return (
    <div className="max-w-sm m-2 border-1 p-5">
      {/* @ts-ignore */}
      <lr-config
        ctx-name="my-uploader"
        pubkey="2858f585c443ee451e5f"
      />

      {/* @ts-ignore */}
      <lr-file-uploader-regular
        ctx-name="my-uploader"
      />

      {/* @ts-ignore */}
      <lr-upload-ctx-provider
        ctx-name="my-uploader"
        ref={ctxProviderRef}
      />
    </div>
  )
}

export default UploadCareButton;