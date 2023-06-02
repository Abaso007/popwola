"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import CampaignForm from "./components/CampaignForm";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { CampaignInterface } from "@/interfaces/campaign.interface";
import CampaignLoadingSkeleton from "./components/CampaignLoadingSkeleton";
import { getCampaignDocument } from "@/lib/services/campaign.service";

const ManageCampaign = () => {
  const pathname: string = usePathname();
  const isCreating = pathname === "/space/campaigns/create";

  const [loading, setLoading] = useState<boolean>(true);
  const [campaign, setCampaign] = useState<CampaignInterface>({
    name: "",
    description: "",
  });

  const fetchCampaign = async () => {
    const campaignData = await getCampaignDocument(pathname.split("/")[3]);
    setCampaign(campaignData);
    setLoading(false);
    console.log(campaignData);
  };

  useEffect(() => {
    if (!isCreating) {
      fetchCampaign();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <>
      {loading ? (
        <CampaignLoadingSkeleton />
      ) : (
        <div
          style={{
            height: "calc(100vh - 5rem)",
          }}
          className="p-0 flex items-center justify-between"
        >
          <div className="left flex flex-col w-7/12">
            <ScrollArea
              style={{
                height: "calc(100vh - 6rem)",
              }}
            >
              <h1 className="text-2xl mt-7 font-semibold text-primary/80">
                {isCreating && "Create"} Campaign {!isCreating && "Details"}
              </h1>
              <CampaignForm initialData={campaign} isCreating={isCreating} />
            </ScrollArea>
          </div>
          <div className="right h-full flex items-center flex-col justify-center">
            {/* <div> */}
            <div className="w-[400px] h-[200px] mb-5 bg-secondary/5 rounded-xl"></div>
            {isCreating ? (
              <>
                <h2 className="text-sm mb-4 text-secondary/70">
                  Create campaign first to get started
                </h2>
              </>
            ) : (
              <>
                <h2 className="text-sm mb-4 text-secondary/70">
                  You haven&apos;t created any template yet
                </h2>
                <Button className="bg-secondary/10 hover:bg-secondary/5">
                  Select a template
                </Button>
              </>
            )}
            {/* </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default ManageCampaign;