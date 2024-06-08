"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useContext } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { Context } from "@/app/layout";
import { useSelector } from "react-redux";

interface Props {
  params: {
    value: string;
  };
}

const RoomPage: React.FC<Props> = (props) => {
  const { isAuthorized, setIsAuthorized, user, setUser }: any =
    useContext(Context);
  const myuser = useSelector((state: any) => state.user);
  setUser(myuser);
  const router = useRouter();
  console.log("membership", user.subscriptionEndTime);
  console.log("isSubscribed", user.isSubscribed);
  const { value } = props.params;
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentDate = new Date().toString();
    const subscriptionEndTime = new Date(user.subscriptionEndTime).toString();

    console.log("Current Date", currentDate);
    console.log("Subscription End Date", subscriptionEndTime);

    if (
      new Date(currentDate) > new Date(subscriptionEndTime) ||
      user.isSubscribed === false
    ) {
      router.push("/membership");
      return;
    }

    const myMeeting = async (element: HTMLDivElement | null) => {
      const appID = parseInt(process.env.NEXT_PUBLIC_APP_ID || "0");
      const serverSecret = process.env.NEXT_PUBLIC_SERVER_SECRET || "";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        value.toString(),
        Date.now().toString(),
        "Enter your name"
      );

      const zc = ZegoUIKitPrebuilt.create(kitToken);
      zc.joinRoom({
        container: element,
        sharedLinks: [
          {
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
                  Videocall Section
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
