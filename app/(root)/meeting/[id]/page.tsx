'use client';
import { useUser } from '@clerk/nextjs';
import React, { useState } from 'react'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import MeetingSetup from '@/components/MeetingSetUp';
import MeetingRoom from '@/components/MeetingRoom';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useParams } from 'next/navigation';
// import { Loader } from '@/components/Loader';
import { Loader } from 'lucide-react';
// import MeetingSetUp from '@/components/MeetingSetup';

const Meeting = () => {
  const { id } = useParams();
  const { isLoaded, user } = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { call, isCallLoading } = useGetCallById(id);
  
  if (!isLoaded || isCallLoading) return <Loader />;

  if (!call) return (
    <p className="text-center text-3xl font-bold text-white">
      Call Not Found
    </p>
  );

  return (
    <main className="h-screen w-full"> <StreamCall call={call} >
    <StreamTheme>

    {!isSetupComplete ? (
      <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
    ) : (
      <MeetingRoom />
    )}
    </StreamTheme>
  </StreamCall></main>
  )
}

export default Meeting