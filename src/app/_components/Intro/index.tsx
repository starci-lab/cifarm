"use client";

import React from "react"
import { useRouterWithSearchParams } from "@/hooks"

export const Intro = () => {
  const router = useRouterWithSearchParams()
  return (
    <div>
            <div>
                <div>
                    <div>
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2 items-center">
                                <div className="text-3xl text-text-secondary">Farm, Thief, Earn</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );
};
