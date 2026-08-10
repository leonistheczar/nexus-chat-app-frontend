import { useChatContacts } from "@/lib/providers/ChatProvider";

export default function NewGroup(){
    const {
        openNewUser,
        setOpenNewUser,
        isCreateGroupOpen,
        setIsCreateGroupOpen,
      } = useChatContacts();
    return(
        isCreateGroupOpen && (
            <>Test</>
        )
    )
}