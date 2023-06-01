import { CampaignInterface } from "@/interfaces/campaign.interface";
import Link from "next/link";
import React from "react";

const CampaignCard: React.FC<CampaignInterface> = (props) => {
  const { name, description } = props;
  return (
    <Link href={"/editor"} className="p-4 w-[24%] rounded-lg bg-foreground">
      <img
        className="w-full mb-2 rounded-lg opacity-70"
        src="https://cdn.dribbble.com/userupload/7418617/file/original-043fd0bc1257ade8986ad38976035096.png?compress=1&resize=320x240&vertical=top"
        alt=""
      />
      <h1>{name}</h1>
      <p className="text-secondary font-light w-full text-xs mt-1">
        {description}
      </p>
    </Link>
  );
};

export default CampaignCard;
