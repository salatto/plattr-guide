"use client";

import { useState } from "react";
import type { LoyaltyProgram } from "@/types/restaurants";

type Props = {
    programs: LoyaltyProgram[];
    restaurantName: string;
};

function StampCard({ program }: { program: LoyaltyProgram }) {
    const total = program.stamps_required || 6;
    const collected = 0; // will come from user data later

    return (
        <div className="bg-white rounded-2xl p-5 border border-[#F0F0F0]">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-[20px]">{program.icon}</span>
                        <h4 className="text-[17px] font-semibold text-[#1C1D28]">{program.title}</h4>
                    </div>
                    <p className="text-[14px] text-[#6B7280] leading-relaxed">{program.description}</p>
                </div>
            </div>

            {/* Stamp grid */}
            <div className="flex flex-wrap gap-2 mb-4">
                {Array.from({ length: total }).map((_, i) => (
                    <div
                        key={i}
                        className={`
                            w-[42px] h-[42px] rounded-xl flex items-center justify-center text-[14px] font-medium
                            transition-all duration-200
                            ${i < collected
                                ? "bg-[#4CA154] text-white shadow-sm"
                                : i === collected
                                    ? "bg-[#4CA154]/10 text-[#4CA154] border-2 border-dashed border-[#4CA154]"
                                    : "bg-[#F5F5F5] text-[#C0C0C0]"
                            }
                        `}
                    >
                        {i < collected ? "✓" : i + 1}
                    </div>
                ))}
                {/* Reward stamp */}
                <div className="w-[42px] h-[42px] rounded-xl flex items-center justify-center bg-gradient-to-br from-[#FFD700] to-[#FFA500] text-white text-[16px] shadow-sm">
                    ★
                </div>
            </div>

            {/* Reward info */}
            <div className="flex items-center gap-2 py-2.5 px-3 bg-[#FFF8E1] rounded-xl">
                <span className="text-[14px]">🎁</span>
                <span className="text-[13px] font-medium text-[#92650A]">
                    Reward: {program.stamp_reward}
                </span>
            </div>

            {program.terms && (
                <p className="mt-3 text-[11px] text-[#9CA3AF]">{program.terms}</p>
            )}
        </div>
    );
}

