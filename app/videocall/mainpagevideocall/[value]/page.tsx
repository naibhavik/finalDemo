"use client"
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";


interface Props {
  params: {
    value: string;
  };
}

const RoomPage:React.FC<Props> = (props) => {
  const router = useRouter();
  const { value } = props.params;
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const myMeeting = async (element: HTMLDivElement | null) => {
    //   if (!element || !roomId) return;

      const appID = 236123164;
      const serverSecret = "e012672620d14a7bbf6a004fd006b8c1";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        value.toString(),
        Date.now().toString(),
        "nai bhavik"
      );
      const zc = ZegoUIKitPrebuilt.create(kitToken);
      zc.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: "Copy Link",
            url: `http://localhost:3000/videocall/mainpagevideocall/${value}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showScreenSharingButton: true,
      });
    };

    myMeeting(elementRef.current);
  }, [value]);

  return (
    <>
      <section
        className="bg-half-170 d-table w-100"
        style={{
          backgroundImage: "url('/images/hero/bg2.jpg')",
          backgroundPosition: "top",
        }}
      >
        <div className="bg-overlay bg-gradient-overlay"></div>
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="title-heading text-center">
                <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">
                Vidoecall Section
                </h5>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="mt-2 mb-2" ref={elementRef}></div>
    </>
  );
};

export default RoomPage;
