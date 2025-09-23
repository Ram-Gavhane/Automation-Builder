'use client' // is needed only if you’re using React Server Components
import { useRouter } from 'next/navigation'
import { FileUploaderRegular } from '@uploadcare/react-uploader/next';
import '@uploadcare/react-uploader/core.css';


type Props = {
  onUpload: (cdnUrl: string) => Promise<any> | any
}

function UploadCareButton({ onUpload }: Props) {
  const router = useRouter()
  return (
    <div>
      <FileUploaderRegular
         sourceList="local, camera, facebook, gdrive"
         classNameUploader="uc-dark"
        pubkey="2858f585c443ee451e5f"
         onFileUploadSuccess={async (e: any) => {
           const cdnUrl = e?.detail?.cdnUrl ?? e?.cdnUrl
           if (!cdnUrl) return
           const ok = await onUpload(cdnUrl)
           if (ok) router.refresh()
         }}
      />
    </div>
  );
}

export default UploadCareButton;