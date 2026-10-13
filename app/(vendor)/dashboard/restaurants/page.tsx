
import prisma from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { Status } from "@prisma/client";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  Check,
  X,
  ExternalLink,
  MapPin,
  Clock3,
  Store,
  ImageOff,
  ArrowUpRight,
} from "lucide-react";

const tabs = [
  { value: "PENDING", label: "Pending" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
] as const;

type RestaurantStatus = (typeof tabs)[number]["value"];

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) notFound();

  const dbUser = await prisma.user.findUnique({
    where: { supabaseUserId: user.id },
    select: { role: true },
  });

  if (dbUser?.role !== "ADMIN") notFound();

  return dbUser;
}

export default async function RestaurantApprovalsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  await requireAdmin();

  const params = await searchParams;

  const activeStatus: RestaurantStatus = tabs.some(
    (tab) => tab.value === params.status
  )
    ? (params.status as RestaurantStatus)
    : "PENDING";

  const [restaurants, pendingCount, approvedCount, rejectedCount] =
    await Promise.all([
      prisma.restaurant.findMany({
        where: { status: activeStatus as Status },
        orderBy: { createdAt: "desc" },
        include: {
          vendor: {
            select: { name: true, email: true },
          },
        },
      }),
      prisma.restaurant.count({ where: { status: Status.PENDING } }),
      prisma.restaurant.count({ where: { status: Status.APPROVED } }),
      prisma.restaurant.count({ where: { status: Status.REJECTED } }),
    ]);

  const counts: Record<RestaurantStatus, number> = {
    PENDING: pendingCount,
    APPROVED: approvedCount,
    REJECTED: rejectedCount,
  };

  async function updateRestaurantStatus(formData: FormData) {
    "use server";

    await requireAdmin();

    const restaurantId = formData.get("restaurantId");
    const nextStatus = formData.get("nextStatus");
    const returnTo = formData.get("returnTo");

    if (
      typeof restaurantId !== "string" ||
      !restaurantId ||
      (nextStatus !== "APPROVED" && nextStatus !== "REJECTED") ||
      typeof returnTo !== "string" ||
      !tabs.some((tab) => tab.value === returnTo)
    ) {
      throw new Error("Invalid restaurant status update.");
    }

    await prisma.restaurant.update({
      where: { id: restaurantId },
      data: { status: nextStatus as Status },
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/restaurants");
    revalidatePath("/explore");

    redirect(`/dashboard/restaurants?status=${returnTo}`);
  }

  return (
    <div className="mx-auto max-w-[1400px] space-y-8">
      {/* Page heading */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-ink/45">
            <span className="h-2 w-2 rounded-full bg-black" />
            Platform management
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Restaurant approvals
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-ink/55">
            Review restaurant submissions and manage which businesses appear
            on BestRestaurant.lk.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black text-white">
            <Store size={19} />
          </div>
          <div>
            <p className="text-xs font-medium text-ink/50">
              Total submissions
            </p>
            <p className="text-xl font-bold tabular-nums text-ink">
              {pendingCount + approvedCount + rejectedCount}
            </p>
          </div>
        </div>
      </div>

      {/* Status tabs */}
      <div className="flex flex-wrap gap-2 border-b border-line pb-4">
        {tabs.map((tab) => {
          const active = activeStatus === tab.value;

          return (
            <a
              key={tab.value}
              href={`/dashboard/restaurants?status=${tab.value}`}
              className={`group inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                active
                  ? "border-black bg-black text-white shadow-md shadow-black/10"
                  : "border-line bg-white text-ink/60 hover:-translate-y-0.5 hover:border-black/25 hover:text-black hover:shadow-sm"
              }`}
            >
              {tab.label}
              <span
                className={`rounded-md px-2 py-0.5 text-xs tabular-nums ${
                  active
                    ? "bg-white/15 text-white"
                    : "bg-black/[0.05] text-ink/55 group-hover:bg-black/10"
                }`}
              >
                {counts[tab.value]}
              </span>
            </a>
          );
        })}
      </div>

      {/* Restaurant cards */}
      {restaurants.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {restaurants.map((restaurant) => {
            const imageUrl =
              restaurant.heroImageUrl || restaurant.logoUrl;

            return (
              <article
                key={restaurant.id}
                className="group overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-xl hover:shadow-black/[0.06]"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-[#f1f1f1]">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={`${restaurant.name} restaurant`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-2 text-ink/30">
                      <ImageOff size={32} strokeWidth={1.5} />
                      <span className="text-xs font-medium">
                        No restaurant image
                      </span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                  <div className="absolute left-4 top-4">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-sm backdrop-blur-md ${
                        restaurant.status === "APPROVED"
                          ? "bg-black/75"
                          : restaurant.status === "REJECTED"
                            ? "bg-black/75"
                            : "bg-black/65"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          restaurant.status === "APPROVED"
                            ? "bg-white"
                            : restaurant.status === "REJECTED"
                              ? "bg-white/45"
                              : "bg-white/80"
                        }`}
                      />
                      {restaurant.status}
                    </span>
                  </div>

                  <a
                    href={`/restaurant/${restaurant.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-white hover:text-black"
                    aria-label={`Preview ${restaurant.name} in a new tab`}
                    title="Preview public page"
                  >
                    <ArrowUpRight size={19} />
                  </a>

                  <div className="absolute bottom-4 left-5 right-5">
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70">
                      {restaurant.category || "Restaurant"}
                    </p>
                    <h2 className="text-2xl font-bold tracking-tight text-white">
                      {restaurant.name}
                    </h2>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-4 p-5">
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink/55">
                    <span className="inline-flex items-center gap-2">
                      <MapPin size={15} className="text-ink/40" />
                      <span className="line-clamp-1">
                        {restaurant.location || "Location not provided"}
                      </span>
                    </span>

                    <span className="inline-flex items-center gap-2">
                      <Clock3 size={15} className="text-ink/40" />
                      {new Date(restaurant.createdAt).toLocaleDateString(
                        "en-LK",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </div>

                  {restaurant.description && (
                    <p className="line-clamp-2 text-sm leading-6 text-ink/65">
                      {restaurant.description}
                    </p>
                  )}

                  <div className="rounded-xl bg-[#f7f7f7] p-3">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-ink/40">
                      Submitted by
                    </p>
                    <p className="truncate text-sm font-semibold text-ink">
                      {restaurant.vendor.name || "Restaurant owner"}
                    </p>
                    <p className="truncate text-xs text-ink/50">
                      {restaurant.vendor.email}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 border-t border-line pt-4 sm:flex-row">
                    {restaurant.status !== "APPROVED" && (
                      <form
                        action={updateRestaurantStatus}
                        className="flex-1"
                      >
                        <input
                          type="hidden"
                          name="restaurantId"
                          value={restaurant.id}
                        />
                        <input
                          type="hidden"
                          name="nextStatus"
                          value="APPROVED"
                        />
                        <input
                          type="hidden"
                          name="returnTo"
                          value={activeStatus}
                        />
                        <button
                          type="submit"
                          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#292929] hover:shadow-lg hover:shadow-black/15 active:translate-y-0"
                        >
                          <Check size={17} />
                          Approve restaurant
                        </button>
                      </form>
                    )}

                    {restaurant.status !== "REJECTED" && (
                      <form
                        action={updateRestaurantStatus}
                        className="flex-1"
                      >
                        <input
                          type="hidden"
                          name="restaurantId"
                          value={restaurant.id}
                        />
                        <input
                          type="hidden"
                          name="nextStatus"
                          value="REJECTED"
                        />
                        <input
                          type="hidden"
                          name="returnTo"
                          value={activeStatus}
                        />
                        <button
                          type="submit"
                          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-white px-4 py-3 text-sm font-semibold text-ink/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-black hover:bg-[#f5f5f5] hover:text-black active:translate-y-0"
                        >
                          <X size={17} />
                          Reject
                        </button>
                      </form>
                    )}

                    <a
                      href={`/restaurant/${restaurant.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-ink/55 transition-colors hover:bg-black/[0.04] hover:text-black"
                    >
                      Preview
                      <ExternalLink size={15} />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-black/15 bg-white px-6 py-20 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f4f4f4] text-ink/45">
            <Store size={27} strokeWidth={1.5} />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-ink">
            No {activeStatus.toLowerCase()} restaurants
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-ink/55">
            {activeStatus === "PENDING"
              ? "New restaurant submissions will appear here when owners submit their listings."
              : `There are currently no restaurants in the ${activeStatus.toLowerCase()} category.`}
          </p>
        </div>
      )}
    </div>
  );
}
