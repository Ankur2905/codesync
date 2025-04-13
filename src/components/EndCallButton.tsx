import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "../../convex/_generated/api";
import { Button } from "./ui/button";

const EndCallButton = () => {
  const call = useCall();
  const router = useRouter();
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const updateInterviewsStatus = useMutation(
    api.interviews.updateInterviewStatus
  );

  const interview = useQuery(api.interviews.getInterviewByStreamCallId, {
    streamCallId: call?.id || "",
  });

  if(!call || !interview) return null;

  const isMeetingOwner = localParticipant?.userId === call.state.createdBy?.id

  if(!isMeetingOwner) return null;

  return <Button>
    End Meeting
  </Button>
};
export default EndCallButton;
