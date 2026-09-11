import Link from "next/link";
import WebContactForm from "./WebContactForm";
import { decode } from "html-entities";

const DynamicWebPage = ({ webPages }: { webPages: any }) => {
    const showTheseFields = webPages?.showTheseFields;

    const html =
        webPages?.pageType == "4"
            ? webPages?.rawHtml
            : webPages?.pageContent;

    const decodedHtml = decode(
        html
            ?.replace(/<pre[^>]*>/gi, "")
            ?.replace(/<\/pre>/gi, "")
    );

    return (
        <main className="flex flex-col" role="main">

            <div className="w-full">

                {/* Breadcrumb + Page Header */}
                <div className="w-full max-w-[1170px] mx-auto px-6 xl:px-0">

                    {/* Breadcrumb */}
                    <div className="flex justify-center items-center mt-12 mb-7">
                        <Link
                            href="/"
                            className="text-[13px] !text-[#D42020] hover:underline"
                            itemProp="name"
                        >
                            Home
                        </Link>

                        <span
                            className="mx-2 text-[#999] text-[13px]"
                            aria-hidden="true"
                        >
                            /
                        </span>

                        <span
                            className="text-[13px] font-semibold !text-[#D42020]"
                            itemProp="name"
                        >
                            {webPages?.pageName}
                        </span>
                    </div>

                    {/* Page Title */}
                    <h1 className="text-center text-[36px] leading-[1.2] font-normal text-[#333] ">
                        {webPages?.pageName}
                    </h1>

                </div>

                {/* Page Content */}
                <div className="w-full max-w-[920px] mx-auto px-5 xl:px-0">

                    <div
                        className="
                            prose
                            prose-sm
                            sm:prose-base
                            max-w-none

                            text-[15px]
                            leading-[1.75]
                            text-[#222]

                            [&_h1]:text-[15px]
                            [&_h1]:font-bold
                            [&_h1]:text-[#222]
                            [&_h1]:mb-6

                            [&_h2]:text-[15px]
                            [&_h2]:font-bold
                            [&_h2]:text-[#222]
                            [&_h2]:mb-6
                            [&_h2]:mt-9

                            [&_h3]:text-[15px]
                            [&_h3]:font-bold
                            [&_h3]:text-[#222]
                            [&_h3]:mb-5
                            [&_h3]:mt-8

                            [&_p]:text-[15px]
                            [&_p]:leading-[1.75]
                            [&_p]:mb-7

                            [&_strong]:font-bold

                            [&_a]:underline
                            [&_a]:text-[#444]

                            [&_ol]:list-decimal
                            [&_ol]:pl-6
                            [&_ol]:mb-7

                            [&_ul]:list-disc
                            [&_ul]:pl-6
                            [&_ul]:mb-7

                            [&_li]:text-[15px]
                            [&_li]:leading-[1.75]
                            [&_li]:mb-2

                            [&_img]:max-w-full
                            [&_img]:h-auto
                            [&_img]:mx-auto

                            [&_iframe]:max-w-full
                            [&_iframe]:aspect-video
                            [&_iframe]:mx-auto

                            [&_table]:w-full
                            [&_table]:overflow-x-auto
                            [&_table]:border-collapse

                            [&_td]:border
                            [&_th]:border
                            [&_td]:p-2
                            [&_th]:p-2

                            break-words
                        "
                        dangerouslySetInnerHTML={{
                            __html: decodedHtml || "",
                        }}
                    />

                    {webPages?.pageType == "3" && (
                        <WebContactForm
                            showTheseFields={showTheseFields}
                        />
                    )}

                </div>

            </div>

        </main>
    );
};

export default DynamicWebPage;