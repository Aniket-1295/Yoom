'use client';
import React, { useState,useEffect } from 'react'
import {
    DeviceSettings,
    VideoPreview,
    useCall,
    useCallStateHooks,
  } from '@stream-io/video-react-sdk';
import { Button } from './ui/button';

const MeetingSetUp = ({
    setIsSetupComplete,
  }: {
    setIsSetupComplete: (value: boolean) => void;
  }) => {
    
  const call = useCall();
  if (!call) {
    throw new Error(
      'useStreamCall must be used within a StreamCall component.',
    );
  }
    const [isMicCamToggled, setIsMicCamToggled] = useState(false);

    useEffect(() => {
        if (isMicCamToggled) {
          call.camera.disable();
          call.microphone.disable();
        } else {
          call.camera.enable();
          call.microphone.enable();
        }
      }, [isMicCamToggled, call.camera, call.microphone]);



  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
         <h1 className="text-center text-2xl font-bold">Setup</h1>
         <VideoPreview />
         <div className="flex h-16 items-center justify-center gap-3">
        <label 
        style={{cursor:"pointer"}}
        
        className="flex items-center justify-center gap-2 font-medium">
          <input
          style={{cursor:"pointer"}}
            type="checkbox"
            checked={isMicCamToggled}
            onChange={(e) => setIsMicCamToggled(e.target.checked)}
          />
          Join with mic and camera off
        </label>
        <DeviceSettings />
      </div>
      <Button
        className="rounded-md bg-green-500 px-4 py-2.5"
        onClick={() => {
          call.join();

          setIsSetupComplete(true);
        }}
      >
        Join meeting
      </Button>






    </div>
  )
}

export default MeetingSetUp