function WelcomeOffer({ program }: { program: LoyaltyProgram }) {
    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-[#1C1D28] to-[#2D3748] rounded-2xl p-5 text-white">
            {/* Decorative circles */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/5" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/5" />

            <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-[20px]">{program.icon}</span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#4CA154]">
                        Welcome offer
                    </span>
                </div>

                <h4 className="text-[18px] font-semibold mb-1">{program.title}</h4>
                <p className="text-[14px] text-white/60 mb-4">{program.description}</p>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-3">
                    <p className="text-[16px] font-semibold text-[#4CA154]">{program.offer_text}</p>
                    {program.offer_conditions && (
                        <p className="text-[12px] text-white/50 mt-1">{program.offer_conditions}</p>
                    )}
                </div>

                <div className="flex items-center justify-between">
                    {program.offer_valid_days && (
                        <span className="text-[12px] text-white/40">
                            Valid for {program.offer_valid_days} days
                        </span>
                    )}
                    <button
                        type="button"
                        className="px-4 py-2 bg-[#4CA154] hover:bg-[#3a8a44] text-white text-[13px] font-semibold rounded-full transition-colors"
                    >
                        Claim offer
                    </button>
                </div>
            </div>
        </div>
    );
}

function PointsProgram({ program }: { program: LoyaltyProgram }) {
    return (
        <div className="bg-white rounded-2xl p-5 border border-[#F0F0F0]">
            <div className="flex items-center gap-2 mb-1">
                <span className="text-[20px]">{program.icon}</span>
                <h4 className="text-[17px] font-semibold text-[#1C1D28]">{program.title}</h4>
            </div>
            <p className="text-[14px] text-[#6B7280] leading-relaxed mb-4">{program.description}</p>

            <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#F0FDF4] rounded-xl p-3 text-center">
                    <p className="text-[22px] font-bold text-[#4CA154]">{program.points_per_euro}</p>
                    <p className="text-[12px] text-[#6B7280] mt-0.5">Crumbs per €1</p>
                </div>
                <div className="bg-[#F5F3FF] rounded-xl p-3 text-center">
                    <p className="text-[22px] font-bold text-[#7C3AED]">{program.points_to_euro}</p>
                    <p className="text-[12px] text-[#6B7280] mt-0.5">Crumbs = €1</p>
                </div>
            </div>

            {program.terms && (
                <p className="mt-3 text-[11px] text-[#9CA3AF]">{program.terms}</p>
            )}
        </div>
    );
}

function CashbackProgram({ program }: { program: LoyaltyProgram }) {
    return (
        <div className="bg-white rounded-2xl p-5 border border-[#F0F0F0]">
            <div className="flex items-center gap-2 mb-1">
                <span className="text-[20px]">{program.icon}</span>
                <h4 className="text-[17px] font-semibold text-[#1C1D28]">{program.title}</h4>
            </div>
            <p className="text-[14px] text-[#6B7280] leading-relaxed mb-4">{program.description}</p>

            <div className="bg-[#ECFDF5] rounded-xl p-4 text-center">
                <p className="text-[36px] font-bold text-[#4CA154]">{program.cashback_percent}%</p>
                <p className="text-[13px] text-[#6B7280] mt-1">cashback on every visit</p>
            </div>

            {program.terms && (
                <p className="mt-3 text-[11px] text-[#9CA3AF]">{program.terms}</p>
            )}
        </div>
    );
}

function VipTiers({ program }: { program: LoyaltyProgram }) {
    const tiers = program.tiers || [];
    const tierColors: Record<string, { bg: string; border: string; text: string; badge: string }> = {
        Bronze: { bg: "bg-[#FFF8F0]", border: "border-[#D4A574]", text: "text-[#92650A]", badge: "bg-[#CD7F32]" },
        Silver: { bg: "bg-[#F8F9FA]", border: "border-[#C0C0C0]", text: "text-[#5A5A5A]", badge: "bg-[#A8A9AD]" },
        Gold: { bg: "bg-[#FFFDF0]", border: "border-[#FFD700]", text: "text-[#92650A]", badge: "bg-gradient-to-r from-[#FFD700] to-[#FFA500]" },
    };

    return (
        <div className="bg-white rounded-2xl p-5 border border-[#F0F0F0]">
            <div className="flex items-center gap-2 mb-1">
                <span className="text-[20px]">{program.icon}</span>
                <h4 className="text-[17px] font-semibold text-[#1C1D28]">{program.title}</h4>
            </div>
            <p className="text-[14px] text-[#6B7280] leading-relaxed mb-4">{program.description}</p>

            <div className="space-y-3">
                {tiers.map((tier) => {
                    const colors = tierColors[tier.name] || tierColors.Bronze;
                    return (
                        <div
                            key={tier.name}
                            className={`${colors.bg} border ${colors.border} rounded-xl p-4`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <span className={`${colors.badge} text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full`}>
                                        {tier.name}
                                    </span>
                                    {tier.discount_percent > 0 && (
                                        <span className={`text-[14px] font-semibold ${colors.text}`}>
                                            {tier.discount_percent}% off
                                        </span>
                                    )}
                                </div>
                                <span className="text-[12px] text-[#9CA3AF]">
                                    {tier.min_visits}+ visits
                                </span>
                            </div>
                            <p className="text-[13px] text-[#6B7280]">{tier.perks}</p>
                        </div>
                    );
                })}
            </div>

            {program.terms && (
                <p className="mt-3 text-[11px] text-[#9CA3AF]">{program.terms}</p>
            )}
        </div>
    );
}

function ProgramCard({ program }: { program: LoyaltyProgram }) {
    switch (program.program_type) {
        case "stamp_card":
            return <StampCard program={program} />;
        case "welcome_offer":
            return <WelcomeOffer program={program} />;
        case "points":
            return <PointsProgram program={program} />;
        case "cashback":
            return <CashbackProgram program={program} />;
        case "vip_tiers":
            return <VipTiers program={program} />;
        default:
            return null;
    }
}

export default function LoyaltySection({ programs, restaurantName }: Props) {
    const [showTerms, setShowTerms] = useState(false);

    if (!programs.length) return null;

    // Welcome offers first, then others
    const sorted = [...programs].sort((a, b) => {
        if (a.program_type === "welcome_offer") return -1;
        if (b.program_type === "welcome_offer") return 1;
        return 0;
    });

    return (
        <div className="grid gap-6">
            <div>
                <div className="flex items-center gap-3">
                    <h2 className="text-[24px] font-semibold leading-[120%] text-neutral-900">
                        Rewards & Loyalty
                    </h2>
                    <span className="px-2.5 py-0.5 bg-[#4CA154]/10 text-[#4CA154] text-[12px] font-semibold rounded-full">
                        {programs.length} {programs.length === 1 ? "program" : "programs"}
                    </span>
                </div>
                <p className="mt-2 text-base leading-6 text-[#6B7280]">
                    Earn rewards every time you visit {restaurantName}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sorted.map((program) => (
                    <ProgramCard key={program.id} program={program} />
                ))}
            </div>

            <button
                type="button"
                onClick={() => setShowTerms(!showTerms)}
                className="self-start text-[12px] text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
            >
                {showTerms ? "Hide terms" : "Terms & conditions apply"}
            </button>
        </div>
    );
}
