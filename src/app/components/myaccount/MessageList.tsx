"use client";

interface Message {
    id: number;
    subject: string;
    body: string;
    sender: string; // "you" | "store_name"
    created_at: string;
}

interface MessageListProps {
    messages?: Message[];
}

const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const suffix =
        day % 10 === 1 && day !== 11
            ? "st"
            : day % 10 === 2 && day !== 12
                ? "nd"
                : day % 10 === 3 && day !== 13
                    ? "rd"
                    : "th";
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    const time = date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
    return `${day}${suffix} ${month} ${year} @ ${time}`;
};

const demoMessages: Message[] = [
    {
        id: 1,
        subject: "Thanks",
        body: "Okay, got it.",
        sender: "you",
        created_at: "2026-06-17T16:43:00",
    },
    {
        id: 2,
        subject: "Re: My Order is received",
        body: "Sorry, by mistake",
        sender: "Server Blink LLC",
        created_at: "2026-06-17T16:42:00",
    },
    {
        id: 3,
        subject: "Re: My Order is received",
        body: "You are welcome.",
        sender: "Server Blink LLC",
        created_at: "2026-06-17T16:42:00",
    },
    {
        id: 4,
        subject: "My Order is received",
        body: "Hi, I have received my order. Thank you so much for your cooperation. Thanks",
        sender: "you",
        created_at: "2026-06-17T16:38:00",
    },
];

const MessageList = ({ messages = demoMessages }: MessageListProps) => {
    return (
        <div className="w-full text-[#545454] py-4" style={{ fontFamily: "Roboto, Arial, Helvetica, sans-serif" }}>
            {messages.map((msg) => (
                <div key={msg.id}>
                    <div className="py-4">
                        {/* Subject + Date row */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4">
                            <span className="text-[15px]">{msg.subject}</span>
                            <span className="text-[13px] text-[#777777] sm:text-[14px] sm:text-[#545454] whitespace-nowrap shrink-0">
                                {formatDate(msg.created_at)}
                            </span>
                        </div>

                        {/* Body */}
                        <p className="text-[14px] mt-2">
                            {msg.sender === "you" ? "You" : msg.sender} said: {msg.body}
                        </p>
                    </div>

                    <hr className="border-t border-[#cac9c9]" />
                </div>
            ))}
        </div>
    );
};

export default MessageList;