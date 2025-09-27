import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ConnectionTypes } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  type: ConnectionTypes;
  icon: string;
  title: ConnectionTypes;
  description: string;
  callback?: () => void;
  connected: {} & any;
};
const ConnectionCard = ({
  description,
  type,
  icon,
  title,
  connected,
}: Props) => {
  return (
    <Card className="flex flex-row items-center justify-between w-full p-4">
      {/* Left: Icon + Text */}
      <div className="flex flex-row items-center gap-4">
        <Image
          src={icon}
          alt={title}
          height={30}
          width={30}
          className="object-contain"
        />
        <div className="flex flex-col">
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </div>

      {/* Right: Connect button */}
      <Link
        href={
          title == "Discord"
            ? process.env.NEXT_PUBLIC_DISCORD_REDIRECT!
            : title == "Notion"
            ? process.env.NEXT_PUBLIC_NOTION_AUTH_URL!
            : title == "Slack"
            ? process.env.NEXT_PUBLIC_SLACK_REDIRECT!
            : "#"
        }
        className="rounded-lg bg-white px-3 py-2 font-bold text-black"
      >
        Connect
      </Link>
    </Card>
  );
};

export default ConnectionCard;
