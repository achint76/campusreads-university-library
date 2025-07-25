"use client"
import React from 'react'
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import Image from 'next/image';
import config from "@/lib/config";
import ImageKit from "imagekit";
import { useRef, useState } from 'react';
import { toast } from 'sonner';

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`,
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { token, expire, signature };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const ImageUpload = ({onFileChange}: {onFileChange: (filePath: string) => void}) => {
  const ikUploadRef = useRef<any>(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const onError = (error: any) => {
    console.error('Image upload error:', error);
    toast.error("Image upload failed. Please try again.");
  };
  
  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);
    toast.success("Image uploaded successfully!");
  };

  return (
    <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
      <IKUpload 
        className='hidden' 
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName="test-upload.png"
      />

      <button 
        className="upload-btn" 
        onClick={(e) => {
          e.preventDefault();
          if(ikUploadRef.current) {
            ikUploadRef.current?.click();
          }
        }}
        suppressHydrationWarning
      >
        <Image 
          src="/icons/upload.svg" 
          alt="upload-icon" 
          width={20} 
          height={20}
          className="object-contain" 
        />

        <p className="text-base text-light-100">Upload a File</p>
        {file?.filePath && <p className="upload-filename">{file.filePath}</p>}
      </button>

      {file && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={300}
        />
      )}
    </ImageKitProvider>
  );
}

export default ImageUpload