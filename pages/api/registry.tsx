import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: 'edge',
}

const SatoshiBold = fetch(
  new URL("../../public/fonts/Satoshi-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());
const SatoshiRegular = fetch(
  new URL("../../public/fonts/Satoshi-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

const handler = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  //console.log(searchParams);

  const SatoshiBoldFontData = await SatoshiBold;
  const SatoshiRegularFontData = await SatoshiRegular;

  const title = searchParams.get("Title");
  const description = searchParams.get("Description");
  const tag = searchParams.get("Tag");

  return new ImageResponse(
    (
      <div tw="flex h-[100%] text-white py-[40px] pl-[70px]" style={{
        backgroundImage: `url(https://codemod-open-graph.vercel.app/gradient-background-dark.svg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
      }}
      >
        <div tw="flex flex-row h-[100%] w-[100%]">
          <div tw="w-[60%] h-[100%] flex-col justify-center items-start flex" style={{
            backgroundRepeat: "no-repeat",
            rowGap: "20px"
          }}>
            <div tw="bg-[#d6ff62] rounded-lg flex px-[8px] py-[10px]"><div tw="text-black uppercase text-base font-bold text-[16px] leading-[100%]">{tag}</div></div>
            <h1 tw="text-[62px] leading-[110%]">{title}</h1>
            <p tw="text-[32px]">{description}</p>
          </div>
          <div tw="flex-col justify-center items-center flex grow">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img tw="w-[120px]" src={`https://codemod-open-graph.vercel.app/codemod-logo.svg`} alt="Prism" />
          </div>
        </div>
      </div>
    ),
    {
      width: 2529,
      height: 1323,
      fonts: [
        {
          name: "Satoshi",
          data: SatoshiBoldFontData,
          weight: 500,
        },
        {
          name: "Satoshi",
          data: SatoshiRegularFontData,
          weight: 400,
        },
      ],
    }
  );
};

export default handler;