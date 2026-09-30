import {
  BannerPlacement,
  fetchBanner,
  resolveBannerRequest,
} from "@/lib/api/banners";
import BannerHtml from "./BannerHtml";

interface RouteBannerProps {
  segments?: string[];
  placement: BannerPlacement;
}

export default async function RouteBanner({
  segments,
  placement,
}: RouteBannerProps) {
  try {
    const request = await resolveBannerRequest(segments);
    if (!request) return null;

    const banner = await fetchBanner(request);
    if (
      banner?.placement !== placement ||
      !banner.pageContent ||
      !banner?.visible
    )
      return null;

    return <BannerHtml html={banner.pageContent} placement={placement} />;
  } catch {
    return null;
  }
}
